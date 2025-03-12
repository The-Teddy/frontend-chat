import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../auth/AuthContext';
import {
  handlePositionCursor,
  handleSanitizeInput,
} from '../../helpers/utils/Utils';
import './Changes.scss';
import EditModal from '../modals/edit-modal/EditModal';
import { updateName } from '../../helpers/api/UserEnpoints';
import { handleValidateName } from '../../helpers/validators/UserValidators';
import { handleError } from '../../helpers/utils/Requests';
import { toast } from 'react-toastify';
import { UserModel } from '../../global/interfaces/UserModel';
import EditIcon from '../icons/EditIcon';

const ChangeName = () => {
  const { user, setUser, token } = useContext(Context);
  const [name, setName] = useState<string>('');
  const [editName, setEditName] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputNameRef = useRef<HTMLDivElement>(null);

  function handleInputName() {
    if (!inputNameRef.current) return;

    const value = handleSanitizeInput(inputNameRef.current.innerText) || '';
    if (value.trim().length <= 30) {
      setName(value.trim());
    } else if (inputNameRef.current) {
      inputNameRef.current.innerText = name;
      handlePositionCursor(inputNameRef);
    }
  }

  function handleValidationName() {
    if (handleValidateName(name)) {
      setLoading(true);
      handleChangeName();
    }
  }

  function handleChangeName() {
    updateName(name, token)
      .then((res) => {
        toast.success(res.data.message);
        setUser((prevState: UserModel | null) => {
          if (!prevState) return prevState;

          return {
            ...prevState,
            name: res.data.data.name,
            updatedAt: res.data.data.updated_at,
          };
        });
        setEditName(false);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleCloseEdition(
    event?:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement | MouseEvent>,
  ): void {
    if (event && 'key' in event) {
      if (event.key !== 'Escape') return;
    }

    setEditName(false);
    setName(user?.name || '');

    if (inputNameRef.current) {
      inputNameRef.current.innerText = user?.name || '';
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (inputNameRef.current && user && editName) {
        setName(user?.name || '');
        inputNameRef.current.innerText = user.name || '';
        inputNameRef.current.focus();
        handlePositionCursor(inputNameRef);
      }
    }, 0);
  }, [editName, user]);
  return (
    <>
      <div className="mt-3">
        <p className="title fs-5 m-0">Nome</p>
        <div className="d-flex justify-content-between">
          <p className="fw-semibold m-0">{user?.name}</p>
          <EditIcon submit={() => setEditName(true)} />
        </div>
      </div>
      <EditModal
        view={editName}
        title="Editar nome"
        setView={() => setEditName(false)}
        submit={handleValidationName}
        loading={loading}
      >
        <div className="d-flex align-items-start">
          <div className="flex-grow-1">
            <div
              ref={inputNameRef}
              onInput={handleInputName}
              autoFocus={true}
              onKeyDown={(event) =>
                event.key === 'Escape' ? handleCloseEdition() : null
              }
              className="profile__input-name"
              role="textbox"
              contentEditable={true}
            ></div>
            {editName ? <p className="text-end">{name.length}/30</p> : null}
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default memo(ChangeName);

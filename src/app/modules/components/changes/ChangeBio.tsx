import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../auth/AuthContext';
import {
  handlePositionCursor,
  handleSanitizeInput,
} from '../../helpers/utils/Utils';
import './Changes.scss';
import EditModal from '../modals/edit-modal/EditModal';
import { updateBio } from '../../helpers/api/UserEnpoints';
import { toast } from 'react-toastify';
import { handleValidateBio } from '../../helpers/validators/UserValidators';
import { handleError } from '../../helpers/utils/Requests';
import { UserModel } from '../../global/interfaces/UserModel';
import EditIcon from '../icons/EditIcon';

const ChangeBio = () => {
  const { user, setUser, token } = useContext(Context);
  const [bio, setBio] = useState<string>('');
  const [editBio, setEditBio] = useState<boolean>(false);
  const inputBioRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleCloseEdition(
    event?: React.KeyboardEvent<HTMLDivElement>,
  ): void {
    if (event) {
      if (event.key !== 'Escape') return;
    }

    setBio(user?.bio || '');
    setEditBio(false);

    if (inputBioRef.current) {
      inputBioRef.current.innerText = user?.bio || '';
    }
  }
  function handleInputBio() {
    if (!inputBioRef.current) return;

    const value = handleSanitizeInput(inputBioRef?.current?.innerText) || '';
    if (value.length <= 200) {
      setBio(value);
    } else if (inputBioRef.current) {
      inputBioRef.current.innerText = bio;
      handlePositionCursor(inputBioRef);
    }
  }
  function handleValidationBio() {
    if (handleValidateBio(bio)) {
      setLoading(true);
      handleChangeBio();
    }
  }
  function handleChangeBio() {
    updateBio(bio, token)
      .then((res) => {
        toast.success(res.data.message);

        setUser((prevState: UserModel | null) => {
          if (!prevState) return prevState;
          return {
            ...prevState,
            bio: res.data.data.bio,
            updatedAt: res.data.data.updated_at,
          };
        });
        setEditBio(false);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (inputBioRef.current && user && editBio) {
        setBio(user?.bio || '');
        inputBioRef.current.innerText = user.bio || '';
        inputBioRef.current.focus();
        handlePositionCursor(inputBioRef);
      }
    }, 0);
  }, [editBio, user]);
  return (
    <>
      <div className="mt-3">
        <p className="title fs-5 m-0">Bio</p>
        <div className="d-flex justify-content-between">
          <p className="fw-semibold m-0">{user?.bio}</p>
          <EditIcon submit={() => setEditBio(true)} />
        </div>
      </div>

      <EditModal
        view={editBio}
        title="Editar Bio"
        setView={() => setEditBio(false)}
        submit={handleValidationBio}
        loading={loading}
      >
        <div className="d-flex align-items-start">
          <div className="flex-grow-1">
            <div
              ref={inputBioRef}
              onInput={handleInputBio}
              autoFocus={true}
              onKeyDown={(event) =>
                event.key === 'Escape' ? handleCloseEdition() : null
              }
              className="profile__input-bio"
              role="textbox"
              contentEditable={true}
            ></div>
            {editBio ? <p className="text-end">{bio.length}/200</p> : null}
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default memo(ChangeBio);

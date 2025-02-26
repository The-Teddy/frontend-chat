import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.scss';
import { Context } from '../../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '../buttons/submit/SubmitButton';
import { uploadProfilePhoto } from '../../helpers/api/UploadEndpoints';
import { handleError, handleGetApi } from '../../helpers/utils/Requests';
import { UserModel } from '../../global/interfaces/UserModel';
import { handleValidateProfilePhoto } from '../../helpers/validators/FileValidators';
import { toast } from 'react-toastify';

const Profile = () => {
  const { handleLogout, user, token, setUser } = useContext(Context);
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [photoLoading, setPhotoLoading] = useState<boolean>(false);

  const inputNameRef = useRef<HTMLDivElement>(null);
  const inputBioRef = useRef<HTMLDivElement>(null);
  const inputPhoto = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputNameRef.current?.focus();
  }, []);

  function handleInputName() {
    const value = inputNameRef?.current?.innerText || '';
    if (value.trim().length <= 30) {
      setName(value.trim());
    } else if (inputNameRef.current) {
      inputNameRef.current.innerText = name;
    }
  }

  function handleChoosePhoto() {
    inputPhoto.current?.click();
  }
  function handleChangePhoto(event: any) {
    if (!handleValidateProfilePhoto(event.target.files[0])) {
      return;
    }
    const file = event.target.files[0];

    setPhoto(file);
    const fileReader = new FileReader();

    if (file) {
      fileReader.onloadend = () => {
        setPhotoPreview(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    }
  }
  function handleUploadPhoto() {
    if (photo) {
      if (!handleValidateProfilePhoto(photo)) {
        return;
      }
      const formData = new FormData();
      formData.append('file', photo);

      setPhotoLoading(true);
      uploadProfilePhoto(formData, token)
        .then((res) => {
          setUser((prevState: UserModel | null) => {
            if (!prevState) return prevState;
            return {
              ...prevState,
              photo: res.data.data.photo,
              updated_at: res.data.data.updated_at,
            };
          });
          if (inputPhoto.current) {
            inputPhoto.current.value = '';
          }
          toast.success('Foto de perfil atualizada com sucesso!');
          setPhoto(null);
          setPhotoPreview(null);
        })
        .catch((error) => {
          console.log(error);
          handleError(error);
        })
        .finally(() => {
          setPhotoLoading(false);
        });
    }
  }

  return (
    <div className="profile default-padding-top">
      <div className="content">
        <div className="title-box">
          <h1 className="title">Perfil</h1>
        </div>
        <div className="profile__img-box">
          <img
            className="profile__img"
            src={`${photoPreview ? photoPreview : user?.photo ? handleGetApi(user.photo) : '/images/default-image.png'}`}
            alt={user ? user?.name : 'Imagem em branco'}
          />
          <input
            accept="image/*"
            ref={inputPhoto}
            type="file"
            style={{ display: 'none' }}
            onChange={handleChangePhoto}
          />
          <SubmitButton
            title={photo ? 'Salvar foto' : 'Mudar foto'}
            submit={photo ? handleUploadPhoto : handleChoosePhoto}
            loading={photoLoading}
          />
        </div>
        <label className="w-100">
          Nome:
          <div
            ref={inputNameRef}
            onInput={handleInputName}
            autoFocus={true}
            className="profile__input-name"
            role="textbox"
            contentEditable={true}
          ></div>
          <p className="text-end">{name.length}/30</p>
        </label>
        <label className="w-100 mt-3">
          Bio:
          <div
            ref={inputBioRef}
            onInput={(e) => setBio(e.currentTarget.innerText.trim())}
            className="profile__input-bio"
            role="textbox"
            contentEditable={true}
          ></div>
          <p className="text-end">{bio.length}/200</p>
        </label>
      </div>
      <button className="logout" onClick={handleLogout}>
        <span>Logout</span> <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Profile;

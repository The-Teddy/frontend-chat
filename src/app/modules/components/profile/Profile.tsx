import React, { useContext } from 'react';
import './Profile.scss';
import { Context } from '../../auth/AuthContext';

const Profile = () => {
  const { handleLogout } = useContext(Context);
  return (
    <div className="profile">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;

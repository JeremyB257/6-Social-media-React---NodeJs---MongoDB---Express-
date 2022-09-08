import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { UidContext } from '../components/AppContext';
import LogPage from './LogPage';
import UpdateProfile from '../components/Profile/UpdateProfile';

const Profile = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <>
      <Navbar />
      <div className="profil-page">
        <UpdateProfile />
      </div>
    </>
  ) : (
    <LogPage />
  );
};

export default Profile;

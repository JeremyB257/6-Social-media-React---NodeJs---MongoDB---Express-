import React from 'react';
import Log from '../components/Log/Log';

const LogPage = () => {
  return (
    <div className="log-page">
      <img src="./img/icons/logo-plein.png" alt="icon orange" />
      <h3>Name Media</h3>
      <p>Connect With Your Friends Online</p>
      <div className="log-container">
        <Log login={true} signup={false} />
      </div>
    </div>
  );
};

export default LogPage;

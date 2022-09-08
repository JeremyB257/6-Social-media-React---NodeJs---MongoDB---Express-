import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [loginModal, setLoginModal] = useState(props.login);

  const changeModals = (e) => {
    if (e.target.id === 'login') {
      setSignUpModal(false);
      setLoginModal(true);
    } else if (e.target.id === 'register') {
      setLoginModal(false);
      setSignUpModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li onClick={changeModals} id="login" className={loginModal ? 'active-btn' : null}>
            Se Connecter
          </li>
          <li onClick={changeModals} id="register" className={signUpModal ? 'active-btn' : null}>
            S'inscrire
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default Log;

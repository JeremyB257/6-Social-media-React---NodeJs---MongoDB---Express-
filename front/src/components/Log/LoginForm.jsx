import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const loginErrors = document.querySelector('.login.error');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        window.location = '/home';
      })
      .catch((err) => {
        loginErrors.innerHTML = err.response.data.message;
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <br />
      <div className="login error"></div>
      <label htmlFor="email">Email</label>
      <br />
      <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      <br />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <br />
      <br />
      <input type="submit" value="Se connecter" />
      <br />
      <br />
    </form>
  );
};

export default LoginForm;

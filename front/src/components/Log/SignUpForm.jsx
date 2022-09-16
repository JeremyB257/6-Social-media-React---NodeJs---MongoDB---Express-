import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const signupErrors = document.querySelector('.signup.error');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_PUBLIC_URL}api/user/register`,
      withCredentials: true,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        setFormSubmit(true);
      })
      .catch((err) => {
        if (err.response.data.errors.pseudo) signupErrors.innerHTML = err.response.data.errors.pseudo;
        if (err.response.data.errors.email) signupErrors.innerHTML = err.response.data.errors.email;
        if (err.response.data.errors.password) signupErrors.innerHTML = err.response.data.errors.password;
      });
  };
  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <h4 className="success">Enregistrement reussi, veuillez vous connectez</h4>
        </>
      ) : (
        <form action="" onSubmit={handleSignUp} id="sign-up-form">
          <br />
          <div className="signup error"></div>
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            required
          />
          <br />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
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
          <input type="submit" value="S'inscrire" />
          <br />
          <br />
        </form>
      )}
    </>
  );
};

export default SignUpForm;

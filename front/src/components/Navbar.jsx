import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/home">
            <div className="logo">
              <img src="./img/icons/logo-plein.png" alt="logo" />
              <h3>Name Media</h3>
            </div>
          </NavLink>
        </div>
        <ul>
          <li className="welcome">
            <NavLink to="/profile">
              <h5>Bienvenue {userData.pseudo}</h5>
            </NavLink>
          </li>
          <Logout />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

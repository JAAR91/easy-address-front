import React from 'react';
import { NavLink } from 'react-router-dom';
import LogOut from '../logout.';
import './navbar.css';

const Navbar = () => {
  const menuLinks = [
    {
      id: 1,
      path: '/',
      text: 'Inicio',
    },
    {
      id: 2,
      path: '/address/new',
      text: 'Agregar Direcciones',
    },
    {
      id: 3,
      path: '/reservations',
      text: 'Reservations',
    },
  ];

  return (
    <nav className="navbar-container">
      <ul className={`links-container`}>
        {
          menuLinks.map((link) => (
            <li
            className="link-container"
            key={link.id}
          >
            <NavLink
              className="link"
              to={link.path}
              activeclassname="active"
              exact="true"
            >
              {link.text.toUpperCase()}
            </NavLink>
          </li>
          ))
        }
        <li className="link-container">
          <LogOut />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
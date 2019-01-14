import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/tweet/new">New Tweet</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

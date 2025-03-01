import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-equipment">Add Equipment</Link></li>
        <li><Link to="/add-user">Add User</Link></li>
        <li><Link to="/book-equipment">Book Equipment</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

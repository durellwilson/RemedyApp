import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">HerbaList</Link>
      <div>
        <Link to="/remedies">Remedies</Link>
        <Link to="/add-remedy">Add Remedy</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

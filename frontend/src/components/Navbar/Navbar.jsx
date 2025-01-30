import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-brand">
        <Link to="/">HerbaList</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/remedies">Remedies</Link>
        <Link to="/add-remedy">Add Remedy</Link>
      </div>
    </nav>
  );
};

export default Navbar;

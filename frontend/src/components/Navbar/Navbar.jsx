import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/">HerbaList</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/remedies">Remedies</Link>
        {user && <Link to="/add-remedy">Add Remedy</Link>}
        {user ? (
          <div className="user-menu">
            <span>{user.email}</span>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

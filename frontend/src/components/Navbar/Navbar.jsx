import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../LogoMarquee'
import '../../styles/NavBar.css'

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
    <>
      {/* Inline SVG filter definition for a soft green glow */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="soft-green-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur">
            <animate begin="r.mouseover" attributeName="stdDeviation" values="2;10" dur="1s" fill="freeze"></animate>
            <animate begin="r.mouseout" attributeName="stdDeviation" values="10;0" dur="1s" fill="freeze"></animate>
            </feGaussianBlur>
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0.5
                0 0 0 0 0
                0 0 0 1 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <nav className='navbar'>
        <div className="nav-brand">
          <Link to="/"><Logo /></Link>
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
    </>
  );
};

export default Navbar;

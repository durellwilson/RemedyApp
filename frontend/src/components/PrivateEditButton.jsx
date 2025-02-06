import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function PrivateEditButton({ onClick, children, className = '' }) {
  const { currentUser } = useAuth();

  // If no user is logged in, do not render the button.
  if (!currentUser) {
    return null;
  }

  return (
    <button onClick={onClick} className={`edit-btn ${className}`}>
      {children}
    </button>
  );
}

export default PrivateEditButton; 
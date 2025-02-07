import React, { useState, useEffect } from 'react';
import '../styles/DarkModeSlider.css';

const DarkModeSlider = () => {
  // Retrieve the stored preference, defaulting to false (light mode)
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference ? JSON.parse(storedPreference) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="dark-mode-slider">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={() => setDarkMode(!darkMode)} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkModeSlider; 
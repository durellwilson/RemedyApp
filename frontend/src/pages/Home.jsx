import React from 'react';
import { Link } from 'react-router-dom';
import HerbalLogo from '/herbalist.svg'

const Home = () => {
  return (
    <div className="home-container">
      <h1>HerbaList</h1>
      <p className="tagline">Discover traditional remedies for modern wellness</p>
      <div className="cta-buttons">
        <Link to="/remedies" className="cta-button">
          Browse Remedies
        </Link>
        <Link to="/add-remedy" className="cta-button">
          Share a Remedy
        </Link>
      </div>
      <img src={HerbalLogo} alt="HerbaList" style={{ width: '100%', height: 'auto' }} /> {/* HerbalList Logo */}
    </div>
  );
};

export default Home;
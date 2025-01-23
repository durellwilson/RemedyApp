import React, { useState } from 'react';
import '../../styles/RemedyCard.css';

const RemedyCard = ({ remedy }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className="remedy-card">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-face card-front">
            <div className="remedy-image">
              <img src={remedy.image.url} alt={remedy.image.alt} />
            </div>
            <div className="remedy-content">
              <h3>{remedy.name}</h3>
              <p className="ailment">For: {remedy.ailment}</p>
              <div className="ratings">
                <span>Effectiveness: {remedy.effectiveness_rating}/5</span>
                <span>Cost: {remedy.budget_rating}</span>
              </div>
              <button className="view-details-btn" onClick={handleFlip}>
                View Details
              </button>
            </div>
          </div>
  
          <div className="card-face card-back">
            <div className="remedy-content">
              <h3>{remedy.name}</h3>
              <div className="remedy-details">
                <h4>Ingredients:</h4>
                <ul>
                  {remedy.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {remedy.instructions.split('\n').map((step, index) => (
                    <li key={index}>{step.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
                <p className="source">Source: {remedy.source}</p>
              </div>
              <button className="view-details-btn" onClick={handleFlip}>
                Back to Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default RemedyCard;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/RemedyDetail.css';

const RemedyDetail = () => {
  const { id } = useParams();
  const [remedy, setRemedy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const renderCost = (budget) => {
    const dollarSign = "💵";
    switch (budget) {
      case "$":
        return dollarSign;
      case "$$":
        return dollarSign.repeat(2);
      case "$$$":
        return dollarSign.repeat(3);
      default:
        return budget;
    }
  };

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    axios
      .get(`/api/remedies/${id}`)
      .then((response) => {
        setRemedy(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch remedy details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading remedy...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!remedy) return <p className="error-message">No remedy found.</p>;

  const instructionsList = remedy.instructions
    .split('\n')
    .filter(line => line.trim().length > 0);

  return (
    <div className="remedy-detail-container">
      <div
        className="remedy-hero"
        style={{ backgroundImage: `url(${remedy.image.url})` }}
      >
        <div className="overlay">
          <h2 className="remedy-title">{remedy.name}</h2>
        </div>
      </div>
      <div className="remedy-detail-card">
        <div className="detail-row">
          <strong>Ailment:</strong>
          <span>{remedy.ailment}</span>
        </div>
        <div className="detail-row">
          <strong>Ingredients:</strong>
          <span>{remedy.ingredients.join(', ')}</span>
        </div>
        <div className="detail-row">
          <strong>Instructions:</strong>
          <span>
            <ol className="instructions-list">
              {instructionsList.map((step, index) => (
                <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          </span>
        </div>
        <div className="detail-row">
          <strong>Source:</strong>
          <span>{remedy.source}</span>
        </div>
        <div className="detail-row">
          <strong>Effectiveness:</strong>
          <span className="stars">{renderStars(remedy.effectiveness_rating)}</span>
        </div>
        <div className="detail-row">
          <strong>Budget:</strong>
          <span className="cost">{renderCost(remedy.budget_rating)}</span>
        </div>
      </div>
    </div>
  );
};

export default RemedyDetail; 
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import '../../styles/RemedyCard.css';

const RemedyCard = ({ remedy, onDelete, onEdit }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(remedy);
    const [localRemedy, setLocalRemedy] = useState(remedy);

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this remedy?')) {
        onDelete(remedy._id);
      }
    };
  
    const handleEdit = () => {
      setEditedData(localRemedy);
      setIsEditing(true);
    };

    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const updatedRemedy = {
          ...editedData,
          effectiveness_rating: Number(editedData.effectiveness_rating),
          ingredients: editedData.ingredients || localRemedy.ingredients,
          instructions: editedData.instructions || localRemedy.instructions
        };
        const result = await onEdit(remedy._id, updatedRemedy);
        if (result) {
          setLocalRemedy(result);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to update remedy:', error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
        if (name === 'image' || name === 'imageAlt') {
        setEditedData(prev => ({
            ...prev,
            image: {
              ...prev.image,
              [name === 'image' ? 'url' : 'alt']: value
            }
        }));
      } else {
        setEditedData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...editedData.ingredients];
        newIngredients[index] = value;
        setEditedData(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
    };

    const addIngredient = () => {
        setEditedData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }));
    };

    const removeIngredient = (index) => {
        setEditedData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const renderStars = (rating) => {
      return "★".repeat(rating) + "☆".repeat(5 - rating);
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

    return (
      <div className="remedy-card">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-face card-front">
            <div className="edit-icon" onClick={handleEdit}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <div className="remedy-image">
              <img src={localRemedy.image.url} alt={localRemedy.image.alt} />
            </div>
            <div className="remedy-content">
              <h3>{localRemedy.name}</h3>
              <div className="info-section">
                <div className="info-left">
                  <p className="ailment">For: {localRemedy.ailment}</p>
                </div>
                <div className="ratings">
                  <span className="stars">{renderStars(localRemedy.effectiveness_rating)}</span>
                  <span className="cost">{renderCost(localRemedy.budget_rating)}</span>
                </div>
              </div>
              <button className="view-details-btn" onClick={handleFlip}>
                View Details
              </button>
            </div>
          </div>
  
          <div className="card-face card-back">
            <div className="remedy-content">
              <h3>{localRemedy.name}</h3>
              <div className="remedy-details">
                <h4>Ingredients:</h4>
                <ul>
                  {localRemedy.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {localRemedy.instructions.split('\n').map((step, index) => (
                    <li key={index}>{step.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ol>
                <p className="source">Source: {localRemedy.source}</p>
              </div>
              <button className="view-details-btn" onClick={handleFlip}>
                Back to Preview
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="edit-form">
            <h3>Edit Remedy</h3>
            <form onSubmit={handleSave}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ailment:
                <input
                  type="text"
                  name="ailment"
                  value={editedData.ailment}
                  onChange={handleChange}
                />
              </label>
              <label>
                Effectiveness Rating:
                <input
                  type="number"
                  name="effectiveness_rating"
                  min="1"
                  max="5"
                  value={editedData.effectiveness_rating}
                  onChange={handleChange}
                />
              </label>
              <label>
                Budget Rating:
                <select
                  name="budget_rating"
                  value={editedData.budget_rating}
                  onChange={handleChange}
                >
                  <option value="$">$ (Low Cost)</option>
                  <option value="$$">$$ (Medium Cost)</option>
                  <option value="$$$">$$$ (High Cost)</option>
                </select>
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={editedData.image.url}
                  onChange={(e) => setEditedData({ ...editedData, image: { ...editedData.image, url: e.target.value } })}
                />
              </label>
              <label>
                Image Alt:
                <input
                  type="text"
                  name="imageAlt"
                  value={editedData.image.alt}
                  onChange={(e) => setEditedData({ ...editedData, image: { ...editedData.image, alt: e.target.value } })}
                />
              </label>
              <label>
                Ingredients:
                <div className="editable-list">
                    {editedData.ingredients.map((ingredient, index) => (
                        <div key={index} className="list-item">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                placeholder="Enter ingredient"
                            />
                            <button
                                type="button"
                                className="remove-item-btn"
                                onClick={() => removeIngredient(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="add-item-btn"
                        onClick={addIngredient}
                    >
                        Add Ingredient
                    </button>
                </div>
              </label>
              <label>
                Instructions:
                <textarea
                  name="instructions"
                  value={editedData.instructions}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter instructions (one step per line)"
                />
              </label>
              <label>
                Source:
                <input
                  type="text"
                  name="source"
                  value={editedData.source}
                  onChange={handleChange}
                />
              </label>
              <label></label>
              <div className="button-group">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="button" className="delete-btn" onClick={handleDelete}>
                  Delete Remedy
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  };

export default RemedyCard;

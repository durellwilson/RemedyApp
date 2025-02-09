import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ShareButtons from '../ShareButtons/ShareButtons';
import '../../styles/RemedyCard.css';
import { useAuth } from '../../contexts/AuthContext';


const RemedyCard = ({ remedy, onDelete, onEdit }) => {
    const { user } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(remedy);
    const [localRemedy, setLocalRemedy] = useState(remedy);

    // Construct a unique link for the remedy card.
    const remedyLink = `${window.location.origin}/remedies/${localRemedy._id}`;

    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this remedy?')) {
        onDelete(remedy._id);
      }
    };
  
    const handleEdit = async (id, updatedData) => {
      try {
        const response = await onEdit(id, updatedData);
        if (!response) {
          throw new Error('No response from API');
        }
        setLocalRemedy(response);
        return response;
      } catch (err) {
        return null;
      }
    };

    const handleSave = async (e) => {
      e.preventDefault();
      const updatedData = {
        name: editedData.name,
        ailment: editedData.ailment,
        ingredients: editedData.ingredients.filter(i => i.trim()),
        instructions: editedData.instructions,
        effectiveness_rating: Number(editedData.effectiveness_rating),
        budget_rating: editedData.budget_rating,
        source: editedData.source,
        image: {
          url: editedData.image.url,
          alt: editedData.image.alt
        }
      };

      const result = await handleEdit(remedy._id, updatedData);
      if (result) {
        setLocalRemedy(result);
        setEditedData(result);
        setIsEditing(false);
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
      setEditedData(prev => ({
        ...prev,
        ingredients: prev.ingredients.map((item, i) => i === index ? value : item)
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
        case "$": return dollarSign;
        case "$$": return dollarSign.repeat(2);
        case "$$$": return dollarSign.repeat(3);
        default: return budget;
      }
    };

    return (
      <div className="remedy-card">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-face card-front">
            {user && (
              <div className="edit-icon" onClick={() => setIsEditing(true)}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            )}
            <div className="remedy-image" style={{ position: 'relative' }}>
              <img src={localRemedy.image.url} alt={localRemedy.image.alt} />
              <div className="share-icon-overlay">
                <ShareButtons
                  url={remedyLink}
                  title="Check out this remedy"
                  description="This remedy is helpful..."
                  imageUrl={localRemedy.image.url}
                  containerClass="share-overlay"
                />
              </div>
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
              <button className="view-details-btn" onClick={handleFlip}>View Details</button>
            </div>
          </div>

          <div className="card-face card-back">
            {user && (
              <div className="edit-icon" onClick={() => setIsEditing(true)}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            )}
            <div className="remedy-content" style={{ position: 'relative' }}>
              <div className="share-icon-overlay">
                <ShareButtons
                  url={remedyLink}
                  title="Check out this remedy"
                  description="This remedy is helpful..."
                  imageUrl={localRemedy.image.url}
                  containerClass="share-overlay"
                />
              </div>
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
              <button className="view-details-btn" onClick={handleFlip}>Back to Preview</button>
            </div>
          </div>
        </div>

        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="edit-form">
            <h3>Edit Remedy</h3>
            <form onSubmit={handleSave}>
              <label>
                Name:
                <input type="text" name="name" value={editedData.name} onChange={handleChange} />
              </label>
              <label>
                Ailment:
                <input type="text" name="ailment" value={editedData.ailment} onChange={handleChange} />
              </label>
              <label>
                Effectiveness Rating:
                <input type="number" name="effectiveness_rating" min="1" max="5" 
                  value={editedData.effectiveness_rating} onChange={handleChange} />
              </label>
              <label>
                Budget Rating:
                <select name="budget_rating" value={editedData.budget_rating} onChange={handleChange}>
                  <option value="$">$ (Low Cost)</option>
                  <option value="$$">$$ (Medium Cost)</option>
                  <option value="$$$">$$$ (High Cost)</option>
                </select>
              </label>
              <label>
                Image URL:
                <input type="text" name="image" value={editedData.image.url} onChange={handleChange} />
              </label>
              <label>
                Image Alt:
                <input type="text" name="imageAlt" value={editedData.image.alt} onChange={handleChange} />
              </label>
              <label>
                Ingredients:
                <div className="editable-list">
                  {editedData.ingredients.map((ingredient, index) => (
                    <div key={index} className="list-item">
                      <input type="text" value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder="Enter ingredient" />
                      <button type="button" className="remove-item-btn"
                        onClick={() => removeIngredient(index)}>×</button>
                    </div>
                  ))}
                  <button type="button" className="add-item-btn" onClick={addIngredient}>
                    Add Ingredient
                  </button>
                </div>
              </label>
              <label>
                Instructions:
                <textarea name="instructions" value={editedData.instructions}
                  onChange={handleChange} rows="4"
                  placeholder="Enter instructions (one step per line)" />
              </label>
              <label>
                Source:
                <input type="text" name="source" value={editedData.source} onChange={handleChange} />
              </label>
              <div className="button-group">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="button" className="delete-btn" onClick={handleDelete}>Delete Remedy</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
};

export default RemedyCard;

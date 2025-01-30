import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import '../../styles/RemedyCard.css';

const RemedyCard = ({ remedy, onDelete, onEdit }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(remedy);
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this remedy?')) {
        onDelete(remedy._id);
      }
    };
  
    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = (e) => {
      e.preventDefault();
      // Ensure all required fields are present
      const updatedRemedy = {
        ...editedData,
        effectiveness_rating: Number(editedData.effectiveness_rating)
      };
      onEdit(remedy._id, updatedRemedy);
      setIsEditing(false);
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
              <button class="edit-btn" onClick={handleEdit}>Edit</button>
              <button class ="delete-btn" onClick={handleDelete}>Delete</button>
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

        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="edit-form">
            <h3>Edit Remedy</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
              <div className="button-group">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  };

export default RemedyCard;

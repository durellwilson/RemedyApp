import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRemedies } from '../../utils/mockData';
import '../../styles/RemedyForm.css';

const AddRemedyForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    ailment: '',
    ingredients: [''],
    instructions: '',
    effectiveness_rating: 1,
    budget_rating: '$',
    source: '',
    image: {
      url: '',
      alt: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      image: {
        ...prev.image,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRemedy = {
        ...formData,
        _id: String(mockRemedies.length + 1),
        created_date: new Date().toISOString()
      };
      
      console.log('New Remedy:', newRemedy);
      navigate('/remedies');
    } catch (err) {
      setError('Failed to create remedy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Remedy</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="remedy-form">
        <div className="form-group">
          <label htmlFor="name">Remedy Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter remedy name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ailment">Ailment*</label>
          <input
            type="text"
            id="ailment"
            name="ailment"
            value={formData.ailment}
            onChange={handleChange}
            required
            placeholder="What condition does this treat?"
          />
        </div>

        <div className="form-group">
          <label>Ingredients*</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="remove-ingredient-btn"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="add-ingredient-btn"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions*</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            placeholder="Step by step instructions..."
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="effectiveness_rating">Effectiveness Rating*</label>
          <select
            id="effectiveness_rating"
            name="effectiveness_rating"
            value={formData.effectiveness_rating}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget_rating">Budget Rating*</label>
          <select
            id="budget_rating"
            name="budget_rating"
            value={formData.budget_rating}
            onChange={handleChange}
            required
          >
            {['$', '$$', '$$$'].map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Where did you learn this remedy?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image-url">Image URL</label>
          <input
            type="url"
            id="image-url"
            name="url"
            value={formData.image.url}
            onChange={handleImageChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image-alt">Image Description</label>
          <input
            type="text"
            id="image-alt"
            name="alt"
            value={formData.image.alt}
            onChange={handleImageChange}
            placeholder="Describe the image"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Add Remedy'}
        </button>
      </form>
    </div>
  );
};

export default AddRemedyForm;

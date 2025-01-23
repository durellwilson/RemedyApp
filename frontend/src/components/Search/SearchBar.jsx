// components/Search/SearchBar.jsx
import React, { useState } from 'react';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, data }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    // Filter suggestions based on input
    const filtered = data.filter(
      remedy => remedy.name.toLowerCase().includes(userInput.toLowerCase()) ||
                remedy.ailment.toLowerCase().includes(userInput.toLowerCase())
    );
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search remedies..."
        className="search-input"
      />
      {showSuggestions && inputValue && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion) => (
            <li 
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              <span className="suggestion-name">{suggestion.name}</span>
              <span className="suggestion-ailment">for {suggestion.ailment}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

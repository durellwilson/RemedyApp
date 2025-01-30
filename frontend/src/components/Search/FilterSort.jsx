// src/components/Search/FilterSort.jsx
import React, { useState } from 'react';
import '../../styles/FilterSort.css';

const FilterSort = ({ 
  onSortChange, 
  onFilterApply,
  onFilterReset,
  sortOption 
}) => {
  const [filterValues, setFilterValues] = useState({
    effectiveness: '',
    budget: ''
  });

  const handleFilterChange = (type, value) => {
    const newFilterValues = {
      ...filterValues,
      [type]: value
    };
    setFilterValues(newFilterValues);
    console.log('Filter values updated:', newFilterValues); // Debug log
  };

  const handleApplyFilters = () => {
    // Only apply if at least one filter is set
    if (filterValues.effectiveness || filterValues.budget) {
      console.log('Applying filters:', filterValues); // Debug log
      onFilterApply({...filterValues}); // Pass a copy of the filter values
    }
  };

  const handleResetFilters = () => {
    const resetValues = {
      effectiveness: '',
      budget: ''
    };
    setFilterValues(resetValues);
    onFilterReset();
  };

  return (
    <div className="filter-sort-container">
      <div className="filters-section">
        <div className="filter-group">
          <label>Effectiveness:</label>
          <select 
            onChange={(e) => handleFilterChange('effectiveness', e.target.value)}
            value={filterValues.effectiveness}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Budget:</label>
          <select 
            onChange={(e) => handleFilterChange('budget', e.target.value)}
            value={filterValues.budget}
          >
            <option value="">All Prices</option>
            <option value="$">$ (Budget)</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Premium)</option>
          </select>
        </div>

        <div className="filter-buttons">
          <button 
            className="apply-button"
            onClick={handleApplyFilters}
            disabled={!filterValues.effectiveness && !filterValues.budget}
          >
            Apply Filters
          </button>
          <button 
            className="reset-button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="sort-group">
        <label>Sort By:</label>
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          value={sortOption}
          className="sort-select"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="rating-high">Highest Rated</option>
          <option value="rating-low">Lowest Rated</option>
          <option value="budget-low">Budget (Low to High)</option>
          <option value="budget-high">Budget (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;

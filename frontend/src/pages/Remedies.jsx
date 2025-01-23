import React, { useState, useEffect } from 'react';
import RemedyCard from '../components/Remedies/RemedyCard';
import SearchBar from '../components/Search/SearchBar';
import FilterSort from '../components/Search/FilterSort';
import { mockRemedies } from '../utils/mockData';
import '../styles/Remedies.css';

const Remedies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [remedies] = useState(mockRemedies);
  const [filteredRemedies, setFilteredRemedies] = useState(mockRemedies);
  const [activeFilters, setActiveFilters] = useState({
    effectiveness: '',
    budget: ''
  });
  const [sortOption, setSortOption] = useState('name-asc');

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleFilterApply = (filters) => {
    setActiveFilters(filters);
  };

  const handleFilterReset = () => {
    setActiveFilters({
      effectiveness: '',
      budget: ''
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    let updated = [...remedies];

    // Apply effectiveness filter
    if (activeFilters.effectiveness) {
      updated = updated.filter(r =>
        r.effectiveness_rating >= parseInt(activeFilters.effectiveness)
      );
    }

    // Apply budget filter
    if (activeFilters.budget) {
      updated = updated.filter(r => r.budget_rating === activeFilters.budget);
    }

    // Apply search filter
    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
      updated = updated.filter(r =>
        r.name.toLowerCase().includes(termLower) ||
        r.ailment.toLowerCase().includes(termLower) ||
        r.ingredients.some(i => i.toLowerCase().includes(termLower))
      );
    }

    // Sort the results
    const budgetValue = { '$': 1, '$$': 2, '$$$': 3 };
    switch (sortOption) {
      case 'name-asc':
        updated.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        updated.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-high':
        updated.sort((a, b) => b.effectiveness_rating - a.effectiveness_rating);
        break;
      case 'rating-low':
        updated.sort((a, b) => a.effectiveness_rating - b.effectiveness_rating);
        break;
      case 'budget-low':
        updated.sort((a, b) => budgetValue[a.budget_rating] - budgetValue[b.budget_rating]);
        break;
      case 'budget-high':
        updated.sort((a, b) => budgetValue[b.budget_rating] - budgetValue[a.budget_rating]);
        break;
      default:
        break;
    }

    setFilteredRemedies(updated);
  }, [remedies, activeFilters, searchTerm, sortOption]);

  return (
    <div className="remedies-container">
      <h2>Natural Remedies</h2>
      <SearchBar 
        onSearch={handleSearch} 
        data={remedies}
      />
      <FilterSort 
        onSortChange={handleSort}
        onFilterApply={handleFilterApply}
        onFilterReset={handleFilterReset}
        sortOption={sortOption}
      />
      
      {filteredRemedies.length === 0 ? (
        <div className="no-results">
          <p>No remedies found matching your criteria</p>
        </div>
      ) : (
        <div className="remedies-grid">
          {filteredRemedies.map((remedy) => (
            <RemedyCard key={remedy._id} remedy={remedy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Remedies;

import React, { useState, useEffect } from 'react';
import RemedyCard from '../components/Remedies/RemedyCard';
import SearchBar from '../components/Search/SearchBar';
import FilterSort from '../components/Search/FilterSort';
import { api } from '../services/api';
import '../styles/Remedies.css';

const Remedies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [filteredRemedies, setFilteredRemedies] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    effectiveness: '',
    budget: ''
  });
  const [sortOption, setSortOption] = useState('name-asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await api.deleteRemedy(id);
      setRemedies(remedies.filter(remedy => remedy._id !== id));
    } catch (err) {
      setError('Failed to delete remedy');
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await api.updateRemedy(id, updatedData);
      setRemedies(remedies.map(remedy => remedy._id === id ? response.data : remedy));
    } catch (err) {
      setError('Failed to update remedy');
    }
  };

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const data = await api.getRemedies();
        setRemedies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

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
            <RemedyCard 
              key={remedy._id} 
              remedy={remedy} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Remedies;

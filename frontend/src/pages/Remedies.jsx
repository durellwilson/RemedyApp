import React, { useState, useEffect, useRef } from 'react';
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

  const gridRef = useRef(null);

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
      setRemedies(prev => prev.filter(remedy => remedy._id !== id));
    } catch (err) {
      setError('Failed to delete remedy');
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await api.updateRemedy(id, updatedData);
      if (!response) return null;
      
      setRemedies(prev => 
        prev.map(remedy => 
          remedy._id === id ? response : remedy
        )
      );
      return response;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const data = await api.getRemedies();
        if (Array.isArray(data) && data.every(remedy => remedy && remedy._id)) {
          setRemedies(data);
          setFilteredRemedies(data);
        } else {
          throw new Error('Invalid data structure received from API');
        }
      } catch (err) {
        setError('Failed to fetch remedies');
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  useEffect(() => {
    if (!Array.isArray(remedies)) return;
    
    let updated = remedies.filter(remedy => remedy && remedy._id);

    if (activeFilters.effectiveness) {
      updated = updated.filter(r =>
        r.effectiveness_rating >= parseInt(activeFilters.effectiveness)
      );
    }

    if (activeFilters.budget) {
      updated = updated.filter(r => r.budget_rating === activeFilters.budget);
    }

    if (searchTerm) {
      const termLower = searchTerm.toLowerCase();
      updated = updated.filter(r =>
        r.name.toLowerCase().includes(termLower) ||
        r.ailment.toLowerCase().includes(termLower) ||
        r.ingredients.some(i => i.toLowerCase().includes(termLower))
      );
    }

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

  useEffect(() => {
    if (searchTerm && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchTerm]);

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
      
      {!filteredRemedies || filteredRemedies.length === 0 ? (
        <div className="no-results">
          <p>No remedies found matching your criteria</p>
        </div>
      ) : (
        <div className="remedies-grid" ref={gridRef}>
          {filteredRemedies.map((remedy) => remedy && remedy._id ? (
            <RemedyCard 
              key={remedy._id}
              remedy={remedy}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : null)}
        </div>
      )}
    </div>
  );
};

export default Remedies;

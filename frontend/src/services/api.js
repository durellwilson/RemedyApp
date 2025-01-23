import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  // Get all remedies
  getRemedies: () => axios.get(`${API_URL}/remedies`),
  
  // Get single remedy
  getRemedy: (id) => axios.get(`${API_URL}/remedies/${id}`),
  
  // Create new remedy
  createRemedy: (remedyData) => axios.post(`${API_URL}/remedies`, remedyData),
  
  // Update remedy
  updateRemedy: (id, remedyData) => axios.put(`${API_URL}/remedies/${id}`, remedyData),
  
  // Delete remedy
  deleteRemedy: (id) => axios.delete(`${API_URL}/remedies/${id}`)
};

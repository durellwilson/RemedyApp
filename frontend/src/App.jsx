// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Remedies from './pages/Remedies';
import AddRemedyForm from './components/Remedies/AddRemedyForm';
import './styles/common.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/remedies" element={<Remedies />} />
            <Route path="/add-remedy" element={<AddRemedyForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

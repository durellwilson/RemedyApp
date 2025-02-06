// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Remedies from './pages/Remedies';
import AddRemedyForm from './components/Remedies/AddRemedyForm';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import RemedyDetail from './components/Remedies/RemedyDetail';
import './styles/common.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/remedies" element={<Remedies />} />
              <Route 
                path="/add-remedy" 
                element={
                  <PrivateRoute>
                    <AddRemedyForm />
                  </PrivateRoute>
                } 
              />
              <Route path="/remedies/:id" element={<RemedyDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

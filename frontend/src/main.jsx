import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Find the root element first
const rootElement = document.getElementById('root')

// Ensure the root element exists before creating root
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

// Create root and render
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
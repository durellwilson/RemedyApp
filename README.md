# HerbaList - Natural Remedy Directory

A modern web application for discovering and sharing traditional remedies, built with React and Vite. HerbaList allows users to explore, share, and manage natural remedies with effectiveness ratings and budget considerations.

## 🌟 Features

- 🌿 Browse natural remedies
- 🔍 Advanced search and filtering capabilities
- ⭐ Rate remedies by effectiveness (1-5 stars)
- 💰 Budget indicators ($, $$, $$$)
- 📝 Detailed remedy information including ingredients and instructions
- 📱 Responsive design for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (for backend)

### Installation

1. Clone the repository
bash
git clone https://github.com/durellwilson/RemedyApp.git
cd RemedyApp

2. Install dependencies
bash
Frontend dependencies
cd frontend
npm install

3. Set up environment variables
Create a `.env` file in the frontend directory:
env
VITE_API_URL=http://localhost:3000/api

4. Start the development server
bash
npm run dev

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

frontend/
├── src/
│ ├── components/
│ │ ├── Navbar/
│ │ └── Remedies/
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── Remedies.jsx
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ ├── common.css
│ │ └── index.css
│ ├── App.jsx
│ └── main.jsx
├── index.html
└── package.json

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Tech Stack

### Frontend
- React 18
- React Router DOM v7
- Vite
- Axios

### Backend API Endpoints
- `GET /api/remedies` - Get all remedies
- `POST /api/remedies` - Create new remedy
- `PUT /api/remedies/:id` - Update remedy
- `DELETE /api/remedies/:id` - Delete remedy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Modern mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

- Built with Vite for optimal development experience
- Modular CSS organization
- Centralized API service
- Component-based architecture
- Responsive design principles

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Durell Wilson - Lead Developer
- Contact: durellwilsondetroit@gmail.com
- Project Link: https://github.com/durellwilson/RemedyApp

## 🙏 Acknowledgments

- Grand Circus Bootcamp
- Open source community
- All contributors and testers
This README includes:
Clear project description
Detailed setup instructions
Project structure
Available scripts
Tech stack details
Contributing guidelines
Contact information
Emojis for better readability
Acknowledgments section
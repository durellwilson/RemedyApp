# HerbaList

HerbaList is a final project developed during the Grand Circus Full Stack JavaScript Bootcamp (January-February 2025), designed to help users discover and share traditional herbal remedies. Built with the MERN stack, this application demonstrates proficiency in modern web development practices while providing a practical solution for accessing herbal remedy information.

## Features

- 🌿 Browse traditional home remedies
- 🔍 Real-time search functionality
- ⭐ Filter by effectiveness rating
- 💰 Filter by budget level
- 🔄 Advanced sorting options
- 📱 Responsive design

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

## Installation

1. Clone the repository
```
git clone https://github.com/durellwilson/RemedyApp.git
cd RemedyApp
```

2. Install dependencies
```
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables

Create `.env` in backend directory:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

Create `.env` in frontend directory:
```
VITE_API_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start development servers
```
# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm start
```

## 🏗️ Project Structure
```
RemedyApp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- User authentication
- Personal remedy collections
- Community ratings and reviews
- Social sharing features
- Mobile application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Grand Circus Bootcamp instructors and staff
- Fellow bootcamp students
- Open source community

## Contact

Kaycee
Meek
Durell Wilson - [durellwilsondetroit@gmail.com]
Project Link: 
[https://github.com/durellwilson/RemedyApp](https://github.com/durellwilson/RemedyApp)


# 🎬 FilmFinder MERN

FilmFinder is a full-stack movie discovery platform where users can explore movies, manage watchlists, track watched history, and post reviews. It also includes an admin dashboard for managing movies and users.

## 🚀 Live Demo

### Frontend
https://filmfinder-mern.netlify.app

### Backend
https://filmfinder-mern.onrender.com

---

## 📌 Features

### 👤 User Features
- User registration and login with JWT authentication
- Browse all movies
- Search movies by title or genre
- View detailed movie information
- Add/remove movies from watchlist
- Mark movies as watched
- Add movie reviews and ratings
- View personal watch history

### 🛠 Admin Features
- Admin login access
- Add new movies
- Edit existing movies
- Delete movies
- Manage all movies from dashboard
- View user reviews
- Manage users

---

## 🧰 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
FilmFinder-MERN/
│── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│
│── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── main.jsx
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Apoorva-Bairi/FilmFinder-MERN.git
cd FilmFinder-MERN
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔐 Authentication

FilmFinder uses JWT-based authentication:

- Protected user routes
- Protected admin routes
- Role-based access control

---

## 📖 API Endpoints

### Users

- POST `/api/users/register`
- POST `/api/users/login`

### Movies

- GET `/api/Movies/getAllmovies`
- POST `/api/Movies/addNewMovie`
- PUT `/api/Movies/updateMovieByMovieId/:id`
- DELETE `/api/Movies/deleteMovieByMovieId/:id`

### Reviews

- POST `/api/userReview/addReview`
- GET `/api/userReview/getReviewsByMovieId/:movieId`

### Watchlist

- POST `/api/Watchlist/addWatchlist`
- GET `/api/Watchlist/getWatchlistByUserId/:userId`

### Watch History

- POST `/api/WatchHistory/addWatchHistory`
- GET `/api/WatchHistory/getWatchHistoryByUserId/:userId`

---

## 👨‍💻 Author

Apoorva Bairi

GitHub: https://github.com/Apoorva-Bairi

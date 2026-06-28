# FilmFinder MERN

Converted from the original .NET + Angular FilmFinder project into MERN.

## Tech Stack

- MongoDB Atlas
- Express.js
- React + Vite
- Node.js
- JWT authentication

## Features

- User register/login
- JWT protected routes
- Admin movie CRUD
- User movie listing and details
- Movie reviews
- User watchlist
- MongoDB collections: `Users`, `Movies`, `Reviews`, `Watchlist`

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Inside `backend/.env`, add your MongoDB Atlas password:

```env
PORT=5000
MONGO_URI=mongodb+srv://apoorvappu6534_db_user:<YOUR_DB_PASSWORD>@cluster0.feyas6v.mongodb.net/filmfinder?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Replace `<YOUR_DB_PASSWORD>` with your real password only in `.env`.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Important

Do not push your real `.env` file to GitHub. Only push `.env.example`.

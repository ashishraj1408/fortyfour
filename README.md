# FortyFour CRM Assignment

A full-stack user management application built with React 19 + Vite on the frontend and Node.js + Express + PostgreSQL + Sequelize on the backend.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Material UI (MUI v7)
- React Hook Form
- Yup
- React Hot Toast

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Project Structure

```text
project-root
├── frontend/
│   ├── src/
│   └── package.json
└── backend/
    ├── src/
    └── package.json
```

## Backend Setup

1. Navigate to the backend folder.
2. Copy `.env.example` to `.env`.
3. Update your PostgreSQL connection string if needed.
4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm run dev
```

## Frontend Setup

1. Navigate to the frontend folder.
2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

## Environment Variables

Example backend environment:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5433/fortyfour
NODE_ENV=development
```

## Database Setup

1. Create a PostgreSQL database named `fortyfour`.
2. Ensure the PostgreSQL server is running on the configured port.
3. Sequelize will sync the `users` table automatically when the server starts.

## API Endpoints

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Features

- CRUD for users
- Server-side validation
- Duplicate email prevention
- Centralized error handling
- Dashboard table with search
- Create, edit, view, and delete user workflows
- Material UI design and responsive layout
- Toast notifications and loading states

## Run Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes

- The frontend expects the backend API at `http://localhost:5000/api` by default.
- You can override the base URL using a Vite environment variable named `VITE_API_BASE_URL`.

# 🚀 Task Manager - Full Stack Application

A robust, secure full-stack task management application. This project demonstrates a clean MVC (Model-View-Controller) architecture with RESTful API, professional-grade authentication, seamless frontend-backend integration, and modern serverless deployment.

**🔗 Live Demo:** https://task-manager-api-frontend-steel.vercel.app/
**⚙️ Live API Base URL:** https://task-manager-api-sage-zeta.vercel.app/

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router DOM, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Hosted on Neon.tech)
- **Security:** JWT (JSON Web Tokens), Bcrypt.js (Password Hashing)
- **Deployment:** Vercel (Serverless Edge Network)

## ✨ Key Features

- **Secure Authentication Flow:** User registration and login with encrypted passwords using Bcrypt, plus instant auto-login post-registration.
- **Stateless Authorization:** Middleware-level backend protection and frontend protected routes using JWT.
- **Full CRUD Operations:** Create, Read, Update, and Delete tasks with strict user-specific database ownership.
- **Modern UI/UX:** Responsive dark-mode interface with instant state updates and frontend validation.
- **Serverless Architecture:** Express API configured specifically to run on Vercel's serverless edge functions.

## 📂 Project Structure

```text
├── client/          # React Frontend (Vite)
│   ├── src/
│   │   ├── api/     # Axios interceptors & API configurations
│   │   ├── components/# Reusable UI (Protected Routes)
│   │   ├── context/ # Global state (AuthContext)
│   │   └── pages/   # UI Views (Login, Register, Dashboard)
│
├── src/             # Node.js Backend API
│   ├── config/      # Database connection & SQL schema
│   ├── controllers/ # Business logic (Register, Login, Task CRUD)
│   ├── middleware/  # Auth Gatekeeper (JWT verification)
│   └── routes/      # URL endpoint mapping
│
├── server.js        # Backend Entry point
└── vercel.json      # Serverless deployment configuration
```

## 🚀 Getting Started (Local Development)

### 1. Prerequisites

- Node.js (v18+ recommended)
- A PostgreSQL database (Neon.tech or local)

### 2. Installation

Clone the repository:

```bash
git clone https://github.com/SirYazoo/task-manager-api.git
cd task-manager-api
```

### 3. Backend Setup

Install server dependencies and configure the environment:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_random_secret_string
JWT_EXPIRES_IN=7d
```

Initialize the database tables:

```bash
npm run init-db
```

Start the backend server:

```bash
npm run dev
```

### 4. Frontend Setup

Open a new terminal window, navigate to the client folder, and start the Vite development server:

```bash
cd client
npm install
npm run dev
```

## 🧪 API Endpoints

### Auth

- `POST /api/auth/register` - Create a new account and receive JWT
- `POST /api/auth/login` - Authenticate and receive JWT

### Tasks (Protected via Bearer Token)

- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task (Ownership verified)
- `DELETE /api/tasks/:id` - Delete a task (Ownership verified)

## 🗺️ Upcoming Features (Roadmap)

- **Data Pagination:** Implementing limit and offset logic to handle large database queries efficiently.
- **Advanced Querying:** Adding backend query parameter support and frontend controls for filtering (e.g., by status) and sorting (e.g., chronologically).
- **Account Management:** Building secure password reset flows and user account deletion endpoints.

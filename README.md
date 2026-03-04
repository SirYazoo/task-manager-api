# 🚀 Task Manager API

A robust, secure RESTful API built with **Node.js**, **Express**, and **PostgreSQL**. This project demonstrates a clean MVC (Model-View-Controller) architecture, professional-grade authentication, and secure data handling.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon.tech)
- **Security:** JWT (JSON Web Tokens), Bcrypt.js (Password Hashing)
- **Validation:** Express-Validator (Sanitization & XSS Protection)

## ✨ Key Features
- **Secure Authentication:** User registration and login with encrypted passwords using Bcrypt.
- **Stateless Authorization:** Middleware-level protection using JWT (JSON Web Tokens).
- **Full CRUD Operations:** Create, Read, Update, and Delete tasks with strict user-specific ownership.
- **Input Sanitization:** Prevention of SQL Injection and XSS (Cross-Site Scripting) through parameterized queries and validation middleware.

## 📂 Project Structure
```text
├── src/
│   ├── config/      # Database connection & SQL schema
│   ├── controllers/ # Business logic (Register, Login, Task CRUD)
│   ├── middleware/  # Auth Gatekeeper (JWT verification)
│   ├── routes/      # URL endpoint mapping
│   └── server.js    # Entry point
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- A PostgreSQL database (Neon.tech or local)

### 2. Installation
```bash
git clone https://github.com/SirYazoo/task-manager-api.git
cd task-manager-api
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_random_secret_string
JWT_EXPIRES_IN=7d
```

### 4. Database Initialization
Run the migration script to create the `users` and `tasks` tables:
```bash
node init-db.js
```

### 5. Running the API
```bash
# Development mode with hot-reload
npm run dev

# Production mode
npm start
```

## 🧪 API Endpoints

### Auth
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate and receive JWT

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task (Ownership verified)
- `DELETE /api/tasks/:id` - Delete a task (Ownership verified)

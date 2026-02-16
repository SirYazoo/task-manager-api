require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Task Manager API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Routes
const authRouter = require('./js/routes/loginRoute');
app.use('/api', authRouter);

// Static file serving
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/home.html'));
});

// Start server
const PORT = 5500;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`🔐 Login: http://localhost:${PORT}/pages/auth/login.html`);
    }
});
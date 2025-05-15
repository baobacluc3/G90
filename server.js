const express = require('express');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files cho project
app.use(express.static(path.join(__dirname)));

// Routes
const authRouter = require('./js/routes/loginRoute');
const adminRouter = require('./js/routes/adminRoutes');

app.use('/api', authRouter);
app.use('/api', adminRouter);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/home.html'));
});


app.get('*.html', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;
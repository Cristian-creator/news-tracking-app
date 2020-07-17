const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());

// --- users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// --- news
const newsRoutes = require('./routes/news');
app.use('/news', newsRoutes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`))

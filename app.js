const express = require('express');
const app = express()
const mongoose = require('mongoose');

// Environment variables
require('dotenv/config')

// Route imports
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')


// Middlewares
app.use(express.json());
// Route Middlewares
app.use('/', homeRoutes)
app.use('/api/user', authRoutes)


// Connect to Database
mongoose.connect(process.env.DB_URL, () => {
    console.log('Connected to Database')
})


// Starting the server
app.listen(process.env.PORT, () => {
    console.log(`Application running at http://localhost:${process.env.PORT}/`)
})
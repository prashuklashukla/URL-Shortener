const express = require('express')
const app = express()
const urlRoutes = require('./src/routes/Url.routes')
const { redirectUrl } = require('./src/controllers/Url.controllers')

app.use(express.json())


// API Routes
app.use('/api/url', urlRoutes)

// Redirect route (must be after API routes so it doesn't catch them)
app.get('/:shortCode', redirectUrl)


module.exports = app
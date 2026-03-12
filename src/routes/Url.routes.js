const express = require('express')
const router = express.Router()
const { shortenUrl } = require('../controllers/Url.controllers')

// POST /api/url/shorten → Create a short URL
router.post('/shorten', shortenUrl)

module.exports = router

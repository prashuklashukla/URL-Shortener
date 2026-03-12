const { nanoid } = require('nanoid')
const Url = require('../models/Url.models')

// @desc    Create a short URL
// @route   POST /api/url/shorten
const shortenUrl = async (req, res) => {
    const { originUrl } = req.body

    // Validate that a URL was provided
    if (!originUrl) {
        return res.status(400).json({ error: 'Please provide a URL' })
    }

    try {
        // Check if this URL has already been shortened
        const existingUrl = await Url.findOne({ originUrl })
        if (existingUrl) {
            return res.status(200).json({
                originUrl: existingUrl.originUrl,
                shortCode: existingUrl.shortCode,
                shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortCode}`,
                clicks: existingUrl.clicks
            })
        }

        // Generate a unique short code (8 characters)
        const shortCode = nanoid(8)

        // Save to database
        const newUrl = await Url.create({ originUrl, shortCode })

        return res.status(201).json({
            originUrl: newUrl.originUrl,
            shortCode: newUrl.shortCode,
            shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`,
            clicks: newUrl.clicks
        })
    } catch (error) {
        console.error('Error creating short URL:', error)
        return res.status(500).json({ error: 'Server error' })
    }
}

// @desc    Redirect to the original URL
// @route   GET /:shortCode
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params

    try {
        const url = await Url.findOne({ shortCode })

        if (!url) {
            return res.status(404).json({ error: 'URL not found' })
        }

        // Increment click count
        url.clicks += 1
        await url.save()

        return res.redirect(url.originUrl)
    } catch (error) {
        console.error('Error redirecting:', error)
        return res.status(500).json({ error: 'Server error' })
    }
}

module.exports = { shortenUrl, redirectUrl }

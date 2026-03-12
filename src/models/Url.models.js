const mongoose = require('mongoose')


const UrlSchema = new mongoose.Schema({
    originUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('URL', UrlSchema)
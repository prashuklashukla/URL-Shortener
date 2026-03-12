const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connect')
    } catch (error) {
        console.log(error)
        console.log('DB error')
        process.exit(1)
    }
}

module.exports = connectDB
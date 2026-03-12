require('dotenv').config()


const server = require('./app')
const connectDB = require('./src/config/db')

connectDB();


const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`app runing on ${PORT}`)
})
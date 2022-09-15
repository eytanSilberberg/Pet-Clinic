const express = require('express')
const next = require('next')
// const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const asyncLocalStorage = require('./services/als.service')
const app = next()
const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3030', 'https://pet-clinic-proj.herokuapp.com'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const petRoutes = require('./api/pet/pet.routes')


// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)
app.use('/api/pet', petRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname + 'public' + 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const router = express.Router()

const { getPets, getPetById, addPet, updatePet, removePet } = require('./pet/pet.controller')
const { getById } = require('./pet/pet.service')


const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
// when using middleware `hostname` and `port` must be provided below
const port = process.env.port || 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const { method } = req
            console.log(method);
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            // router.get('/', getPets)
            // router.get('/:id', getPetById)
            // router.post('/', addPet)
            // router.delete('/:id', removePet)
            // router.put('/:id', updatePet)

            console.log(pathname)
            switch (method) {
                case 'GET':
                    router.get('/:id', getPetById)
                    router.get('/', getPets)
                    break
                case 'DELETE':
                    router.delete('/:id', removePet)
                    break
                case 'POST':
                    router.post('/', addPet)
                    break
                case 'PUT':
                    router.put('/:id', updatePet)
                    break
                default:
                    break

            }
            module.exports = router

        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${hostname}:${port}`)
    })
})
const handlers = require('./lib/handlers')

const express = require('express')
const app = express()

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 }
]

// app.get('/api/tours', (req, res) => res.json(tours))

app.get('/api/tours', (req, res) => {
    const toursXml = '<?xml version="1.0"?><tours>' +
        tours.map(p => `<tour price="${p.price}" id="${p.id}">`).join('')
        + '</tours>'

    const toursText = tours.map(p =>
        `${p.id}: ${p.name} (${p.price})`)
        .join('\n')

    res.format({
        'application/json': () => res.json(tours),
        'application/xml': () => res.type('application/xml').send(toursXml),
        'text/xml': () => res.type('text/xml').send(toursXml),
        'text/plain': () => res.type('text/plain').send(toursXml)
    })
})

app.put('/api/tours/:id', (req, res) => {
    const p = tours.find(p => p.id === parseInt(req.params.id))

    if (!p) return res.status(404).json({ error: 'No such tour exists' })
    if (req.body.name) p.name = req.body.name
    if (req.body.price) p.price = req.body.price

    res.json({ success: true })
})

app.listen(port, () => {
    console.log(`Express started on port number : ${port}`)
})
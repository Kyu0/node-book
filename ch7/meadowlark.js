const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const app = express()

// Handlebars 뷰 엔진 설정
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

// 404 Page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// 500 Page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://lcalhost:${port}\n` +
    `press Ctrl-C to terminate...`)
)
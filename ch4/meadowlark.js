const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a peasant surprise.",
    "Whenever possible, keep it simple."
]

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
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
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
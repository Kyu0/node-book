const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')
const credentials = require('./.credentials.development')

const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const app = express()

// Handlebars 뷰 엔진 설정
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)
app.use(bodyParser.json())
app.use(cookieParser(credentials.cookieSecret))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/section-test', handlers.sectionTest)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.messge })
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})

app.use(handlers.notFound)

app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.' )
    })
}
else {
    module.exports = app
}
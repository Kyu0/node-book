const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) => res.render('about', { fortune: fortune.getFortune() })

exports.sectionTest = (req, res) => res.render('section-test')

exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api = {
    newsletterSignup: (req, res) => {
        console.log(`CSRF token (from hidden form field): ${req.body._csrf}`)
        console.log(`Name (from visible form field): ${req.body.name}`)
        console.log(`Email (from visible form field): ${req.body.email}`)
        res.send({ result: 'success' })
    }
}

exports.notFound = (req, res) => res.render('404')

/*
express는 매개변수가 4 개가 있어야 오류 핸들러로 인식하므로
next 매개변수는 사용하지 않더라도 없애지 않는다.
따라서 이 행에 no-unused-vars 규칙을 비활성화한다.
*/
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */
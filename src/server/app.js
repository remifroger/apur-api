const path = require('path')
const fs = require('fs')
const envLocation = JSON.parse(fs.readFileSync(path.join('./') + '/deployment-env.json', { encoding: "UTF-8" }))

if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: envLocation['prod'] })
}
else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: envLocation['pre-prod'] })
}
else {
    if (fs.existsSync(path.join(__dirname, envLocation['local']))) {
        require('dotenv').config({ path: path.join(__dirname, envLocation['local']) })
    } else if (fs.existsSync(path.join(__dirname, envLocation['local'] + '.sample'))) {
        require('dotenv').config({ path: path.join(__dirname, envLocation['local'] + '.sample') })
    }
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')
const { pool } = require('./db/connect.js')
const { handleError, ErrorHandler } = require('./helpers/error')
const apiRoutes = require('./routes/api/apiRoutes.js')

const initializePassport = require("./helpers/passport")
initializePassport(passport)

require('./helpers/passport')(passport, pool)

const PORT = process.env.PORT

app.use('/dist', express.static(path.join(__dirname, '../../dist')))
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/api', apiRoutes)

app.get('*', (req, res) => {
    throw new ErrorHandler(404, 'Cette page n\'existe pas')
})

app.use((err, req, res, next) => {
    handleError(req, err, res)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = app
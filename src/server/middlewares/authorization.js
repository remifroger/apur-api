const jwt = require('jsonwebtoken')
const { errorMessage, status, successMessage } = require('../helpers/status')

module.exports = {
    checkAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/home')
    },
    checkNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.session.returnTo = req.originalUrl
        res.redirect("/login")
    },
    checkApiToken: (req, res, next) => {
        if (req.isAuthenticated() && req.query.token) {
            const decoded = jwt.verify(req.query.token.replace(' ', ''), `${process.env.SESSION}`, (err, decoded) => {
                return decoded
            })
            if (decoded) next()
            else {
                errorMessage.error = 'Token invalide'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else if (!req.isAuthenticated() && req.query.token) {
            const decoded = jwt.verify(req.query.token.replace(' ', ''), `${process.env.SESSION}`, (err, decoded) => {
                return decoded
            })
            if (decoded) next()
            else {
                errorMessage.error = 'Token invalide ou expiré, veuillez rafraîchir la page'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else if (req.isAuthenticated() && !req.query.token) {
            errorMessage.error = 'Token manquant'
            return res.status(status.error).send({ "text": errorMessage })
        } else {
            errorMessage.error = 'Accès non autorisé'
            return res.status(status.error).send({ "text": errorMessage })
        }
    }
}
const { errorMessage, status, successMessage } = require('../helpers/status')
const { getData } = require('../services/dbServices')
const { getPool } = require('../db/connect.js')

const availableThemes = ['demographie', 'habitat']
const availableIndicateurs = ['pop_leg', 'pop_age']
const availableEchelle = ['com']

const dataQueryController = {
    getAll: async (req, res) => {
        const pool = getPool(req.user ? req.user.pseudo : null)
        const { theme, indicateur } = req.params
        const params = req.query
        if (theme && indicateur) {
            if (!availableThemes.includes(theme)) {
                errorMessage.error = `Erreur dans le chemin, ${theme} n'existe pas (valeurs possibles : ${availableThemes.toString()})`
                return res.status(status.error).send({ "text": errorMessage })
            }
            else if (!availableIndicateurs.includes(indicateur)) {
                errorMessage.error = `Erreur dans le chemin, ${indicateur} n'existe pas (valeurs possibles : ${availableIndicateurs.toString()})`
                return res.status(status.error).send({ "text": errorMessage })
            } else {
                if (!params.echelle && !params.territoire) {
                    errorMessage.error = `Les paramètres sont incorrects : echelle (${availableEchelle}) et territoire (codes Insee en lien avec l'échelle) sont obligatoires`
                    return res.status(status.error).send({ "text": errorMessage })
                } else {
                    if (!availableEchelle.includes(params.echelle)) {
                        errorMessage.error = `L'échelle ${params.echelle} n'existe pas (valeurs possibles : ${availableEchelle.toString()})`
                        return res.status(status.error).send({ "text": errorMessage })
                    } else {
                        try {
                            const resultQuery = await getData(pool, theme, indicateur, params)
                            successMessage.data = resultQuery
                            return res.status(status.success).send(successMessage)
                        } catch (error) {
                            errorMessage.error = error.toString()
                            return res.status(status.error).send({ "text": errorMessage })
                        }
                    }
                }
        }
        } else {
            errorMessage.error = 'Appel de l\'API : /api/data/{theme}/{indicateur}?echelle={echelle}&territoire={territoire}'
            return res.status(status.error).send({ "text": errorMessage })
        }
    }
}

module.exports = dataQueryController
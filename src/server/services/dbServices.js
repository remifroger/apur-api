const path = require('path')
const fs = require('fs')

const getData = async (pool, theme, indicateur, params) => {
    const pEchelle = params.echelle
    const pTerritoire = params.territoire
    const pAnnee = params.annee
    let query
    try {
        if (theme === 'demographie') {
            if (indicateur === 'pop_leg') {
                if (pAnnee) {
                    query = await pool.query("SELECT * FROM froger.v_demo_pop_leg WHERE echelle = $1 AND code_geo = $2 AND annee = $3", [pEchelle, pTerritoire, pAnnee])
                } else {
                    query = await pool.query("SELECT * FROM froger.v_demo_pop_leg WHERE echelle = $1 AND code_geo = $2", [pEchelle, pTerritoire])
                }
            } else if (indicateur === 'pop_age') {
                if (pAnnee) {
                    query = await pool.query("SELECT * FROM froger.v_demo_pop_age WHERE echelle = $1 AND code_geo = $2 AND annee = $3", [pEchelle, pTerritoire, pAnnee])
                } else {
                    query = await pool.query("SELECT * FROM froger.v_demo_pop_age WHERE echelle = $1 AND code_geo = $2", [pEchelle, pTerritoire])
                }
            }
        }
        if (query) {
            return query.rows
        } else {
            throw new Error("Données inaccessibles")
        }
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getData,
}
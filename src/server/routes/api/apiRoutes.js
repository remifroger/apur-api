const express = require('express')
const router = express.Router()
const dataQueryController = require('../../controllers/dataQuery')

router.get("/data/:theme/:indicateur", dataQueryController.getAll)

module.exports = router
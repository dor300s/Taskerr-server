const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToy, deleteToy, createToy, editToy } = require('./toy.controller')
const router = express.Router()



router.get('/', getToys)
router.get('/:id', getToy)
router.post('/', createToy)
router.put('/:id', editToy)
router.delete('/:id', deleteToy)

module.exports = router
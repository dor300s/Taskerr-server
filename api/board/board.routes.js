const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoards, getBoard, deleteBoard, createBoard, editBoard } = require('./board.controller')
const router = express.Router()



router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/', createBoard)
router.put('/:id', editBoard)
router.delete('/:id', deleteBoard)

module.exports = router
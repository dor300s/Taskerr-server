const logger = require('../../services/logger.service')
const boardService = require('./board.service')
// const connectSockets = require('../socket/socket.routes')


async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.session)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })
    }
}

async function getBoard(req, res) {
    try {
        const board = await boardService.get(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Cannot get board', err);
        res.status(500).send({ error: 'cannot get board' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err);
        res.status(500).send({ error: 'cannot delete board' })
    }
}

async function createBoard(req, res) {
    console.log('ssssssssssssssssss', req.session);
    
    try {
        const board = await boardService.save(req.body, req.session.user)
        res.send(board)
    } catch (err) {
        logger.error('Cannot save board', err);
        res.status(500).send({ error: 'cannot save board' })
    }
}

async function editBoard(req, res) {

    try {
        const board = await boardService.save(req.body)
        // connectSockets.emit('board updated', board._id);
        console.log('controller got:', board);
        res.send(board)
    } catch (err) {
        logger.error('Cannot save board', err);
        res.status(500).send({ error: 'cannot save board' })
    }
}


module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    createBoard,
    editBoard
}
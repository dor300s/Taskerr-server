const logger = require('../../services/logger.service')
const toyService = require('./toy.service')


async function getToys(req, res) {
    const criteria = req.query
    try {
        const toys = await toyService.query(criteria)
        res.send(toys)
    } catch (err) {
        logger.error('Cannot get toy', err);
        res.status(500).send({ error: 'cannot get toy' })
    }
}

async function getToy(req, res) {
    try {
        const toy = await toyService.get(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Cannot get toy', err);
        res.status(500).send({ error: 'cannot get toy' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete toy', err);
        res.status(500).send({ error: 'cannot delete toy' })
    }
}

async function createToy(req, res) {
    console.log('toy', req.body);

    try {
        const toy = await toyService.save(req.body)
        res.send(toy)
    } catch (err) {
        logger.error('Cannot save toy', err);
        res.status(500).send({ error: 'cannot save toy' })
    }
}

async function editToy(req, res) {
    try {
        const toy = await toyService.save(req.body)
        res.send(toy)
    } catch (err) {
        logger.error('Cannot save toy', err);
        res.status(500).send({ error: 'cannot save toy' })
    }
}


module.exports = {
    getToys,
    getToy,
    deleteToy,
    createToy,
    editToy
}
const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {


    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    try {
        await userService.update(user)
        req.session.user = user
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}
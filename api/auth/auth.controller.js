const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send(err)
    }
}

async function signup(req, res) {
    
    try {
        const { password, fullName , email , username } = req.body
        logger.debug(fullName + ', ' + password + ', ' + email, ', ' + username)
        const account = await authService.signup(password, fullName , email , username )
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send(err)
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    login,
    signup,
    logout
}
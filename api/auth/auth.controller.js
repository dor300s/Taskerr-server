const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function getSession(req, res) {
    // console.log('getting session.........');

    try {
        
        res.send(req.session.user)

    } catch (err) {
        res.status(500).send(err)
    }

}

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
        const { password, fullName, username } = req.body
        logger.debug(fullName + ', ' + password + ', ' + username)
        const account = await authService.signup(password, fullName, username)
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
    // let loogedUser = req.session.user
    try {
        req.session.destroy()
        res.send({ message: 'success' })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    login,
    signup,
    logout,
    getSession
}
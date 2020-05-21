const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    if (!username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password;
    return user;
}

async function signup(password, fullName , email , username) {
    
    logger.debug(`username: ${username}`)
    if (!password || !username) return Promise.reject('All fields are required')
    const user = await userService.getByUsername(username)
    if (user) return Promise.reject('This username already exists!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ password: hash, fullName , email , username })
}

module.exports = {
    signup,
    login,
}
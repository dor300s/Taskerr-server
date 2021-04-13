const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

let userTemplate = {
    "isLogIn": false,
    "imgUrl": "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
    "isGuest": false,
    "phone": undefined,
    "address": undefined,
    "about": undefined,
    "lastSign": null,
    "gender": undefined,
    "company": undefined,
    "notifications": []
}

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

async function signup(password, fullName, userName) {

    logger.debug(`username: ${userName}`)
    if (!password || !userName) return Promise.reject('All fields are required')
    const user = await userService.getByUsername(userName)
    if (user) return Promise.reject('This username already exists!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ ...userTemplate, createdAt: Date.now(), password: hash, fullName, userName })
}

module.exports = {
    signup,
    login,
}
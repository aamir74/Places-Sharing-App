const { JsonWebTokenError } = require('jsonwebtoken')
const HttpError = require('../models/http-error')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]   // received as- Authoriation: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication Failed!')
        }
        const decodedToken = jwt.verify(token, 'supersecret-dont-share')
        req.userData = { userId: decodedToken.userId }
        next()
    } catch (err) {
        const error = new HttpError('Authentication Failed', 403)
        return next(error)
    }
}

const UnauthenticatedException = require('../exceptions/unauthenticated-exception')
const appConfig = require('../../config/app')
const UserRepository = require('../repositories/user-repository')
const jwt = require('jsonwebtoken')

exports.auth = async(req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token)
        return next(new UnauthenticatedException())
    
    await jwt.verify(token, appConfig.appKey, async (err, user) => {
        if (err)
            return next(new UnauthenticatedException())
        
        try {
            req.user = await UserRepository.findById(user.id)
            next()
        } catch (e) {
            return res.status(e.status || 401).send({ message: "User not found!"})
        }
    })
}
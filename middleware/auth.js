import jwt from 'jsonwebtoken'
import asynHandler from '../middleware/async.js'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/User.js'

// Protect routes
const protect = asynHandler( async (req, res, next) => {
    let token

    // Set token from Bearer token in header   (Bearer)
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1]
    // } 
    // // Set token from cookie
    // else {
    //     if(req.cookies.token) {
    //         token = req.cookies.token
    //     }
    // }

    if(req.cookies.token) {
        token = req.cookies.token
    }

    // token = req.cookies.token

// Make sure token exists
if(!token) {
    
    return next(new ErrorResponse('Not authorized to access this route', 401))
}
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)

        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role <${req.user.role}> not authorize to access this route`, 403))
        }
        next()
    }
    
}

export {
    protect,
    authorize
} 
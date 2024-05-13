const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Admin = require('../model/adminModeal')

const authProtect = asyncHandler(async (req, res, next) => {
    // let token

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    //     try {
    //         token = req.headers.authorization.split(' ')[1]
    //         const decode = jwt.verify(token, process.env.JWT_SECRET)
    //         req.user = await User.findById(decode.id).select('-password')
    //         next()
    //     }
    //     catch (error) {
    //         res.status(401)
    //         throw new Error('Not authorized')
    //     }
    // }
    // if (!token) {
    //     res.status(401)
    //     throw new Error('Not Authorized no token')
    // }
    const token = req.cookies.userToken
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
    
        // Handle potential null password securely (avoid returning password)
        const sanitizedUser = {...user._doc} ; // Create a copy to avoid mutation
        delete sanitizedUser.password; // Remove password field
    
        req.user = user.password === null ? user : sanitizedUser;
        
        next()

    } catch (error) {
        res.status(401).cookie('userToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
    if (!token) {
        res.status(401).cookie('userToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
})
const authProtectAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies.adminToken
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findById(decoded.id);
    
        // Handle potential null password securely (avoid returning password)
        const sanitizedUser = {...user._doc} ; // Create a copy to avoid mutation
        delete sanitizedUser.password; // Remove password field
    
        req.user = user.password === null ? user : sanitizedUser;
        
        next()

    } catch (error) {
        res.status(401).cookie('adminToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
    if (!token) {
        res.status(401).cookie('adminToken', '', { expires: new Date('2024-01-01') });
        throw new Error('Not Authorized no token')
    }
})

module.exports = {
    authProtect,
    authProtectAdmin
}
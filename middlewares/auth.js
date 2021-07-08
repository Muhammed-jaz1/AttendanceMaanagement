const jwt = require('jsonwebtoken')
const db = require("../models")

module.exports.checkToken = async (req, res, next) => {
    const token = req.header('auth-token');
    // const bearer = header.split(' ');
    // const token = bearer[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "no token provided"
        })
    }
    try {
        console.log("juju");
        const decoded = jwt.verify(token, 'secret')
        const user = await db.user.findOne({ where: { email: decoded.email }, raw: true })
        if (!user) {
            
            return res.status(401).json({
                success: false,
                message: "no user found"
            })
        }if(!user.isActive){
            res.status(401).json({
                success:false,
                message:"your account is blocked"
            })
        }
        req.user = user
        return next()
    }
    catch (error) {
        console.log(error);
        return res.status(201).json({
            success: false,
            message: "invalid token"
        })
    }
}

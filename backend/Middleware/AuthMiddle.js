const jwt = require('jsonwebtoken')
require('dotenv').config()


const Auth = ((req,res,next) =>{
    const token = req.headers.authorization
    console.log("my token :",token)
    if(!token){
        console.log("no token")
        return res.status(401).json({message:"Access deined"})
    }
    try{
        const verified = jwt.verify(token.split(" ")[1],process.env.JWT_KEY)
        console.log("token verifyed", verified)
        req.user = verified
        next()
    }
    catch(e){
        res.status(400).json({message:"worng token"})
    }
})

module.exports = Auth
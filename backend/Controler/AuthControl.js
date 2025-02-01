const LoginTable = require('../Models/UserLogin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CreateTable = async(req,res) => {
    const {Name, Email, Password} = req.body
    try{
        let user = await LoginTable.findOne({Email})
        if(user)
        {
            return res.status(400).json({message:"User already exists...!"})
        }
    const hashed = await bcrypt.hash(Password, 10)
    user = new LoginTable({Name, Email, Password:hashed})
    await user.save()
    res.status(201).json({message:"User Registered."})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
};

const Login = async(req,res) =>{
    const {Email, Password} = req.body
    try{
        const user =  await LoginTable.findOne({Email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(Password, user.Password )
        if(!isMatch){return res.status(400).json({message:"Worng Password.Check it."})}

        const token = jwt.sign({id:user._id},process.env.JWT_KEY, {expiresIn:'1h'})
        res.json({token, user:{id:user._id, name:user.Name, email:user.Email}})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const GetPerson = async(req,res)=>{
    const {id} = req.user
    try{
        const user = await LoginTable.findById(id).select('-password')
        res.json(user)
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
} 

module.exports = {CreateTable, Login, GetPerson};
const mongoose = require('mongoose')

const Table = mongoose.Schema

const LoginTable = new Table({
    Name:{type:String, require:true},
    Email:{type:String, require:true},
    Password:{type:String, require:true}
})

module.exports= mongoose.model("LoginTable", LoginTable)

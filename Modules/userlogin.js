const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
const login = mongoose.model('userregister',dataSchema);
module.exports = login;

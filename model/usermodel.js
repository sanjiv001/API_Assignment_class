const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    phone:{
        type : String,
      
        
    },

    email: {
        type : String,
        
        
       
    },
    age : {
        type : Number
    },
    date : {
        type : Date
    },
    gender : {
        type: String
        
    },
    address : {
        type: String
    },
    password: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model(" User",user);
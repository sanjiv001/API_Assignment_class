const mongoose = require("mongoose");


const customer = new mongoose.Schema({
    firstname: {
        type: String
        
    },
    lastname :{
        type : String
    
    },
    phone:{
        type : String
        
    },
    email: {
        type : String,
        required: true
       
    },
    age : {
        type : String
    },
    date : {
        type : Date
    },
    gender : {
        type: String
        
    },
    password: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model(" Customer",customer);
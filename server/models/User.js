
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
   
    
    firstname: {
        type: String,
        Required:true
    },
   
    lastname: {
        type: String,
        Required:true
    },
    
    email: {
        type: String,
    },
    uid:{
        type:String
    },
   
    mobile_number: {
        type: Number,
        Required:true
    },
    password: {
        type: String,
        required: true
      },
    

    role_name: {
        type: String,
        Required:true
    },
    dob:{
       type:Date,
    Required:true
     },
    created_at:
     {
         type: Date, 
        default: Date.now
    },
    // created_time:{
    //     type,
    //     Required:true
    // }
});

module.exports = mongoose.model('User', Users);
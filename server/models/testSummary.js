const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema
 
let testSummarySchema = new Schema({
    TestName: {
        type:String,
        Required: true
      },
 
      
    TestId:{
        type: ObjectId,
        ref:"test",
        Required:true 
    },
    
 
    percent_scored:{
        type:Number
    },

    Result:{
        type:String,
        Required:true
    },
    
    UserEmail: {
        type: String,
        Required:true   
    },
 
    // TestDate:{
    //     type:Date
    // },
 
    time_taken:{
        type:Number
    },
    
},
{timestamps:true} );
 
module.exports = mongoose.model('testSummary', testSummarySchema)

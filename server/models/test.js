const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
let TestSchema = new Schema({
  TestName: {
    type: String
    
  },
  Question_List: {
    type: Array
  
  },
  PassPercent:{
    type:Number
    
  },
  
  IsCertifiable: {
    type: String
    
  },
  PageConfig: {
    type: Number
  
  },
  ValidityDate:{
    type:Date
    
  },
  Duration:{
    type:Number
  
  },
  Active:{
    type:Boolean
  
  },

  created_by:{
    type: ObjectId,
    ref: "User",
    Required:true,
},
 
},
{timestamps:true} );
 
module.exports = mongoose.model('test', TestSchema)

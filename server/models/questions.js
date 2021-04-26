const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
 
 
let Question = new Schema({
    
    question_description: {
        type: String,
        Required:true
    },
   
    answer_type: {
        type: String,
        Required:true
    },
    
    difficulty_level:{
        type: String,
        Required:true
    },
 
    category_id_array:{
        type:Array,
        Required:true,
    },
    answers:{
        type:Array,
        Required:true,
    },
    correct_answers:{
        type:Array,
        Required:true,
    },
    created_by:{
        type: ObjectId,
        ref: "User",
        Required:true,
    },
},
{timestamps:true},
);
 
module.exports = mongoose.model('Question', Question);

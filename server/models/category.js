const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
 
 
let Category = new Schema({
 
    category_name: {
        type: String,
        Required:true
    },
 
    parent_category_id:{
        type: ObjectId,
        ref: "Category",
        Required:true,
    }
 
 
});
 
module.exports = mongoose.model('Category', Category);

let Category = require("../models/category")
 
exports.createCategory = (req,res) => {
 
    if(req.body.parent_category==="main"){
 
        let newCategory = new Category({
            category_name:req.body.category_name,
            parent_category_id:null
        });
        newCategory.save()
        .then(newCategory => {
            res.status(200).send(newCategory);
        })
        .catch(err => {
            res.status(400).send('Failed to add');
        });
    }
 
    else{
        Category.findOne({"category_name":req.body.parent_category},function(err,category){
            if(category){
                let category_id = category._id
                //console.log(category_id)
 
                let newCategory = new Category({
                    category_name:req.body.category_name,
                    parent_category_id:category_id
                });
                newCategory.save()
                .then(newCategory => {
                res.status(200).send(newCategory);
                })
            
                .catch(err => {
                    res.status(400).send('Failed to add category');
                });
    
            }   
            });
    }
}
 
 
exports.getMainCategories = (req,res) =>{
   
    Category.find({parent_category_id:null},function(err,data){
        if(data){
            //console.log(data)
            res.send(data)
        }
        else{
            console.log(err)
            res.status(400).send('No main categories found');
        }
    })
}
exports.getAllSubCategories = (req,res) =>{
   
    Category.find({parent_category_id:{$ne: null}},function(err,data){
        if(data){
            //console.log(data)
            res.send(data)
        }
        else{
            console.log(err)
            res.status(400).send('No main categories found');
        }
    })
}
 
exports.getSubCategories = (req,res) =>{
    
    var parentCategoryID = req.params.parentID
    Category.find({parent_category_id:parentCategoryID},function(err,data){
        if(data){
            console.log(data)
            res.send(data)
        }
        else{
            console.log(err)
            res.status(400).send('No sub categories found');
        }
    })
 
}
 
 
exports.getCategoryIdByName = (req,res) =>{
 
    var categoryName = req.params.categoryName
    Category.find({category_name:categoryName},function(err,data){
        if(data){
            //console.log(data)
            res.send(data[0]._id)
        }
        else{
            console.log(err)
            res.status(400).send('No category with the given name');
        }
    })
 
}
 
 
 
// module.exports = createCategory;
// module.exports = getMainCategories;
// module.exports = getSubCategories;

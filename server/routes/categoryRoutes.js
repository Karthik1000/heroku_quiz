var express = require('express');
var router =  express.Router()
const cors = require("cors")
// const createCategory = require("../controllers/categoryControllers");
// const getMainCategories = require("../controllers/categoryControllers")
// const getSubCategories = require("../controllers/categoryControllers")
 
const {createCategory,getMainCategories,getSubCategories,getCategoryIdByName, getAllSubCategories} = require("../controllers/categoryControllers")
 
 
router.post("/add-category",createCategory);
router.get("/get-main-categories",getMainCategories);
router.get("/get-all-sub-categories",getAllSubCategories);
router.get("/get-sub-categories/:parentID",getSubCategories);
router.get("/get-category-id/:categoryName",getCategoryIdByName);
 
module.exports = router;
 

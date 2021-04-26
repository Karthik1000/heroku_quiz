var express = require('express');
var router =  express.Router()
const cors = require("cors")
const {createQuestion,getQuestionsInACategory,getQuestionsById} = require("../controllers/questionControllers");
 
router.post("/create-question",createQuestion);
router.get("/questions-filtered-by-category/:main_category_name/:sub_category_name",getQuestionsInACategory);
router.get("/get-question/:questionId",getQuestionsById);

module.exports = router;

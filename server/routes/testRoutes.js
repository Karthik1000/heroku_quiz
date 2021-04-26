var express = require('express');
var router =  express.Router()
const cors = require("cors")
const {createTest,getTests,getTestById,editTest,updateTest,deleteTest,removeQuestion} = require("../controllers/testControllers")
 
 
router.post("/new_test",createTest)
router.get('/get-tests',getTests)
router.get('/get-test/:id',getTestById)
router.put('/update-test/:id',editTest)
router.post('/add-test-question/:testid/:ques_list',updateTest)
router.post('/remove-question-from-test/:testid/:questionid',removeQuestion)


router.delete('/delete-test/:id',deleteTest)
 
module.exports = router;

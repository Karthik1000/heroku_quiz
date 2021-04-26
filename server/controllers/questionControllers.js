let Question = require("../models/questions")
const axios = require('axios');
const {getCategoryIdByName} = require("./categoryControllers")
// let mainCategory = require("../models/mainCategory")
// let subCategory = require("../models/subCategory")
// let QuestionInCategory = require("../models/questionsInACategory")
// let answers = require("../models/answers")
// let correctAnswers = require("../models/correctAnswers")
 
 
 
exports.createQuestion =  (req,res) =>{
    let categoryname = req.body.category
    let categoryList = (req.body.sub_categories)
    categoryList.push(categoryname)
    // const categoryIDs = []
 
    
    // subcatlist.forEach(element => {
    //     console.log(element)
    //     axios.get(`http://localhost:4000/api/get-category-id/${element}`)
    //     .then(data=>{
            
    //         categoryIDs.push(data.data)
    //         console.log(categoryIDs)
                    
    //             })
    //             .catch(error=>{
    //                 console.log(error)
    //             })
    //     });
    //     if(categoryIDs){
    //     console.log("final  ",categoryIDs);
    //     }
        let new_question = new Question({
            question_description: req.body.question,
            answer_type:req.body.answer_type,
            difficulty_level:req.body.difficulty,
            created_by:req.body.created_by,
            answers:req.body.answers,
            correct_answers:req.body.correct_answers,
            category_id_array:categoryList
        });
 
        new_question.save()
            .then(new_question => {
                let questionID =new_question._id
                res.status(200).json({'new_question': 'question added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to add new question');
            });
}
 
 
exports.getQuestionsInACategory = (req,res) =>{
    //console.log("INTO THE FUNC")
    let main_category_name = req.params.main_category_name
    let sub_category_name = req.params.sub_category_name
    let categoryname = ""
    if(sub_category_name=="Include-All"){
        categoryname = main_category_name
    }
    else{
        categoryname = sub_category_name
    }
 
    Question.find({category_id_array:categoryname},function(err,data){
        if(data){
            res.send(data);
            res.status(200)
            

            
        }
        else{
            res.status(400).send('No questions found');
        }
    })
}
exports.getQuestionsById = (req,res) => {
    let question_id = req.params.questionId
    Question.find({_id:question_id},function(err,data){
        if(data){
            res.send(data)
            res.status(200);
        }
        else{
            res.status(400).send('No questions with the given id');
         }
    })
}


 
 
 
 //---------------------------------------------------Don't Touch--------------------------------------------
// const createQuestion = (req,res)=>{
 
//     let new_question = new Question({
//         question_description: req.body.question,
//         answer_type:req.body.answer_type,
//         difficulty_level:req.body.difficulty_level,
//         created_by:req.body.created_by
//     });
    
//     new_question.save()
//         .then(new_question => {
//             let questionID =new_question._id
//             res.status(200).json({'new_question': 'question added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Failed to add new question');
//         });
 
//     mainCategory.findOne({"category_name":req.body.category},function(err,maincategory){
//         if(!maincategory){
//             let newMainCategory = new mainCategory({
//                 category_name:req.body.category
//             });
//             newMainCategory.save()
//             .then(newMainCategory => {
//             res.status(200).json({'newMainCategory': 'main Category added successfully'});
//             })
        
//             .catch(err => {
//                 res.status(400).send('Failed to add main category');
//             });
 
//         }   
//         });
 
//     let questionInACategory = new QuestionInCategory({
//         main_category_name:req.body.category,
//         question_id:new_question._id
//     });
//         questionInACategory.save()
//         .then(questionInACategory => {
//             res.status(200).json({'questionInACategory': 'added question to the category'});
//         })
//         .catch(err => {
//         res.status(400).send('Failed to link the question to the category');
//     });
    
 
 
//     let newSubCategory = new subCategory({
//             sub_category_name:req.body.sub_categories,
//             main_category_name:req.body.category,
//             question_id:new_question._id
//         });
//         newSubCategory.save()
//         .then(newSubCategory => {
//             res.status(200).json({'newSubCategory': 'added successfully'});
//         })
//             .catch(err => {
//             res.status(400).send('Failed to add sub category');
//         });
//     let Answers = new answers({
//         question_id:new_question._id,
//         answer_list:req.body.answers
//     })
//     Answers.save()
//         .then(Answers => {
//             res.status(200).json({'Answers': 'added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Failed to add sub category');
//         });
//     let CorrectAnswers = new correctAnswers({
//         question_id:new_question._id,
//         correct_answer_list:req.body.correct_answers
//     })
//     CorrectAnswers.save()
//         .then(CorrectAnswers => {
//             res.status(200).json({'CorrectAnswers': 'added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('Failed to add sub category');
//         });
// };
// module.exports = createQuestion;

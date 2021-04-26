let TestSchema = require('../models/test');
 
 
exports.createTest = (req, res) => {
    let test = new TestSchema({
        TestName : req.body.testname,
        Question_List: req.body.questionlist,
        PassPercent: req.body.passpercent,
        IsCertifiable:req.body.IsCertifiable,
        ValidityDate: req.body.ValidityDate,
        PageConfig:req.body.PageConfig,
        Duration:req.body.Duration,
        Active: req.body.Active,
    });
    test.save()
    .then((data)=>{
        console.log('Test saved')
        res.status(200).send(data)
    })
    .catch(()=>{
        res.status(400).send("Failed to add test")
        // console.log('not saved')
    })
    
  }
 
 
exports.getTests = (req, res) => {
    TestSchema.find((error, data) => {
      if (error) {
        return error
      } else {
        res.json(data)
      }
    })
  }
 
  
exports.getTestById = (req, res) => {
    TestSchema.findById(req.params.id, (error, data) => {
      
      if (error) {
        
        return error
      } else {
        res.json(data)
      }
    })
  }
 
exports.editTest = (req, res) => {
    TestSchema.findByIdAndUpdate({_id:req.params.id}, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return error;
        
      } else {
        res.json(data)
        console.log('Test updated successfully !')
      }
    })
  }
  exports.updateTest = (req, res) => {
    //console.log('update test add questions')
    let testid = req.params.testid;
    // console.log(tesname)
    let ques_list = (req.params.ques_list).split(',');
    console.log(ques_list)
    TestSchema.findOneAndUpdate({_id:testid}, {
      Question_List:ques_list
    }, (error, data) => {
      if (error) {
        return error;

      } else {
        //res.json(data)
        console.log('Test question list updated successfully !')
      }
    })
    TestSchema.findOneAndUpdate({_id:testid}, {
      Active: true
    }, (error, data) => {
      if (error) {
        return error;
        
      } else {
        res.json(data)
        console.log('Test active status updated successfully !')
      }
    })


  }

  
exports.deleteTest = (req,res) => {
    TestSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return error;
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  }



exports.removeQuestion = (req,res) =>{


    TestSchema.findOne({_id:req.params.testid},function(err,data){
      if(data){
        let question_id_array = data.Question_List
        let l1 = question_id_array.length
        question_id_array = question_id_array.filter(function(val,index,arr){
          return val!=req.params.questionid
        })
        let l2 = question_id_array.length
        if(l1==l2){
          res.send("No entry found with given id")
        }
        else{
        TestSchema.findOneAndUpdate({_id:req.params.testid},{Question_List:question_id_array},
          (err,data)=>{
              if(err){
                console.log(err)
                res.status(404).send("already deleted")
              }
              else{
                console.log('deleted successfully')
                res.status(200).send('Updated Successfully');
              }
          }
          )
        }
      }
      else{
        console.log(err)
      }
    })

}
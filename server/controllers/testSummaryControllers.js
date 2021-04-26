let testsummary = require("../models/testSummary")


exports.createTestSummary = (req, res) => {
    console.log("INTO THE CONTROLLER111")
    console.log(req.body.u_email)
    let summary = new testsummary({
        TestName : req.body.tname,
        TestId: req.body.tid,
        percent_scored: req.body.percent_scored,
        Result:req.body.result,
        UserEmail: req.body.u_email,
        time_taken:req.body.testtime,
    });
    console.log(summary)
    summary.save()
    .then((data)=>{
        console.log('Test saved')
        //res.status(200).json({'new_summary': 'Test Summary created successfully'});
        res.status(200);
        res.send(data);
    })
    .catch(()=>{
        // res.status
        res.status(400).send("Failed to save summary")
        // console.log('not saved')
    })
    
  }


exports.getSummaryofAllTests = (req,res)=>{
    testsummary.find({UserEmail:req.params.u_email},function(err,data){
        if(data){
            res.send(data)
            res.status(200)
        }
        else{
            res.status(400).send('No data');
        }
    })
}
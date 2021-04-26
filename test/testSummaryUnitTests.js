
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert=chai.assert;
chai.use(chaiHttp);

let test_summary_id;
let u_email="testingdeveloper@email.com"

describe("Test Summary", () => {
  
  it("Creating Test Summary", done => {
    chai
      .request('http://localhost:4000/api')
      .post("/save-summary")
      .send({ tname : "Unit Testing 1",
        tid: "6040be01faa8e699fcd696c9",
        percent_scored: 80,
        result:"Pass",
        u_email: "testingdeveloper@email.com",
        testtime:5,
    })
      .end((err, res) => {
        test_summary_id=res.body._id;
        console.log(res.body);
        assert.equal(res.status,"200");
        done();
      });
  });


  it("Get Test Summaries using Email Id",done=>{
    chai.request('http://localhost:4000/api')

      .get(`/get-test-summary/${u_email}`)
      .end((err,res)=>{
          assert.equal(res.status,"200");
          assert.equal(res.body[0].UserEmail,u_email);
          done();
      });


})





  


  


});
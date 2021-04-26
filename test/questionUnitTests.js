
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert=chai.assert;
chai.use(chaiHttp);

let test_question_id;


describe("Question", () => {
  
  it("Creating Question", done => {
    chai
      .request('http://localhost:4000/api')
      .post("/create-question")
      .send({ category:"Testing Category",
        sub_categories:["Testing Sub Category"],
        question:"TESTING QUESTION I",
        created_by:"6040be01faa8e699fcd696b6",
        answers:["Test Option 1","Test Option 2","Test Option 3"],
         correct_answers:["Test OPtion 1"],
         difficulty:"easy",
         answer_type:"Multiple Choice Questions"
        })
      .end((err, res) => {
        assert.equal(res.status,"200");
        assert.equal(res.body.new_question,"question added successfully")
        done();
      });
  });

  it("Get QUestions In a Category",done=>{
      main_category_name="Testing Category";
      sub_category_name="Testing Sub Category";
        chai.request('http://localhost:4000/api')

        .get(`/questions-filtered-by-category/${main_category_name}/${sub_category_name}`)
        .end((err,res)=>{
            //console.log(res.body)
            test_question_id=res.body[0]._id;
            assert.equal(res.status,"200");
            assert.equal(res.body[0].question_description,"TESTING QUESTION I"),
            assert.equal(res.body[0].category_id_array[1],"Testing Category")
            assert.equal(res.body[0].category_id_array[0],"Testing Sub Category")
            done();
        });


  })



  it("Get Questions using Question ID",done=>{
    chai.request('http://localhost:4000/api')

      .get(`/get-question/${test_question_id}`)
      .end((err,res)=>{
          assert.equal(res.status,"200");
          assert.equal(res.body[0]._id,test_question_id);
          done();
      });


})




});
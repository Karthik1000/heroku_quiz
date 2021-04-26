let chai = require('chai');
let chaiHttp = require('chai-http');

//let server = require('../server/index');

chai.should();
chai.use(chaiHttp);
var assert = chai.assert;
var expect = require('chai').expect;

chai.use(chaiHttp);


describe("Test Tasks API",  ()=> {
    // describe("GET /api/get-tests", ()=> {
    //     it("It should GET all tests", async()=> {
    //         let res = await chai.request('http://localhost:4000/api')
    //             .get("/get-tests")
        
    //         expect(res.status).to.equal(200)
    //     })
    //     it("It should not GET all tests", async()=> {
    //         let res = await chai.request('http://localhost:4000/api')
    //             .get("/get-test")
    //         expect(res.status).to.equal(404)
    //     })
            
    // })

    // describe("Create /api/new_test", ()=> {
    //     it("It should POST a new Test", (done)=> {
    //         const test_data = {
    //             testname: "UnitTesting 3",
    //             questionlist: ["603ccefdeeca6ba438a254d6"],
    //             passpercent: 73,
    //             IsCertifiable: "YES",
    //             ValidityDate: "2021-05-04T00:00:00.000+00:00",
    //             PageConfig: 10,
    //             Duration: 2,
    //             Active: true,
    //             created_by: "6048782ce7f6dc5484fb8d47"
    //         }
    //         chai.request('http://localhost:4000/api')
    //             .post("/new_test")
    //             .send(test_data)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 expect(res.status).to.equal(200)

    //                 done();
    //             })
                
        
            
            
    //     })
    //     it("It should not POST a new Test", (done)=> {
    //         const test_data = {
    //             testname: "UnitTesting 3",
    //             questionlist: ["603ccefdeeca6ba438a254d6"],
    //             passpercent: 73,
    //             IsCertifiable: "YES",
    //             ValidityDate: "2021-05-04T00:00:00.000+00:00",
    //             PageConfig: 10,
    //             Duration: 2,
    //             Active: true,
    //             created_by: "6048782ce7f6dc5484fb8d47"
    //         }
    //         chai.request('http://localhost:4000/api')
    //             .post("/new-test")
    //             .send(test_data)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 expect(res.status).to.equal(404)

    //                 done();
    //             })
                
        
            
            
    //     })
            
    // })

    // describe("GET /api/get-test/:id", ()=> {
    //     it("It should GET test by ID", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         chai.request('http://localhost:4000/api')
    //             .get(`/get-test/${testid}`)
    //             .end((err,res)=>{
    //                 expect(res.status).to.equal(200)
    //             done();
    //             })
        
            
    //     })
    //     it("It should NoT GET test by ID", (done)=> {
    //         const testid = ""
    //         chai.request('http://localhost:4000/api')
    //             .get(`/get-test/${testid}`)
    //             .end((err,res)=>{
    //                 expect(res.status).to.equal(404)
    //             done();
    //             })
        
            
    //     })
            
    // })

    // describe("PUT /api/update-test/:id", ()=> {
    //     it("It should UPDATE test by ID", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         const test_data = {
    //             TestName: "UNITTESTING 3",
    //             Question_List: ["603ccefdeeca6ba438a254d6"],
    //             PassPercent: 53,
    //             IsCertifiable: "NO",
    //             ValidityDate: "2021-06-04T00:00:00.000+00:00",
    //             PageConfig: 12,
    //             Duration: 5,
    //             Active: true,
    //             created_by: "6048782ce7f6dc5484fb8d47"
    //         }

    //         chai.request('http://localhost:4000/api')
    //             .put(`/update-test/${testid}`)
    //             .send(test_data)
    //             .end((err,res)=>{
    //                 expect(res.status).to.equal(200)
    //             done();
    //             })
        
            
    //     })
    //     it("It should NoT UPDATE test by ID", (done)=> {
    //         const testid = ""
    //         const test_data = {}
    //         chai.request('http://localhost:4000/api')
    //             .put(`/update-test/${testid}`)
    //             .send(test_data)
    //             .end((err,res)=>{
    //                 expect(res.status).to.equal(404)
    //             done();
    //             })
        
            
    //     })
            
    // })
    // /add-test-question/:testid/:ques_list

    // describe("POST /api/add-test-question/:testid/:ques_list", ()=> {
    //     it("It should add questions to specific testid and make test active", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         const questionlist =  "603ccefdeeca6ba438a254d6,6040c5adfaa8e699fcd696b7"
    //         chai.request('http://localhost:4000/api')
    //             .post(`/add-test-question/${testid}/${questionlist}`)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 expect(res.status).to.equal(200)

    //                 done();
    //             })
                
        
            
            
    //     })
    //     it("It should not add questions to specific testid and make test active", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         const questionlist =  "603ccefdeeca6ba438a254d6,6040c5adfaa8e699fcd696b7"
    //         chai.request('http://localhost:4000/api')
    //             .post(`/add_test_question/${testid}/${questionlist}`)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 expect(res.status).to.equal(404)

    //                 done();
    //             })
                
        
            
            
    //     })
            
    // })
    // /remove-question-from-test/:testid/:questionid
    // describe("POST /api/remove-question-from-test/:testid/:questionid", ()=> {
    //     it("It should remove questions to specific testid", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         const questionid =  "603ccefdeeca6ba438a254d6"
    //         chai.request('http://localhost:4000/api')
    //             .post(`/remove-question-from-test/${testid}/${questionid}`)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 expect(res.status).to.equal(200)

    //                 done();
    //             })
                
        
            
            
    //     })
    //     it("It should not remove questions to specific testid", (done)=> {
    //         const testid = "6054564c3274487449edcb8f"
    //         const questionid =  "603ccefdeeca6ba438a254d6"
    //         chai.request('http://localhost:4000/api')
    //             .post(`/remove-question-from-test/${testid}/${questionid}`)
    //             .end((err,res)=>{
    //                 //console.log('saved test unit')
    //                 //console.log('body',res.text)
    //                 assert.equal(res.text, "No entry found with given id")
    //                 //expect(res.status).to.equal(200)

    //                 done();
    //             })
                
        
            
            
    //     })
            
    // })

})




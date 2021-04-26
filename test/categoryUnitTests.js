let Category = require('../server/models/category')

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();
var expect = require('chai').expect;
var assert = chai.assert 
const { deleteOne } = require('../server/models/category');

chai.use(chaiHttp);


describe("Testing category post api", () => {

	it("should return status 200",  (done) => {
        let newCategory = {
            category_name: "Economics",
             parent_category: "main"
            }
    	
        chai.request('http://localhost:4000/api')
        	.post('/add-category')
        	.send(newCategory)
            .end((err,res)=>{
                 console.log(res.body)
                 expect(res.status).to.equal(200)
                 assert.equal(res.body.category_name, newCategory.category_name);
    
             done();
             });

    	
        // var data = Category.findOne({category_name:"General Knowledge"})
        // console.log(data)
        
	})

    // it("deleting the entry",()=>{
    //     Category.deleteMany({category_name:"General Knowledge"})
    //     .then(function(){ 
    //         console.log("Data deleted"); // Success 
    //     }).catch(function(error){ 
    //         console.log(error); // Failure 
    //     });
    // })

	
    // afterEach(async () => {
    // 	await Category.deleteOne({category_name:"General Knowledge"})
	// })
})




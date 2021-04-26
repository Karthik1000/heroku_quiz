var express =require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const mongoURI= 'mongodb+srv://yagnakarthik:kranthi123@cluster0.epurh.mongodb.net/oquiz?retryWrites=true&w=majority'

mongoose.connect(mongoURI,{useNewUrlParser:true}).then(()=>console.log("MongoDb Connected...")).catch(err=>console.log(err))

var question = require('./routes/profile');



app.use('/route',question)
// phani work
const question_routes = require('./routes/questionRoutes')
const category_routes = require('./routes/categoryRoutes')
const test_routes = require('./routes/testRoutes')
const summary_routes = require('./routes/testSummaryRoutes')
 
app.use('/api',question_routes)
app.use('/api',category_routes)
app.use('/api',test_routes)
app.use('/api',summary_routes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../client/build/webpack.config.js'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'webpack.config.js'))
    })
}


app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})

// updated by sri lakshmi
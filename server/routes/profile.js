const express = require("express")
const routes = express.Router()
const cors = require("cors")

//let Ques = require("../models/ques.model")
const Users=require("../models/User")
const bcrypt = require('bcryptjs');

routes.use(cors())


routes.route('/user/:email/:pa').post(function(req, res) {
    console.log('hiiii saving')
    //console.log(req.body)
    let email = req.params.email;
    //let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let mobile_number = req.body.mobile_number;
    let role_name = req.body.role_name;
    let password = req.params.pa; // after we store it using localstorage
    let dob=req.body.dob;
    //let email = "";
    //res.send(data)
    //console.log(email,password) 
    //const salt = bcrypt.genSalt(10);

    //password = bcrypt.hash(password, 10);

    console.log(firstname,lastname,email,password,mobile_number,role_name,dob)
    // let user = {
    //     firstname: firstname,
    //     lastname:lastname,
    //     email:email,
    //     mobile_number: mobile_number,
    //     password:password,
    //     role_name:role_name,
        
    // };
    let record = new Users({firstname,lastname,email,mobile_number,password,role_name,dob});
       record.save()
        .then(user => {
            //console.log('saved')
            res.status(200).json({'user': 'User details added successfully'});
            // if(user){
            //     res.send('YES');
            // }
            // else{
            //     res.send('NO');
            // }
            
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Failed');
        });
        
});
routes.route('/:email').get(function(req,res){
    console.log('getting users for admin/user')
    let email = req.params.email;
    Users.findOne({email:email}, function(err, user){
        if(user){
            console.log(user.role_name)
            res.status(200).send(user.role_name)
        }
        else{
            console.log('user not exists')
            
        }
    }
        )
})

routes.route('/update/:email/:pa').put(function(req, res) {
    console.log('hiiii saving')
    //console.log(req.body)
    let email = req.params.email;
    let password = req.params.pa;
    Users.findOne({email:email}, function (err, user) {

        // todo: don't forget to handle err
        console.log(user)
        if(user){
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let mobile_number = req.body.mobile_number;
            let role_name = req.body.role_name;
            let dob=req.body.dob;
             // after we store it using localstorage
            //let email = "";
            //res.send(data)
            //console.log(email,password) 
            //const salt = bcrypt.genSalt(10);
        
            //password = bcrypt.hash(password, 10);
        
            console.log(firstname,lastname,email,password,mobile_number,role_name,dob)
            //console.log(user.firstname)
            user.firstname = firstname;
            console.log(user.firstname)
            user.lastname = lastname;
            user.mobile_number = mobile_number;
            user.email = email;
            // user.uid =uid
            user.role_name = role_name;
            user.password = password;
            user.dob=dob;
            // don't forget to save!
            user.save().then(data => {
    
                // todo: don't forget to handle err
                console.log('saved')
                //res.redirect('/profile/');
            });
    
        }
        //let password = req.body.password;
    });        
});

           

routes.route('/data/:email').post(function(req, res) {
console.log('hiiii')
let email = req.params.email;
console.log(email) 
let query ={}
if(email.includes('@')){
     query = {email:email}
}
else{
     query = {email:email}
}

Users.findOne(query)
.then(data => {
    if(data){
        console.log('not new user')
        res.send('not new user')
        // routes.route('/get_email').get(function(req,res){
        //     let emails = data.email
        //     console.log('emails'+emails)
            
        //     res.send('Not new user')
        // })

    }
    else{
        console.log('New user')
        res.send('new user')
        // routes.route('/get_email').get(function(req,res){
        //     //let emails = data.email
        //     //console.log('emails'+emails)
            
        //     res.send('new user')
        // })

    }
    
    
    //res.send("YES");
    //console.log(data);
})
.catch(err => {
    console.log('error')
    res.send('New user')
    //res.status(400).send('Failed');
    console.log(err)
    //res.send("NO");
});

});





routes.route('/value/:email/').post(function(req, res) {
    console.log('hiiii')
    let email = req.params.email;
    
   
    console.log(email) 
    Users.findOne({email:email})
    .then(data => {
        if(data){
            console.log('not new user')
            res.send(data)
            // routes.route('/get_email').get(function(req,res){
            //     let emails = data.email
            //     console.log('emails'+emails)
                
            //     res.send('Not new user')
            // })
    
        }
        else{
            console.log('New user')
            res.send('new user')
            // routes.route('/get_email').get(function(req,res){
            //     //let emails = data.email
            //     //console.log('emails'+emails)
                
            //     res.send('new user')
            // })
    
        }
        
        
        //res.send("YES");
        //console.log(data);
    })
    .catch(err => {
        console.log('error')
        res.send('New user')
        //res.status(400).send('Failed');
        console.log(err)
        //res.send("NO");
    });
    
    });
    routes.route('/get-user-id/:get_email').get(function(req, res) {
        let email = req.params.get_email;
        console.log('into the func',email)
        Users.findOne({email:email},function(err,data){
            if(data){
                //console.log(data)
                res.send(data._id)
            }
            else{
                res.status(400).send('No user with current email')
            }
        })

    })

    module.exports = routes;
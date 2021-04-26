import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
require('firebase/auth');
import axios from "axios";
import {
   f7,
  Page, Panel, View, Row, Col, Button, Link,Icon,
  App,
  Navbar,
  NavLeft,
   NavTitle,
   NavTitleLarge,
  NavRight,
 Preloader,
  Toolbar,    Block,
   BlockTitle,
   LoginScreen,
   LoginScreenTitle,
   List,
   ListInput,
   ListButton,
   ListItem,
   BlockFooter, Card,CardContent,CardHeader
 } from 'framework7-react';

 

 const CreatedTest = () => {
   const [role1,setRole] = useState("")
   const [role_flag,setRole_flag]=useState(0);

   useEffect(() => {
     let user_email = (JSON.parse(localStorage.getItem("firebase_email")))
     console.log(user_email)
     axios.get(`http://localhost:4000/route/${user_email}`).then((d)=>{
         //console.log(d)
         let role = d.data;
         sessionStorage.setItem("role", JSON.stringify(role));
         console.log(role);
         setRole(role);
         setRole_flag(1);
 
     }).catch(err=>{
         alert(err)
     })
   }, [])
   const Sign_out = () => {
     firebase.auth().signOut().then(() => {
       // Sign-out successful.
       window.localStorage.removeItem('firebase_email');
       console.log('Sign-out successful.');
       //f7router.navigate('/');
       window.location.href = '/'
     }).catch((error) => {
       // An error happened.
       console.log(error);
     });
 
   }
   const Home = () => {
     window.location.href = '/select'
   }
 
   const Create_test = () => {
       window.location.href = '/create-test'
     }
     const Add_question = () => {
       //f7.dialog.alert(' add question Page');
       window.location.href='/question-form'
     }
     let session = (JSON.parse(localStorage.getItem("firebase_email")))
     let role = (JSON.parse(sessionStorage.getItem("role")))
     if(session){
       if(role_flag===1){
           if(role !== "Admin"){
                  window.location.href = '/create-test'
                 return(
                   <Page>
                   <BlockTitle>Please wait ... Still loading</BlockTitle>
                 <Block strong className="text-align-center">
                   <Preloader color="multi" />
                 </Block>
                 </Page>
               );


                   }
           else{
             // return(
             //   <Page>
             //     hello admin
             //   </Page>
             // )
                     return (

                       <Page>

                               <Navbar>
                                     

                                     <NavLeft>
                                       <Link onClick={Home}>Quiz Application</Link>
                                     </NavLeft>
                                     <NavRight>
                                       <Link onClick={Sign_out}>SignOut</Link>
                                     </NavRight>
                               </Navbar>
                                 

                               <br/>
                               <br/>
                               <br/>
                                     
                               <div style={{ paddingLeft:'40%'}}>
                                     <Button fill color="blue"   onClick={Create_test} style={{width:"30%"}}>Create Test
                                     </Button>
                                     </div>
                               <br/>
                               <br/>
                               <br/>
                               <br/>
                               <div style={{ paddingLeft:'40%'}}>
                               <Button fill color="blue" 
                                   
                                   onClick={Add_question} style={{width:"30%"}}> Add Question
                                 </Button>
                               </div>
                                   
                                     

                                 

                               </Page>
                 );

                     }
                   }
                   else{
                     return (<Page><h1>Loading</h1></Page>)
                   }
               }
                     else{
                       window.location.href = '/';
                       return(
                         <Page>
                             <BlockTitle>Please wait ... Still loading</BlockTitle>
                           <Block strong className="text-align-center">
                             <Preloader color="multi" />
                           </Block>
                           </Page>
                       );
                         
                     }
                     
                  }

 export default CreatedTest;
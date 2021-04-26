
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
require('firebase/auth');
import axios from "axios";

//import HomePage from './home'

// import firebase from 'firebase';
// require('firebase/auth');

// const firebaseConfig = {
//   apiKey: "AIzaSyAEkPJEWVKfWzgoPeSgjPvTKqiSDTn8JII",
//   authDomain: "hip-heading-283511.firebaseapp.com",
//   projectId: "hip-heading-283511",
//   storageBucket: "hip-heading-283511.appspot.com",
//   messagingSenderId: "329860562466",
//   appId: "1:329860562466:web:7018dfa0207798e4df947b",
//   measurementId: "G-K0X5K50J6X"

// };

// firebase.initializeApp(firebaseConfig);

import {
  f7,
  Page,
  View,
  App,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  ListItem,
  Row,
  Col,
  Button,
  Preloader,
  BlockFooter
} from 'framework7-react';




console.log('Hellow world about');

const About = () => {
  useEffect(()=>{
    let session = (JSON.parse(localStorage.getItem("firebase_email")))
    if (session){
      window.location.href = '/create-test'
    }
    
  })



  const [user_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  //console.log(useremail)
  //const [loginScreenOpened, setLoginScreenOpened] = useState(false);

  const signup = () => {
    // if (!firstname ||
    //    !lastname){
    //   f7.dialog.alert('Please enter firstname or lastname');  
    // }else{
    // const post_user_without_fulldetails = (data_values) =>{
    //   console.log(data_values.user_email,data_values.password)
    //   console.log('post_user')
    //   axios.post("http://localhost:4000" + `/route/user/${data_values.user_email}`,data_values)
    //   .then(d =>{
    //     //res.send(d)
    //     console.log('sent details succesfully');
    //     //setFlag(1);
    //   })
    //   .catch(err => {
    //     console.log('error while sending');
    //     })
    //   }
    
    {
    

    firebase.auth().createUserWithEmailAndPassword(user_email,password).then((userCredential)=>{
      //debugger;
      
      var user = userCredential.user;
      console.log('user successfully signned in');
      //f7router.navigate('/form/');
      // http://localhost:8080/
      console.log('user.............')
      console.log(user_email);
      
      // setFirstname('')
      // setLastname('')
      // setRole('')

      // let data ={
      
      //   user_email,
      //   password
        
      // }
      // console.log(data)
      // post_user_without_fulldetails(data);
  





      var actionCodeSettings = {
        url: 'http://localhost:8080/user-profile',
        
        // iOS: {
        //   bundleId: 'localhost'
        // },
        // android: {
        //   packageName: 'localhost',
        //   installApp: true,
        //   minimumVersion: '12'
        // },
        handleCodeInApp: false,
        // When multiple custom dynamic link domains are defined, specify which
        // one to use.
        //dynamicLinkDomain: "localhost"
  
      };
      var user = firebase.auth().currentUser;
      console.log('user  user.............')
      console.log(user.emailVerified)
      localStorage.setItem("firebase_email", JSON.stringify(user.email));
      localStorage.setItem("firebase_pa", JSON.stringify(password));
      console.log(user)
      user.sendEmailVerification(actionCodeSettings).then(function() {
  
        console.log('email sent');
        f7.dialog.alert('Email sent succesfully Please verify your email for successful registration');
  
      }).catch(function(error) {
        console.log('email not sent');
        f7.dialog.alert('Email not sent succesfully');
      });
  
    

    }).catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage,errorCode);
      {
        f7.dialog.alert(errorMessage);
      }
      
    })
  }
  // not in use below....................................................
  // firebase.auth().sendSignInLinkToEmail(useremail, actionCodeSettings)
    //   .then((usercrediential) => {
    //     console.log(usercrediential);
    //     console.log('email sent');
    //     // Verification email sent.
    //   })
    //   .catch((usercrediential)=> {
    //     console.log(usercrediential);
    //     console.log('email not sent');
    //     // Error occurred. Inspect error.code.
    //   });

    // firebase.auth().createUserWithEmailAndPassword(useremail,password).then((userCredential)=>{
    //   var user = userCredential.user;
    //   console.log('user successfully signned in');
    //   //f7router.navigate('/form/');

    // }).catch((error)=>{
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorMessage,errorCode);
    // })
    // f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
    //   f7.loginScreen.close();
    // });
  }
  const signin = () => {
    window.location.href = '/'
  }

  let session = (JSON.parse(localStorage.getItem("firebase_email")))
  if(!session){

  return (
  
    <Page>
    <Page loginScreen>
      <LoginScreenTitle>Sign Up Page</LoginScreenTitle>
      <List form>
        <ListInput
          label="Email"
          type="email"
          placeholder="Your email"
          value={user_email}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      
      {/* <ListInput
          label="firstname"
          type="text"
          placeholder="first name"
          value={firstname}
          onInput={(e) => {
            setFirstname(e.target.value);
          }}
        /> */}


      {/* <ListInput
          label="lastname"
          type="text"
          placeholder="last name"
          value={lastname}
          onInput={(e) => {
            setLastname(e.target.value);
          }}
        /> */}
      </List>
      {/* <List>
      <BlockTitle>Choose as Role</BlockTitle>
          
      <ListItem
        radio
        name="radio"
        value={role}
        title="Teacher"
        onClick={() => {
          setRole('Teacher');
        }}

      ></ListItem>
      <ListItem
        radio
        name="radio"
        value={role}
        title="Student"
        onClick={() => {
          setRole('Student');
        }}

      ></ListItem>
      </List> */}
      
      <List>
        <ListButton onClick={signup}>Sign Up</ListButton>
        <br />
          <button onClick={signin} className="button">Sign In </button>
         <br/> 

        <BlockFooter>
          Some text about login information.
          
        </BlockFooter>
      </List>
    </Page>
  
    </Page>
  );
    }
    else{
      return(
        <Page>
            <BlockTitle>Please wait ... Still loading</BlockTitle>
          <Block strong className="text-align-center">
            <Preloader color="multi" />
          </Block>
          </Page>
      );
    }
  
};
export default About;
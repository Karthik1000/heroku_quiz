import React, { useState, useEffect } from 'react';
// import name from '../config/firebase'
// console.log(name);
console.log('Hellow world nnnnnn');

import firebase from 'firebase';
require('firebase/auth');
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAEkPJEWVKfWzgoPeSgjPvTKqiSDTn8JII",
  authDomain: "hip-heading-283511.firebaseapp.com",
  projectId: "hip-heading-283511",
  storageBucket: "hip-heading-283511.appspot.com",
  messagingSenderId: "329860562466",
  appId: "1:329860562466:web:7018dfa0207798e4df947b",
  measurementId: "G-K0X5K50J6X"

};

firebase.initializeApp(firebaseConfig);


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
  BlockFooter,
  Preloader
} from 'framework7-react';






const HomePage = ({$f7,router}) => {
  useEffect(()=>{
    let session = (JSON.parse(localStorage.getItem("firebase_email")))
    if (session){
      window.location.href = '/select'
    }
    
  })

  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [loginScreenOpened, setLoginScreenOpened] = useState(false);

  const signin = () => {
    firebase.auth().signInWithEmailAndPassword(useremail,password).then((userCredential)=>{
      //var user = userCredential.user;
      var user = firebase.auth().currentUser;
      
      console.log((user.emailVerified))
      // var str = "karthik"
      // if (typeof user.emailVerifed == typeof str){
      //   console.log('hello')
      //   var num = 1;
      // }

      if(user.emailVerified){
        //var user = userCredential.user;
        console.log('user successfully logged in');
        //f7.dialog.alert('User successfully logged in');
        //console.log(user.uid);
        //f7router.navigate('/form/');
        localStorage.setItem("firebase_email", JSON.stringify(user.email));
        localStorage.setItem("firebase_pa", JSON.stringify(password));
        // let uid = user.uid;
        // localStorage.setItem("firebase_uid", JSON.stringify(uid));
    
        window.location.href = '/select'
        //<a onWaiting= {() =>window.location.href = '/form/'}></a> 
        // router.navigate('/form/', {
        //   props: {
        //     foo: 'bar'
        //   }
        // })
        //$f7.navigate('/form')
      }else{
        f7.dialog.alert('User is not verified, Please check your email and verify with link');
      }
      

    }).catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      f7.dialog.alert(errorMessage);
      console.log(errorMessage,errorCode);
    })
    // f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
    //   f7.loginScreen.close();
    // });
  }
  // const postemailData = (email)=>{
  //   axios.post("http://localhost:4000" + `/route/data/${email}`)
  //   .then(email =>{
  //     console.log('email datatta')
  //     console.log(email);
      
  //     //setFlag(1);
  //   })
  //   .catch(err => alert(err))

  // }
  const postemailData = (email)=>{
    console.log('post email data')
    axios.post("http://localhost:4000" + `/route/data/${email}`)
    .then(email =>{
      console.log('email got check successfully')
      console.log(email.data);
      if (email.data == "new user"){
        window.location.href = '/user-profile'
      }
      else{
        window.location.href = '/select'
      }
      
      //setFlag(1);
    })
    .catch(err => alert(err))

  }
  const Google_sign = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log('/if new_user --> profile , else : --> dashboard')
    let email=firebase.auth().currentUser
    let email_ = email.email
    console.log(email_);
    localStorage.setItem("firebase_email", JSON.stringify(email_));
    const password123 = "123";
    localStorage.setItem("firebase_pa", JSON.stringify(password123));


    //postemailData(email_);
    postemailData(email_);
    //window.location.href = '/user-list'
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    f7.dialog.alert(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }
  const Facebook_signin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('user_birthday');
    //firebase.auth().languageCode = 'it';
    //  provider.setCustomParameters({
    //    'display': 'popup'
    //  });

    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log('successfully signed in facebook')
    //window.location.href = '/user-list'
    console.log('/if new_user --> profile , else : --> dashboard')
    let email=firebase.auth().currentUser
    let email_ = email.email
    console.log('email',email_);
    localStorage.setItem("firebase_email", JSON.stringify(email_));
    const password123 = "123";
    localStorage.setItem("firebase_pa", JSON.stringify(password123));
    let uid = user.uid;
    localStorage.setItem("firebase_uid", JSON.stringify(uid));
    console.log('uid',uid);
    if(email_){
      postemailData(email_);
    }
    else{
      postemailData(uid);
    }
    //postemailData(email_);
    

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    console.log('Not signed in facebook')
    var errorCode = error.code;
    var errorMessage = error.message;
    f7.dialog.alert(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

  }
  // const Phone_otp = () => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       signin();
  //     }
  //   });
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  //   const phoneNumber = getPhoneNumberFromUserInput();
  //   const appVerifier = window.recaptchaVerifier;
  //   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  //   .then((confirmationResult) => {
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     window.confirmationResult = confirmationResult;
  //     // ...
  //   }).catch((error) => {
  //     // Error; SMS not sent
  //     // ...
  //   }); 
  //   grecaptcha.reset(window.recaptchaWidgetId);

  //   // Or, if you haven't stored the widget ID:
  //   window.recaptchaVerifier.render().then(function(widgetId) {
  //     grecaptcha.reset(widgetId);
  //   })
  //   const code = getCodeFromUserInput();
  //   confirmationResult.confirm(code).then((result) => {
  //     // User signed in successfully.
  //     const user = result.user;
  //     // ...
  //   }).catch((error) => {
  //     // User couldn't sign in (bad verification code?)
  //     // ...
  //   });
  //   var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
  //   firebase.auth().signInWithCredential(credential);



    
  // }
  const signup = () => {
    window.location.href = '/about'
  }

  let session = (JSON.parse(localStorage.getItem("firebase_email")))
  if(!session){

  return (
  
    <Page>
      <label></label>
    <Page loginScreen>
      <LoginScreenTitle>Sign In Page</LoginScreenTitle>
      <List form>
        <ListInput
          label="Email"
          type="email"
          placeholder="Your email"
          value={useremail}
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
      </List>
      <List>
        <ListButton onClick={signin}>Sign In</ListButton>
        <BlockFooter>
          Some text about sign in information.
          <br />
          <button onClick={signup} className="button">sign Up </button>
          <br/>
          <button onClick={Facebook_signin} className="button">Facebook signin </button>

          <br/>
          <button onClick={Google_sign} className="button">Google signin</button>
          <br />
          
         

          {/* <br/>
          <button onClick={Phone_otp} className="button">Phone Otp</button> */}
          
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
export default HomePage;
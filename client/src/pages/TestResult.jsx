import React from 'react';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Each_question from './Each_question';
import axios from "axios";
import './panel.css';
import firebase from 'firebase';
require('firebase/auth');

import { 
  Page, Panel, View, Block, Navbar, Row, Col, Button, Link,Icon,
  List,
  ListInput,
  ListItem,
  f7,
  Card,
  CardContent
,NavLeft,NavRight,NavTitle

} from 'framework7-react';


function TestResult(props) {

    const [role,setRole] = useState("")
    let complete = props.testresdata["testid"];
    console.log('complete test id 1', complete)
    localStorage.setItem("complete_test", JSON.stringify(complete));
    const complete_test = JSON.parse(localStorage.getItem("complete_test"));
    console.log('complete test id 2',complete_test)

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
      const Profile = () => {
        window.location.href = '/edit-profile'
      }
      const Create_test = () => {
        window.location.href="/create-test"
      }
      const Add_question = () => {
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
      }
      // student test
      const All_Test = () => {
        window.location.href="/create-test"
      }
      const Test_summary = () => {
        //f7.dialog.alert('Page is under development');
        window.location.href='/test-summary'
        // f7.dialog.alert('Your already in test Summary Page');
      }

      let session = (JSON.parse(localStorage.getItem("firebase_email")))
      if(session){
          if(role !== "Admin"){
            history.pushState(null, null, location.href);
            window.onpopstate = function(event) {
              history.go(1);
            };
            return(
                <Page id="panel-page">
          
                <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
                    <Page>
                      <Block strong>
                        <p><br/></p>
                        {/* <p>This is page-nested Panel. User</p> */}
                        <p>
                          <Link onClick={Profile}>Profile</Link>
                        </p>
                        <p>
                          <Link onClick={Sign_out}>Sign Out</Link>
                        </p>
          
                       
                      </Block>
                    </Page>
                  </Panel>
          
                  <Navbar>
                      <NavLeft>
                        {/* <Icon f7="bars" size="44px" color="blue"></Icon> */}
                        <Link icon="menu" panelOpen="#panel-nested"><Icon f7="bars" size="44px" color="blue"></Icon></Link>
                      </NavLeft>
          
                      <NavLeft>
                        <Link onClick={All_Test}>All Tests</Link>
                      </NavLeft>
                      <NavRight>
                        <Link onClick={Test_summary}>Test Summary</Link>
                      </NavRight>
          
          
                  </Navbar>

                  <div>
                    <h1>Test Result</h1>
            <center>            <Card style={{width:"56%",height:"420px",backgroundColor:"#f0f5f5"}}>
                <CardContent>
                <div >
                    <Row style={{marginLeft:"43%",fontFamily:"Avenir Next",letterSpacing:"1px",fontSize:"34px"}}>
                    
                 {props.testresdata["test_name"]}
                 
                    </Row>
                    <br />
                    <br />
                    <Row style={{marginLeft:"35%",fontSize:"24px"}} >
                        Number of Questions : {props.testresdata["number_of_questions"]}
                    </Row>
                    <br />
                    <br />
                    <Row style={{marginLeft:"35%",fontSize:"24px"}} >
                        Number of Correct Answers : {props.testresdata["number_of_correct_answers"]}
                    </Row>
                    <br />
                    <br />
                    <Row style={{marginLeft:"35%",fontSize:"24px"}} >
                        Percentage : {props.testresdata["percent_scored"].toFixed(2)}
                    </Row>
                    <br />
                    <br />
                    <Row  style={{marginLeft:"35%",fontSize:"24px"}}>
                        Result : {props.testresdata["result"]}
                    </Row>
                    </div>
                </CardContent>
            </Card>
            </center>

            
        </div>
            </Page>
            )}
        }

      
    return (
        <div>
            <p>Not Authorized</p>
        </div>
    )
}

export default TestResult

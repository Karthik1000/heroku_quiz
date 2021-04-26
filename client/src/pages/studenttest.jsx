import React, { useState, useEffect, createContext } from 'react';
import './panel.css';
import {
  Page, Panel, View, Block, Navbar, Row, Col, Button, Link,Icon,
  BlockTitle,
  List,f7,
  ListItem,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  BlockFooter,
  Preloader,Card,CardContent,CardHeader, NavLeft,NavRight
} from 'framework7-react';
import firebase from 'firebase';
import axios from 'axios';
require('firebase/auth');

const StudentTest = ($f7) => {
  const [alltest,setAlltest] = useState([""])
  const [role,setRole] = useState("")

  useEffect(() => {
    let user_email = (JSON.parse(localStorage.getItem("firebase_email")))
    console.log(user_email)
    axios.get(`http://localhost:4000/route/${user_email}`).then((d)=>{
        //console.log(d)
        let role = d.data;
        console.log(role);
        setRole(role);

    }).catch(err=>{
        alert(err)
      })

    


    axios.get('http://localhost:4000/api/get-tests').then((tests)=>{
      //console.log(tests)

      let full_data = tests.data;
      console.log(full_data);
      let arr = new Array()
      
      for (var i=0, len = full_data.length; i<len ;i++)
      {
        
        let d = {
          id: full_data[i]._id,
          testname: full_data[i].TestName,
          question_list: full_data[i].Question_List,
          passpercent: full_data[i].PassPercent,
          pageconfig: full_data[i].PageConfig,
          iscertificate: full_data[i].IsCertifiable,
          duration: full_data[i].Duration,
          date: full_data[i].ValidityDate.split("T")[0],
          active: full_data[i].Active

        }
        if(d.active){
          arr.push(d)
        }
        

      }
      setAlltest(
        arr.map(val => {
          return {
            id: val.id,
            testname: val.testname,
            passper: val.passpercent,
            certificate: val.iscertificate,
            duration: val.duration
          };
        })
        );
  



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
      const Profile = () => {
        window.location.href = '/edit-profile'
      }
      const All_Test = () => {
        f7.dialog.alert('Your already in all test page');
      }
      const Test_summary = () => {
        //f7.dialog.alert('Page is under development');
        window.location.href='/test-summary'
      }
      // const Profile = () => {
      //   window.location.href = '/edit-profile'
      // }
      const Create_test = () => {
        //f7.dialog.alert('Your already in Create Test Page');
        window.location.href = '/create-test'
      }
      const Add_question = () => {
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
        
      }

      // const Created_test = () => {
      //   //window.location.href = '/created-test'
      //   console.log('all tests',alltest);
      //   //f7.dialog.alert('Your already in Your Tests Page');
      // }
let session = (JSON.parse(localStorage.getItem("firebase_email")))
if(session)
{
    if(role !== "Admin"){
        return(
            <Page id="panel-page">

      <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
          <Page>
            <Block strong>
              <p><br/></p>
              
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
                
                <BlockTitle>Your Tests</BlockTitle>
                {alltest.map((test)=>{
                const StudentTest = () => {
                    let studenttest_id = test.id;
                    console.log('studenttest-id',studenttest_id)
                    sessionStorage.setItem("stutest-id", JSON.stringify(studenttest_id));
                    window.location.href = '/questions-in-test'
                }
                

                
                return(

                        <Card>
                        <CardContent>
                            <div className="bg-color-blue" style={{ height: '250px' }}>
                            <CardHeader textColor="white" className="display-block">
                                {test.testname}
                                <br />
                                <small style={{ opacity: 0.7 }}>Created tests</small>
                            </CardHeader>
                            <p style={{ color: "white"}}>
                                PassPercentage(in %) : {test.passper}
                                </p>
                                <p style={{ color: "white"}}>
                                Certification : {test.certificate}
                                </p>
                                <p style={{ color: "white"}}>
                                Duration(in minutes) : {test.duration}
                                </p>
                                <Block strong>
                                <Row>
                                    <Col>
                                    {/* <Button color="red">Red</Button> */}
                                    </Col>
                                    <Col>
                                    <Button fill color="red" onClick={StudentTest}>Write Test</Button>
                                    </Col>
                                    <Col>
                                    {/* <Button color="blue">Blue</Button> */}
                                    </Col>
                                </Row>
                                </Block>
                            </div>
                            {/* <div>
                            </div> */}
                        </CardContent>
                        </Card>
                )
                })

                }



            {/* 
                <BlockFooter>Page is Under development....</BlockFooter></center>
                <Block strong className="text-align-center">
                    <Preloader color="multi" />
                    </Block> */}

            </Page>
                
            )

    }
    else{
        return(
            <Page>
            <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link" onClick={Create_test}>Create Test</a>
                    <a href="#" class="link" onClick={Add_question}>Add Question</a>
                    <a href="#" class="link" onClick={Created_test}>Your Tests</a>
                    
                    
                    
                    
                </div>
                
                <div class="right">
                    <a href="#" class="link" onClick={Profile}>Profile</a>
                    <a href="#" class="link" onClick={Sign_out}>Sign Out</a>
                </div>
                </div>
            </div>

                <center>
            <BlockTitle>Your admin</BlockTitle>
          <Block strong className="text-align-center">
            <Preloader color="multi" />
          </Block>
          </center>
          </Page>
    
        )
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
};

export default StudentTest;
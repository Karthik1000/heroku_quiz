import React, { useState, useEffect, createContext } from 'react';
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
  Toolbar,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  ListItem,
  BlockFooter, Card,CardContent,CardHeader
} from 'framework7-react';
import firebase from 'firebase';
import axios from 'axios';
require('firebase/auth');

const CreatedTest = () => {
  const [alltest,setAlltest] = useState([""])

  useEffect(() => {
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
      const Create_test = () => {
        window.location.href = '/create-test'
      }
      const Add_question = () => {
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        //window.location.href = '/created-test'
        console.log('all tests',alltest);
        //f7.dialog.alert('Your already in Your Tests Page');
      }
let session = (JSON.parse(localStorage.getItem("firebase_email")))
if(session){
    
  
return(
  <Page id="panel-page">
  <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
    <Page>
      <Block strong>
        <p><br/></p>
        {/* <p>This is page-nested Panel. User</p> */}
        <p>
          <Link onClick={Created_test}>Your Test</Link>
        </p>

        <p>
          <Link onClick={Profile}>Profile</Link>
        </p>
        <p>
          <Link onClick={Sign_out}>Sign Out</Link>
        </p>

        {/* <p>
          <Link panelClose>Close me</Link>
        </p> */}
      </Block>
    </Page>
  </Panel>

  <Navbar>
      <NavLeft>
        {/* <Icon f7="bars" size="44px" color="blue"></Icon> */}
        <Link icon="menu" panelOpen="#panel-nested"><Icon f7="bars" size="44px" color="blue"></Icon></Link>
      </NavLeft>

      <NavLeft>
        <Link onClick={Create_test}>Create Test</Link>
      </NavLeft>
      <NavRight>
        <Link onClick={Add_question}>Add Question</Link>
      </NavRight>
</Navbar>
  
    <BlockTitle>Your Tests</BlockTitle>
    {alltest.map((test)=>{
      const EditTest = () => {
        let edittest_id = test.id;
        console.log('edittest-id',edittest_id)
        sessionStorage.setItem("edittest-id", JSON.stringify(edittest_id));
        window.location.href = '/edit-test'
      }
      

    
      return(

            <Card style={{width:'30%', display:'inline-block', fontFamily:'inherit', border:'1px solid'}}>
              <CardContent style={{textAlign:'center'}}>
                <div className="bg-color-white" style={{height:'50%' }}>
                  <CardHeader  textColor="white" className="display-block " style={{backgroundColor:'SlateGrey'}}>
                    {test.testname}
                    <br />
                    <small >Created tests</small>
                  </CardHeader>
                  <p style={{ color: "black"}}>
                      PassPercentage(in %) : {test.passper}
                    </p>
                    <p style={{ color: "black"}}>
                      Certification : {test.certificate}
                    </p>
                    <p style={{ color: "black"}}>
                      Duration(in minutes) : {test.duration}
                    </p>
                    <Block strong>
                      <Row>
                        <Col>
                          <Button fill color="blue" onClick={EditTest} >Edit Test</Button>
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

export default CreatedTest;
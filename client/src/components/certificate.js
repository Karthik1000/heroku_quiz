import React from "react";
import ReactDOM from "react-dom";
import { useState,useEffect,useRef,createContext } from 'react';
import axios from "axios";

import Pdf from "react-to-pdf";
import { 
  Page,
  List,
  ListInput,
  Button,
  Radio,
  ListItem,
  Panel,
  Icon,
  f7,
  View,
    App,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Preloader,
    Toolbar,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    ListButton,
    Row,
    Col,
    BlockFooter,
    AccordionContent,
  AccordionItem,
  AccordionToggle,
  
    Card,
    CardContent,CardHeader

} from 'framework7-react';

// import "./styles.css";
const ref = React.createRef();

const Certificate = (props) => {


  const [role,setRole] = useState("")
  
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
    //window.location.href='/test-summary'
    f7.dialog.alert('Your already in test Summary Page');
  }


  
  const myCertificateDownloadHandler=(ele,e)=>{
      console.log("Certificate button clicked");
      setCert_data(ele);
      setCertificate_flag(1);
        }

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
    
  }, [])
  
  let session = (JSON.parse(localStorage.getItem("firebase_email")))
    if(session){
        if(role !== "Admin"){
          return (
    
    
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
      
                    <p>
                      <Link panelClose>Close me</Link>
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
            
          <div className="App" >
              <Pdf targetRef={ref} filename="code-example.pdf">
                  {({ toPdf }) => <button onClick={toPdf} >Download Certificate</button>}
              </Pdf>
              
              <div ref={ref}>
                  {/* <h1>Hello CodeSandbox</h1>
                  <h2>Start editing to see some magic happen!</h2> */}
                  <div style={{width:"795px", height:"1125px", padding:"20px", textAlign:"center", border: "10px solid #787878"}}>
                  <div style={{width:"735px", height:"1075px", padding:"20px", textAlign:"center", border: "5px solid #787878"}}>
                      <span style={{fontSize:"50px", fontWeight:"bold"}}>Certificate of Completion</span>
                      <br/><br/>
                      <span style={{fontSize:"25px"}}><i>This is to certify that</i></span>
                      <br/><br/>
                      <span style={{fontSize:"30px"}}><b>Phani Kanala</b></span><br/><br/>
                      <span style={{fontSize:"25px"}}><i>has passed the test</i></span> <br/><br/>
                      <span style={{fontSize:"30px"}}>{props.certificate_data["TestName"]}</span> <br/>
                      <span style={{fontSize:"20px"}}>with percentage of <b>{props.certificate_data["percent_scored"]}</b> on </span> <br/> 
                      <span style={{fontSize:"25px"}}><i>{props.certificate_data["updatedAt"].split('T')[0].split('-').reverse().join("-")}</i></span>
                  </div>
                  </div>
              </div>
              
          </div>
          </Page>
          
        );
        }
      }
  return (
    
    
      <Page id="panel-page">
      
      <h1>Loading</h1>
    </Page>
    
  );
}

export default Certificate;
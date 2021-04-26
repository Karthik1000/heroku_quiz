import React from 'react'
import { useState,useEffect,useRef,createContext } from 'react';
import axios from "axios";
import Certificate from "../components/certificate";
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
import firebase from 'firebase';
require('firebase/auth');
import './panel.css';



export default function Test_Summary() {


    const [tests,setTests]=useState([]);
    const [role,setRole] = useState("")
    
    const [certificate_flag,setCertificate_flag]=useState(0);
    const [cert_data,setCert_data]=useState({});
    // const [backflag, setBackflag] = useState(0)



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
    
    // useEffect(()=>{
    //   setBackflag(1)
    //   console.log("backflag",backflag)
    //   window.history.pushState(null, document.title, window.location.href);
    //   window.addEventListener('popstate',function(event){
    //     window.history.pushState(null, document.title, window.location.href)
    //   })
    // },[backflag])

    useEffect(()=>{

      // window.history.pushState(null, document.title, window.location.href);
      // window.addEventListener('popstate',function(event){
      //   window.history.pushState(null, document.title, window.location.href)
      // })
          
      window.history.pushState(null, null, window.location.href);
      // window.onpopstate = function(event) {
      //   history.go(1);
      // };
   
        
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
      

        axios.get(`http://localhost:4000/api/get-test-summary/${user_email}`)
        .then((d)=>{
        console.log('test summary',d)
        let test_summary = d.data;
        console.log(test_summary);
        setTests(test_summary);
        
        })  
        
    },[])
    let session = (JSON.parse(localStorage.getItem("firebase_email")))
    if(session){
      // if(backflag===1){

  
        if(role !== "Admin"){

     
            if(certificate_flag===1){
                return <Certificate certificate_data={cert_data} />
            }
         
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
             
              <div class="data-table">
  <table>
    <thead>
      <tr>
        <th class="label-cell">Test Name</th>
        <th class="numeric-cell">Percentage Scored</th>
        <th class="numeric-cell">Result</th>
        <th class="label-cell">Download Certificate</th>
        <th class="numeric-cell">Test Date</th>
        
        </tr>
    </thead>
    <tbody>
        {tests.length>0?
        tests.map((ele)=>{return(<tr>
            <td class="label-cell">{ele.TestName}</td>
            <td class="numeric-cell">{ele.percent_scored?ele.percent_scored.toFixed(2):"NA"}</td>
            <td class="numeric-cell">{ele.Result}</td>
            <td class="label-cell">{ele.Result==="Pass"?<Button onClick={(e)=>{myCertificateDownloadHandler(ele,e)}}>Download</Button>:<div></div>}</td>
            <td class="numeric-cell">{(ele.updatedAt).split('T')[0].split('-').reverse().join("-")}</td>
        
            
          </tr>)})
        :<tr>Data Loading</tr>
     }
      
    </tbody>
  </table>
</div>
      
              </Page>
                  
              )
      
      }
    // }
    }

    return (
        <Page>
            <h1>Unauthorized</h1>
                    </Page>
            
        
    )
}

import React from 'react';
import { useState } from 'react';
import axios from "axios";
import Questions from './question';
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
require('firebase/auth');

 
const Question_form = ({f7,f7router}) => {
  
  const [flag,setFlag]=useState(0)
  const [each_question_description,setEach_question_description]=useState("");
  const [each_question_options,setEach_question_options]=useState([]);
  const [category,setCategory]=useState("");
  const [question_type,setQuestion_type]=useState("");
  const [sub_category,setSub_category]=useState([]);
  const [each_question_correct_options,setEach_question_correct_options]=useState([]);
  const [instanceKey, setInstanceKey] = useState(0);
  
  
 /*
  const questionchildfunc=(question_data)=>{
    setEach_question_description(question_data);
  }
 
 
  const Sub_categorychildfunc=(sub_category_data)=>{
    setSub_category(sub_category_data);
  }
 
  const optionchildfunc=(option_data)=>{
    setEach_question_options(option_data);
  }
 
  const categorychildfunction=(category_data)=>{
    setCategory(category_data);
  }
 
 
  const correctoptionschildfunc=(correctoptions_data)=>{
    setEach_question_correct_options(correctoptions_data);
  }
 
 
  const questiontypechildfunc=(questiontypedata)=>{
    setQuestion_type(questiontypedata);
  }
 */
  const flagchildfunc=()=>{
    setFlag(0?1:0);
  }
 
  const instancechildfunc=()=>{
    setInstanceKey(prevkey=>prevkey+1);
  }
 
  
 /*
  const myQuestionSubmitfunc=()=>{
    console.log(each_question_description);
    console.log(each_question_options);
    console.log(category);
    console.log(sub_category);
    console.log(question_type);
    console.log(each_question_correct_options);
    setInstanceKey((i) => i + 1)
    setFlag(0);
    }
*/
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
        //f7.dialog.alert('Your already in Create Test Page');
        window.location.href = '/create-test'
      }
      const Add_question = () => {
        //f7.dialog.alert('Your already in Add question Page');
        //window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
      }
 
    
  
 
  
  
  /*
  const save =(e)=>{
    e.preventDefault();
    let data=[];
    postquestion(data);
  }
  */
   const postquestion = data =>{
     setFlag(1);
    /*
    axios.post("http://localhost:4000/route/test",data)
    .then(d =>{
      console.log(d);
      setFlag(1);
    })
    .catch(err => alert(err))
    */
   }
     
     
   
 
    
 
 
  var ret_lis;
  
    ret_lis=<Page><div><Questions key={instanceKey}   />
                  </div>
            </Page>
  
  let session = (JSON.parse(localStorage.getItem("firebase_email")))
  if(session){

  
  return (
        // {<sections section = {number_of_sections}/>}
        <Page id="panel-page">
        <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
          <Page>
            <Block strong>
              <p><br/></p>
              
              <p>
                <Link onClick={Created_test}>Your Test</Link>
              </p>
    
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
              <Link onClick={Create_test}>Create Test</Link>
            </NavLeft>
            <NavRight>
              <Link onClick={Add_question}>Add Question</Link>
            </NavRight>
    
    
        </Navbar>
    
    
    <div>
        {ret_lis}
    </div>
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
 
export default Question_form;
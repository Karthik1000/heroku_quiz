import React, { useState, useEffect, useContext } from 'react';

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
//import { appContext } from './test';
  



const SelectQuestion = () => {
  //const {passpercent, iscertificate, pageconfig, date,duration} = useContext(appContext);
  const [question,setQuestion] = useState([""])
  const [question_array,setQuestion_array] = useState([""])
  const [question_array_id,setQuestion_array_id] = useState([""])

  useEffect(() => {
    const mainCat=JSON.parse(sessionStorage.getItem("mainCat"));
    const subCat=JSON.parse(sessionStorage.getItem("subCat"));
    const testname=JSON.parse(sessionStorage.getItem("testname"));
    const testid=JSON.parse(sessionStorage.getItem("testid"));
    console.log('maincat,subcat,testname,testid')
    console.log(mainCat,subCat,testname,testid)
    // console.log('passpercent,iscertificate, pageconfig, date,duration')
    // console.log(passpercent,iscertificate,pageconfig,date,duration)
    
    axios.get(`http://localhost:4000/api/questions-filtered-by-category/${mainCat}/${subCat}`).then(
      data =>{
        console.log(data.data)
        let arr = new Array()
        let full_data = data.data;
        for (var i=0, len = full_data.length; i<len ;i++){
          let d = {
            id: full_data[i]._id,
            question_obj: full_data[i].question_description,
            options: full_data[i].answers,
            answer: full_data[i].correct_answers

          }
          console.log(d)
          arr.push(d)
        }
        // setQuestion_array(
        //   full_data.map((val,i)=>{
        //     console.log(val,i)
        //     return{
        //       id: val
        //       // question_obj: val.question_description,
        //       // options: val.answers,
        //       // answer: val.correct_answers
        //     }
        //   })
        // )
        
        console.log('full data in questions',arr[0])
        let id = arr[0].id;
        let question_arr = arr[0].question_obj;
        let correct_answer = arr[0].answer;
        let options = arr[0].options;
        console.log(id,question_arr,correct_answer,options)




    // let question_array = [
    //   {id:id,question_obj: question_arr, options: options,  answer: correct_answer},
    //   // {id:2,question_obj: "Stone1", options: "[cold1,hot1,humid1]",  answer: "elder1"},
    //   // {id:3,question_obj: "Stone2", options: "[cold2,hot2,humid2]",  answer: "elder2"}
    // ]; 
    setQuestion(
      arr.map(val => {
        return {
          id: val.id,
          select: false,
          question_obj: val.question_obj,
          options: val.options,
          answer: val.answer
        };
      })
      );
      //end of useeffect....
    }
    )
  
    
  }, []);
    //let selectedCheckbox = new Set();
    const test_Name = JSON.parse(sessionStorage.getItem("testname"));
    const test_ID=JSON.parse(sessionStorage.getItem("testid"));
    console.log('final',question)





    //console.log(question)
    // const changeSelect_2_OptionHandler = (event) => { 
    //   setSubCategory(event.target.value);
       
    // }; 
    //let question_array = ["Arrays", "LinkedList", "Stack", "Queue"]; 
    
    



    // const toggleCheckbox = (label) => {
    //   if(selectedCheckbox.has(label)){
    //     selectedCheckbox.delete(label);
    //   }
    //   else{
    //     selectedCheckbox.add(label)
    //   }
    // }

    // const handleformSubmit = () => {
    //   for (const checkbox of selectedCheckbox){
    //     console.log(checkbox, 'is selected');
    //   }
    // }


    /** Type variable to store different array for different dropdown */
    //let type = null; 
    //let options = null; 
    

    // if (type) { 
    //   options = type.map((el) => <option key={el}>{el}</option>); 
    // }

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
      let arr_id = new Array();
      question.map(val=>{
        if(val.select === true){
          arr_id.push(val.id)
        }
      })

      console.log('question_list_ids',arr_id)
      let questionlist = arr_id;
      console.log('passsing data to database',questionlist)
      if(questionlist.length>0){
        axios.post(`http://localhost:4000/api/add-test-question/${test_ID}/${questionlist}`).then((d)=>{
        console.log(d)
        f7.dialog.alert('Test created successfully',"Test Created",()=>{window.location.href = '/created-test'});
      }).catch(err=>{
        alert(err)
      })
      
      }

      else{
        f7.dialog.alert('Please select questions',"Error")
      }
      
      //window.location.href = '/created-test'
    }
    const Your_test = () => {
      //f7.dialog.alert(' add question Page');
      window.location.href='/created-test'
    }


    let session = (JSON.parse(localStorage.getItem("firebase_email")))
    if(session){
    
  
return(
    <Page>
    <Page id="panel-page">
    <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
      <Page>
        <Block strong>
          <p><br/></p>
         
          <p>
            <Link onClick={Your_test}>Your Test</Link>
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
      <LoginScreenTitle>Select Questions</LoginScreenTitle>
      {/* <List form> */}
        
        
        {/* <div>  */}
          {/** Bind changeSelectOptionHandler to onChange method of select. 
           * This method will trigger every time different 
           * option is selected. 
           */}
       {/* <ListInput
        label="Main Category"
        type="select"

        onInput={changeSelectOptionHandler}> 
            <option>Choose...</option> 
            <option>Algorithm</option> 
            <option>Language</option> 
            <option>Data Structure</option> 
        </ListInput> */}
        {/* </div>  */}
        
        
          {/* {
            question_array.map(val => {
              return(
                <ListItem
                checkbox
                type="checkbox"
                key = {val.firstname}
                title = {val.firstname}
                
                
                // onChange={() => {
                //   setQuestion({val});
                // }}
                
                >
                  
                </ListItem>
        
              )
            })
          } */}


        
<div class="data-table data-table-init card">
  <table>
    <thead>
      <tr>
        <th class="checkbox-cell">
          <label class="checkbox">
            <input 
            onChange= {(e)=>{
              let checked = e.target.checked;
              setQuestion(question.map((val)=>{
                val.select=checked;
                return val
              }))
            }}


            type="checkbox"
            >
            </input>
            <i class="icon-checkbox"></i>
          </label>
        </th>
        <th class="label-cell">Questions</th>
        {/* <th class="numeric-cell">Options</th>
        
        <th class="numeric-cell">Answer</th> */}
      </tr>
    </thead>
    <tbody>
      {question.map(val=>(

      
      <tr key={val.id}>
        <td class="checkbox-cell">
          <label class="checkbox">
            <input 
              onChange={event=>{
                let checked = event.target.checked;
                setQuestion(question.map(data => {
                  if(val.id === data.id){
                    data.select = checked
                  }
                  return data;
                }))
              }}
            
            
            type="checkbox"
            checked={val.select}
            >
            </input>
            <i class="icon-checkbox"></i>
          </label>
          
        </td>
        <td class="label-cell">{val.question_obj}</td>
        {/* <td class="numeric-cell">{val.options}</td>
        <td class="numeric-cell">{val.answer}</td> */}
      </tr>
      
      ))}
      {/* <tr>
        <td class="checkbox-cell">
          <label class="checkbox">
            <input type="checkbox"/>
            <i class="icon-checkbox"></i>
          </label>
        </td>
        <td class="label-cell">Frozen yogurt</td>
        <td class="numeric-cell">159</td>
        
        <td class="numeric-cell">4.0</td>
      </tr> */}
      
    </tbody>
  </table>
</div>



























      {/* </List> */}
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
      {/* onClick={Add_Test_to_Question} */}
      {/* <List>
        <ListItem
          title="Select Question component"
          link={link1234}
        />

      </List> */}
      <List>
        <ListButton  onClick={Created_test}>Create Test</ListButton>
        <BlockFooter>
            Some text about Add questions in test Page          
        </BlockFooter>
      </List>
    </Page>
  
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

export default SelectQuestion;
import React, { useState, useEffect, createContext } from 'react';
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
  Toolbar,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  ListItem,
  
  BlockFooter, Card,CardContent,CardHeader, Treeview,TreeviewItem,CardFooter
} from 'framework7-react';
import firebase from 'firebase';
import SelectQuestion from './Select_question';
// import ModalComponent from 'framework7/types/components/modal/modal';
require('firebase/auth');


const edittest = () => {
    const [test_name, setTestName] = useState('');
    const [passPercent, setPassPercent] = useState();
    const [iscertificate, setIsCertificate] = useState('');
    const [pageconfig, setPageConfig] = useState();
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState();

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    if(dd<10){
      dd= '0'+dd
    }
    if(mm<10){
      mm='0'+mm
    }
    today=yyyy+'-'+mm+'-'+dd
    const [error_duration,seterror_duration]=useState("");
    const [error_pageconfig,seterror_pageconfig]=useState("");
    const [error_passpercent,seterror_passpercent]=useState("");


    const [questionarray,setQuestionArray] = useState([""]);
    const [finalquestions, setFinalQuestions] = useState([""])
    let arr = new Array();
    let edittest_id=JSON.parse(sessionStorage.getItem("edittest-id"));



    const pageconfigErrorHandler=()=>{
      //console.log(typeof pageconfig)
      if(pageconfig<=0 || (isNaN(pageconfig))){
      seterror_pageconfig("Number of Questions in a Page cannot be Zero or Negative")
      }
      else{
        seterror_pageconfig("")
      }

    }


    const passpercentageErrorHandler=()=>{
      console.log(passPercent)
      if((passPercent<1) || (passPercent>100) || (isNaN(passPercent))){
      seterror_passpercent("Invalid Pass Percentage")
      }
      else{
        seterror_passpercent("")
      }

    }


    const durationErrorHandler=()=>{
      
      if(isNaN(duration)){
        seterror_duration("Invalid Duration")
      }
      else if(duration<=0){
        seterror_duration("Duration cannot be Zero or Negative")
      }
      else{
        seterror_duration("");
      }
    };

    
    useEffect(() => {
      
      //let testid = '6040c8e05e060aa438359305';
        axios.get(`http://localhost:4000/api/get-test/${edittest_id}`).then((d)=>{
            //console.log(d)
            let full_data = d.data;
            console.log(full_data);
            
            
            //for (var i=0, len = full_data.length; i<len ;i++)
            {
              
              let d = {
                id: full_data._id,
                testname: full_data.TestName,
                question_list: full_data.Question_List,
                passpercent: full_data.PassPercent,
                pageconfig: full_data.PageConfig,
                iscertificate: full_data.IsCertifiable,
                duration: full_data.Duration,
                date: full_data.ValidityDate.split("T")[0]
    
              }
              //console.log(d)
              setTestName(d.testname);
              setPassPercent(d.passpercent);
              setIsCertificate(d.iscertificate);
              setPageConfig(d.pageconfig);
              setDuration(d.duration);
              setDate(d.date);
              let questions = (d.question_list);
              //console.log('questions list....',questions)
              // for (let val of questions){
              //   console.log('question id',val)
              // }
              questions.map(ques_id=>{
                //console.log('question id',ques_id)
                axios.get(`http://localhost:4000/api/get-question/${ques_id}`).then((d)=>{
                    //console.log('questions list',d)
                    let full_questions = d.data;
                    for (var i=0, len=full_questions.length;i<len;i++){
                        let ques = {
                            id: full_questions[i]._id,
                            question_obj: full_questions[i].question_description,
                            options: full_questions[i].answers,
                            answer: full_questions[i].correct_answers
                        }
                        //console.log(ques);
                        arr.push(ques);
                    }
                    

                })
              }

              )
              console.log('arr_questions',arr)
              
              
              


              //console.log(question)


              //arr.push(d)
            }
    

          }).catch(err=>{
            alert(err)
          })
          //console.log('questionlist',question)
          setQuestionArray(arr);
          //console.log('questions array',questionarray)

    }, [])
    


    useEffect(() => {
      pageconfigErrorHandler();
      passpercentageErrorHandler();
      durationErrorHandler();
    }, [pageconfig,passPercent,duration])


    const changecertifiable = (event) =>{
        setIsCertificate(event.target.value);
      }

      
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
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
        
      }
      const Question = () => {
        console.log('questions array',questionarray)
        setFinalQuestions(questionarray);
      }
      const Update = () => {

        if(error_duration!=="" || error_pageconfig!=="" || error_passpercent!=="" ){
          f7.dialog.alert("One or more of your input values is causing an error","Error Updating")
        }
        else{
        console.log('update test id', edittest_id)
        let TestName = test_name;
        let PassPercent = passPercent;
        let IsCertifiable = iscertificate;
        let PageConfig = pageconfig;
        let ValidityDate = date;
        let Duration = duration;
        let data = {
          TestName, PassPercent, IsCertifiable, PageConfig, ValidityDate, Duration

        }
        axios.put(`http://localhost:4000/api/update-test/${edittest_id}`, data)
        .then(d => {
            console.log(d);
            f7.dialog.alert('Updated!',"Update Notification",()=>{window.location.href='/created-test'});
        })
        .catch(err => alert(err))

      }
      }
      //console.log('final questions',finalquestions)
      
      let session = (JSON.parse(localStorage.getItem("firebase_email")))
      // const calendarDisabled = f7.calendar({
      //   input:"#calendar-disabled",
      //   dateFormat:"M dd yyyy",
      //   disabled:{
      //     from:new Date(),
      //     to:new Date()+5
      //   }
      // })
      if(session){
      
        console.log(today)
    return(
        <Page>
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

            
            <LoginScreenTitle>Edit Test</LoginScreenTitle>
      <List form>
        <ListItem>
        <ListInput
          label="Test Name"
          type="text"
          name = "Test_Name"
          placeholder="Test Name"
          value={test_name}
          readonly
        />
        </ListItem>
        
        <ListItem >
        <ListInput
          label="Pass Percent"
          type="number"
          name = "Pass_Percent"
          placeholder="Pass Percent"
          value={passPercent}
          onInput={(e) => {
            setPassPercent(parseInt(e.target.value));
          }}
        />
        <div style={{fontSize:"80%",marginTop:".25rem",color:"#dc3545",width:"100%"}}>
          
        {error_passpercent?error_passpercent:""}</div>
        </ListItem>
        
      
      <ListItem>
      <ListInput
        label="Is certifiable ?"
        type="select"
        value={iscertificate}
        onInput={changecertifiable}> 
            <option>Choose...</option> 
            <option>YES</option> 
            <option>NO</option> 
            
        </ListInput>
        </ListItem>
        
             
          <ListItem>
      <ListInput
          label="Page config"
          type="number"
          name = "Page_config"
          placeholder="Number of questions per page.."
          value={pageconfig}
          onInput={(e) => {
            setPageConfig(parseInt(e.target.value));
            }}
         
        />
        <div style={{fontSize:"80%",marginTop:".25rem",color:"#dc3545",width:"100%"}}>
          {error_pageconfig?error_pageconfig:""}
          
        </div>
        
        </ListItem>

        <ListItem>
        
        <ListInput
        label="Validity Date"
        type="date"
        name="Validity_date"
        info="Default validation"
        id="calendar-disabled"
        required
        validate
        min={today}
        value={date}
        onChange={e => setDate(e.target.value)}
        //clearButton
        />
        </ListItem>


        <ListItem>      <ListInput
          label="Duration in minutes"
          type="number"
          name = "Duration"
          placeholder="Duration in minutes"
          value={duration}
          onInput={(e) => {
            setDuration(parseInt(e.target.value));
          }}
        />
        <div style={{fontSize:"80%",marginTop:".25rem",color:"#dc3545",width:"100%"}}>
        
        {error_duration?error_duration:""}
        </div>
        </ListItem>

        {/* <React.Fragment>
        
        <div>  */}
          {/** Bind changeSelectOptionHandler to onChange method of select. 
           * This method will trigger every time different 
           * option is selected. 
           */}
       {/* <ListInput
        label="Main Category"
        type="select"

        onInput={changeSelectOptionHandler}> 
          { main_options }
        </ListInput>
        </div> 
        <div> 
        <ListInput
        label="Sub Category"
        type="select"

        onInput = {changeSelect_2_OptionHandler}>
           { sub_options }
        </ListInput> */}
        {/* </div> 
        
        </React.Fragment> */}


      {/* <ListInput
        label="Difficulty"
        type="select"
        
        placeholder="Please choose difficulty level..."
        onInput={e => setDifficulty(e.target.value)}
        >
        <option defaultValue=""  >....</option> 
        <option  value="Beginner"  >Beginner</option>
        <option value="Moderate"  >Moderate</option>
        <option value="Advanced"  >Advanced</option>
    
        
        </ListInput> */}

      {/* <ListInput
          label="Page config"
          type="text"
          placeholder="Page config"
          value={pageconfig}
          onInput={(e) => {
            setPageConfig(e.target.value);
          }}
        /> */}






      </List>
      <List>
        <Button className="col" onClick= {Update}>Update</Button>
      </List>


      
    <BlockTitle>Your Questions</BlockTitle>
    <Treeview >
      <TreeviewItem iconF7="square_grid_2x2_fill" itemToggle label="View Questions" onClick={Question}>
          {
            finalquestions.map(val=>{
            const deletequestion=()=> {
              console.log('hello question id', val.id)
              console.log('test id', edittest_id)
              if(finalquestions.length>1){
                axios.post(`http://localhost:4000/api/remove-question-from-test/${edittest_id}/${val.id}`)
                .then((d)=>{
                  console.log(d)
                  console.log('deleted successfully')
                  f7.dialog.alert('Deleted Successfully!',"Delete Notification",()=>{window.location.href='/edit-test'});
                })
  
              }
              else{
                f7.dialog.alert('Test should have atleast one question',"Error");
              }              
            }
            return(
            <Card className="demo-card-header-pic">
              <CardContent>
                <p >id : {val.id}</p>
                <p>
                  questions: {val.question_obj}
                </p>

                <p>
                  options: {val.options}
                </p>
                <p>
                  answer: {val.answer}
                </p>
              </CardContent>
              <CardFooter>
                
                <Link onClick={deletequestion} >Delete</Link>
              </CardFooter>
            </Card>)
            })
          }

      </TreeviewItem>
    </Treeview>

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

export default edittest;    
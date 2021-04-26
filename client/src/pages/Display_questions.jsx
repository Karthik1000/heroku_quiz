import React from 'react';
import { useState,useEffect } from 'react';
import "../css/styles.css";
import ReactPaginate from 'react-paginate';
import Each_question from './Each_question';
import axios from "axios";
import './panel.css';
import TestResult from "./TestResult";
import { 
  Page, Panel, View, Block, Navbar, Row, Col, Button, Link,Icon,
  List,
  ListInput,
  ListItem,
  f7,
  Card
,NavLeft,NavRight,NavTitle

} from 'framework7-react';
import { offset } from 'dom7';
import firebase from 'firebase';
require('firebase/auth');


const Display_questions = () => {

const questions_per_page=3;
const [each_component,setEach_component]=useState([]);
const [choosen_options,setChoosen_options]=useState({"":[]});
const [question_ids,setQuestion_ids] = useState([]); 
const [pageconfig,setPageconfig] = useState(1);
// const question_ids=[1,2,3,4,5,6,7,8];
const [flag,setFlag]=useState(false);
const [questions,setQuestions] = useState([]);
const [tname,setTname] = useState("");
const [tid,setTid] = useState("");
const [percent,setPercent] = useState(35);
// const [final]
// let q = new Array();
const [correct_answers,setCorrectAnswers] = useState({"":[]})
// let c_answers = {};
const [count_flag,setCountFlag] = useState(0);
   const choosenoptionschildfunc=(choosenoptions_childdata)=>{
     setChoosen_options(choosenoptions_childdata);
   } 
    
    
   
  const [pagination, setPagination] = useState({
      data: questions,
      offset: 0,
      numberPerPage:pageconfig,
      pageCount: 0,
      currentData: []
    });

const [testflag,setTestflag]=useState(0);
const [testresdata,setTestresdata]=useState({});



    const [test_mins,setTest_mins]=useState(1);
    var h = Math.floor(test_mins/ 60);
    var m = test_mins % 60;
    //console.log(h);
    //console.log(m);
    const [hours,setHours]=useState(1);
    const [ minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(1);
    
    const [timer_flag,setTimerflag]=useState(0);
    const [start_complete_flag, setStart_Comple_Flag] = useState(0);

    useEffect(()=>{
      if(question_ids.length ===0){
        //console.log("ININININ")
      //console.log(question_ids.length);
      //window.localStorage.removeItem('start_test');
      //window.localStorage.removeItem('complete_test');
      const test_id=JSON.parse(sessionStorage.getItem("stutest-id"));
      localStorage.setItem("start_test", JSON.stringify(test_id));
      const start_test=JSON.parse(localStorage.getItem("start_test"));
      console.log('start test',start_test)
      setStart_Comple_Flag(1);



      setTid(test_id)

      axios.get(`http://localhost:4000/api/get-test/${test_id}`)
      .then((d)=>{
      
          let test_data = d.data;
          setTname(test_data.TestName);
          setPercent(test_data.PassPercent);
          
         // console.log("TESTTTTT DATA",test_data);
         // console.log("TESTTTTT DATA",test_data);
          setQuestion_ids(test_data.Question_List)
          setPageconfig(test_data.PageConfig)
          let ques_id_array = test_data.Question_List
          ques_id_array.map(ques_id=>{
            //console.log('question id',ques_id)
            axios.get(`http://localhost:4000/api/get-question/${ques_id}`).then((d)=>{
                //console.log('questions list',d)
                let full_questions = d.data;
                console.log("FULL");
                console.log(full_questions);
                //console.log("QUESTIONS",full_questions)
                for (var i=0, len=full_questions.length;i<len;i++){
                    let ques = {
                        id: full_questions[i]._id,
                        question_description: full_questions[i].question_description,
                        options: full_questions[i].answers,
                        correct_answer: full_questions[i].correct_answers,
                        question_type : full_questions[i].answer_type
                    }
                   // console.log(ques);
                    questions.push(ques);
                    correct_answers[full_questions[i]._id] = full_questions[i].correct_answers
                }
                setQuestions(questions);
                setCorrectAnswers(correct_answers);
                
                setPagination((prevState) => ({
                  ...prevState,
                  numberPerPage:pageconfig,
                  pageCount: prevState.data.length / prevState.numberPerPage,
                  currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
                }))
          
                const num_pages=Math.ceil(questions.length/pagination.numberPerPage)
                
                const initial_offset=0;
                let final_offset=0;
                for(var i=0;i<num_pages-1;i++){
                  final_offset=final_offset+pagination.numberPerPage;
                }
                //console.log(final_offset);
                if(final_offset===pagination.offset){
                  setFlag(true);
                }
                else{
                  setFlag(false);
                }
                
                  
                
            })
          }

          )
          
      })
      
      
    }
    },[])

    useEffect(() => {

      if(timer_flag===0){
        const test_id=JSON.parse(sessionStorage.getItem("stutest-id"));
        setTid(test_id)

      axios.get(`http://localhost:4000/api/get-test/${test_id}`)
      .then((d)=>{
        let test_data = d.data;
          
        setTest_mins(test_data.Duration);
          //var h = Math.floor(test_mins/ 60);
          //var m = test_mins % 60;
          setHours(Math.floor((test_data.Duration)/ 60));
          setMinutes((test_data.Duration )% 60);
          setSeconds(1);
          setTimerflag(1);
          
      })
      

      }


     
    else{
      setPagination((prevState) => ({
        ...prevState,
        numberPerPage:pageconfig,
        pageCount: prevState.data.length / prevState.numberPerPage,
        currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
      }))

      const num_pages=Math.ceil(questions.length/pagination.numberPerPage)
      
      const initial_offset=0;
      let final_offset=0;
      for(var i=0;i<num_pages-1;i++){
        final_offset=final_offset+pagination.numberPerPage;
      }
      //console.log(final_offset);
      if(final_offset===pagination.offset){
        setFlag(true);
      }
      else{
        setFlag(false);
      }
      let myInterval = setInterval(() => {

        if(testflag===1){
          clearInterval(myInterval);
        }
        else if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        else if (seconds === 0) {
            if(minutes === 0){
                if(hours === 0){
                    f7.dialog.alert("Time is Up","Test Completed",myQuizSubmitfunc);
                    clearInterval(myInterval)
                }
                else{
                setHours(hours-1);
                setMinutes(59);
                setSeconds(59);
                }
            }
            else{
                setMinutes(minutes-1);
                setSeconds(59);
            }
        }
        else{
          setMinutes(minutes-1);
          setSeconds(59);
        }

        },1000)


        return ()=> {
          clearInterval(myInterval);
        };
    }
   
    
    }, [pagination.numberPerPage, pagination.offset,seconds,hours,minutes]);

  //console.log(questions,"sdfghjk",correct_answers)


    const handlePageClick = event => {
      const selected = event.selected;
      const offset = selected * pagination.numberPerPage
      setPagination({ ...pagination, offset })
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
      window.location.href = '/create-test'
    }

    const All_Test = () => {
      // f7.dialog.alert('Your already in all test page');
      window.location.href='/create-test'
    }
    const Test_summary = () => {
      //f7.dialog.alert('Page is under development');
      window.location.href='/test-summary'
    }




    const myQuizSubmitfunc=()=>{
      
            let number_of_correct_answers=0;
            //console.log(questions.length);
            for(var i=0;i<questions.length;i++){
              if(questions[i].question_type==="Multiple Choice Questions"){
                if (questions[i].id in choosen_options){
                  var id=questions[i].id;
                  //console.log(choosen_options);
                   // console.log(choosen_options[id]);
                    //console.log(correct_answers[id]);
                    //console.log(typeof choosen_options[id]);
                    //console.log(typeof correct_answers[id]);
                    

                  if(choosen_options[id].toString()===correct_answers[id].toString()){
                    //console.log("In")
                    number_of_correct_answers=number_of_correct_answers+1;
                  }
                }
              }
              else if(questions[i].question_type==="Checkbox"){
                if (questions[i].id in choosen_options){
                  var id=questions[i].id;
                  var choosen=choosen_options[id];
                  var correct=correct_answers[id];
                  var res=arrayCompare(choosen,correct)
                  if(res){
                    number_of_correct_answers=number_of_correct_answers+1;
                  }
                }

              }
            }
            console.log(number_of_correct_answers);
            console.log("Submitted");
            let u_email = JSON.parse(localStorage.getItem("firebase_email"));
            let percent_scored = (number_of_correct_answers/questions.length)*100;
            let result = ""
            if(percent_scored>=percent){
              result = "Pass"
            }
            else{
              result = "Fail"
            }
            // let date = Date.now()
            let testtime = 2
            let data={
              tname,tid,percent_scored,result,u_email,testtime
            }
            console.log("DATA:",data)
            axios.post("http://localhost:4000/api/save-summary",data)
            .then((d)=>{
              console.log(d)
              
              console.log("Success");
              var temp_data={percent_scored:percent_scored,
              result:result,
              test_name:tname,
              number_of_questions:questions.length,
              number_of_correct_answers:number_of_correct_answers,
              testid: tid

            }
              setTestresdata(temp_data)
              setTestflag(1);
            })
            .catch(err=>{
              console.log("ASDFGHJK")
              alert(err)
            })


            

    }




    function arrayCompare(_arr1, _arr2) {
      if (
        !Array.isArray(_arr1)
        || !Array.isArray(_arr2)
        || _arr1.length !== _arr2.length
        ) {
          return false;
        }
      
      // .concat() to not mutate arguments
      const arr1 = _arr1.concat().sort();
      const arr2 = _arr2.concat().sort();
      
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
              return false;
           }
      }
      
      return true;
  }
  const Flag = () => {
    //console.log(questions,"entered into flag=1",correct_answers);
    setSeconds(0);
    setCountFlag(1);
  }


if(testflag===1){
  // history.pushState(null, null, location.href);
  //     window.onpopstate = function(event) {
  //       history.go(1);
  //     };
   
  return (<TestResult testresdata={testresdata} />)
}
  
  if(count_flag===1){
    
      history.pushState(null, null, location.href);
      window.onpopstate = function(event) {
        history.go(1);
      };
   
    return (
      <Page>

      <div>
        <Card>
      <div>
            <div>Your Test Ends In</div>
        { minutes === 0 && seconds === 0
            ? null
            : <div>{hours<10? `0${hours}` : hours} :{minutes<10? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
        }
        </div>
        </Card>
        
              {pagination.currentData && pagination.currentData.map(((item, index) => (
                <div className="post">
                  <Each_question key={item.id} id={item.id} question_description={item.question_description} options={item.options} 
                                 question_type={item.question_type} choosenoptionschildfunc={choosenoptionschildfunc}
                                 choosen_options={choosen_options}  question_ids={question_ids}
                                
                  />
                </div>
              )))
              }


        {flag && <button onClick={myQuizSubmitfunc}>Submit</button>}
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakClassName={"break-me"}
          breakLabel={'...'}
          pageCount={pagination.pageCount}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      </Page>
    );
  }
  else{
    const start_test=JSON.parse(localStorage.getItem("start_test"));
    const complete_test = JSON.parse(localStorage.getItem("complete_test"));
    console.log(start_test,complete_test)

    if(start_test!==complete_test){
      return(
      
        // <Page>
        // <Navbar title="My App" backLink="Back">
        //   <NavRight>
        //     <Link icon="icon-bars" panelOpen="right">Right panel</Link>
        //   </NavRight>
        // </Navbar>
  
  
  
        //   <center>
        //   <button onClick={Flag}>Start Test</button>
        //   </center>
        // </Page>
        
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
                <Link onClick={All_Test}>All Tests</Link>
              </NavLeft>
              <NavRight>
                <Link onClick={Test_summary}>Test Summary</Link>
              </NavRight>
  
  
          </Navbar>
             <center>
           <button onClick={Flag}>Start Test</button>
           </center>
  
          {/* <Block>
            <Row tag="p">
              <Col tag="span">
                <Button raised fill panelOpen="#panel-nested">
                  Open nested panel
                </Button>
              </Col>
            </Row>
          </Block> */}
        </Page>
    
        )
  
    }
    else{
      //window.location.href = '/create-test'
      console.log('returns')
      //f7.dialog.alert('Redirecting you to all test page ', "Alert")
      return(
        <center><p>Sorry due to some technical problem you landed on wrong page, Please click on this to go back</p>
          <Button onClick={Create_test}>Go back</Button>
        </center>
      )
    }
  }
}

export default Display_questions;
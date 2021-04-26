import React, { useState, useEffect, createContext } from 'react';
import axios from "axios";
import { useIsMount } from './useIsMount';
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
import SelectQuestion from './Select_question';
require('firebase/auth');
import './panel.css';
import Test_Summary from "./Test_Summary";
export const appContext = createContext();

const test = () => {
    const [test_name, setTestName] = useState('');
    const [passPercent, setPassPercent] = useState('');
    const [iscertificate, setIsCertificate] = useState('');
    const [pageconfig, setPageConfig] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');


    const [firstrender,setFirstrender]=useState(false);

    const [error_duration,seterror_duration]=useState("");
    const [error_pageconfig,seterror_pageconfig]=useState("");
    const [error_passpercent,seterror_passpercent]=useState("");
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
    

    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [main_cat,setmain_cat] = useState([""]);
    const [main_cat_arr,setMaincat_arr] = useState([""]);
    const [main_cat_id,setMain_cat_id] = useState('')
    const [sub_cat,setsub_cat] = useState([""]);
    const [sub_cat_arr,setSub_arr] = useState([""]);
    const [sub_cat_id,setSub_cat_id] = useState('')
    const sub_array = new Array();
    sub_array.push('Select');
    sub_array.push('Include-All');
    const [flag,setFlag] = useState(0);
    let ret_lis=[];
    // for user or admin
    const [role,setRole] = useState("")
    const [alltest,setAlltest] = useState([""])
    let summary = new Array();
    useEffect(() => {
      // user or admin
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
        
        for(var i=0, len = test_summary.length;i<len;i++){

            let su =  test_summary[i].TestId;
          
            summary.push(su);
        }
        console.log('summary of testid',summary)
      })  
  

      // student test
      axios.get('http://localhost:4000/api/get-tests').then((tests)=>{
        //console.log(tests)
        console.log('in to the test', summary)
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
          // if(summary.length === 0){
          //     if(d.active){
          //       arr.push(d)
          //     }

          // }
          // else{
            // for (let value of summary){
            //   if(){
                
            //   }
            // }
  
          // }
          // console.log(!(d.id in summary),summary,d.id)
          // console.log(summary.filter(s=>s !== d.id))
          let c = 0
          for(var j=0;j<summary.length;j++){
            if(summary[j]===d.id){
              c++;
            }
          }
          if(c===0 && d.active){
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
  
  


      // sub_array = new Array();
      
      axios.get('http://localhost:4000/api/get-main-categories').then(
        data=>{
            //console.log(data)
            let main_cate = data.data;
            //console.log(main_cat)
            setmain_cat(main_cate.map(val=>{
                return{
                    id: val._id,
                    category_name:val.category_name

                }
            }))
            let main_cat_array = new Array()
            main_cat_array.push("Select")
            for (let val of main_cate){
                //console.log(val.category_name)
                main_cat_array.push(val.category_name)
            }
            //console.log(main_cat_array)
            setMaincat_arr(main_cat_array)
        }
    )

    axios.get('http://localhost:4000/api/get-all-sub-categories').then(
      data=>{
          //console.log(data)
          let sub_cate = data.data;
          //console.log(main_cat)
          setsub_cat(sub_cate.map(val=>{
              return{
                  id: val._id,
                  category_name:val.category_name,
                  parent_category_id: val.parent_category_id


              }
          }))
          let sub_cat_array = new Array()
          for (let val of sub_cate){
              //console.log(val.category_name)
              sub_cat_array.push(val.category_name)
          }
          //console.log(sub_cat_array)
          setSub_arr(sub_cat_array)
    }
  )


    }, [])


    

    // console.log('maincat')
    // console.log(main_cat)
    // console.log('maincat arr')
    // console.log(main_cat_arr)
    // console.log('subcat')
    // console.log(sub_cat)
    // console.log('subcat arr')
    // console.log(sub_cat_arr)
    
    let main_options = main_cat_arr.map((el) => <option key={el}>{el}</option>); 
    //console.log('main_category',mainCategory)
    // let sub_options = sub_cat_arr.map((el) => <option key={el}>{el}</option>); 
    // console.log('sub category',subCategory)
    //console.log('intoo the function',main_cat)
    //let mainCategory = 'Computer Science';
    // console.log(category)
    let cat_id;
    main_cat.map(val => {
      if(val.category_name === mainCategory){
        cat_id = val.id
      }
    })
    // console.log('main_cat_id')
    // console.log(cat_id)
    //setMain_cat_id(cat_id)
    // console.log(main_cat_id)
    
    //let subcat_id;
    sub_cat.map(val => {
      //console.log('entering into sub_cat map',cat_id)
      if(val.parent_category_id === cat_id){
        //console.log(val.category_name)
        sub_array.push(val.category_name)
      }
    })
    //setSub_cat_id(subcat_id)
    // console.log('sub_array')
    // console.log(sub_array)
    let sub_options = sub_array.map((el) => <option key={el}>{el}</option>); 
    //console.log('sub category',subCategory)



  
    //React Components
    //const [selected, setSelected] = useState(''); 
    const changeSelectOptionHandler = (event) => { 
        
      setMainCategory(event.target.value); 
    }; 
    //console.log(selected); 
    const changeSelect_2_OptionHandler = (event) => { 
        setSubCategory(event.target.value);
         
      }; 
      //console.log(subCategory);

      const Add_Test_to_Question = () => {
        //console.log(test_name,passPercent,iscertificate,pageconfig,date,duration,mainCategory,subCategory,difficulty)
        if(!test_name){
          f7.dialog.alert('Please enter your testname');  
        }
        else if(error_duration!=="" || error_pageconfig!=="" || error_passpercent!=="" ){
          f7.dialog.alert("One or more of your input values is causing an error","Error Creating Test")
        }
        else if(!passPercent){
          f7.dialog.alert('Please enter your pass percentage properly');  
        }
        else if(!pageconfig){
          f7.dialog.alert('Please enter your page config');  
        }
         else if(!date){
          f7.dialog.alert('Please enter your validity date for your test');  
        }
        else if(!duration){
          f7.dialog.alert('Please enter your duration for your test');  
        }

        else if(!iscertificate){
          f7.dialog.alert('Please select your certification either yes or no ');  
        }
        else if(!mainCategory){
          f7.dialog.alert('Please select your main category');  
        }
        else if(mainCategory === "Select"){
          f7.dialog.alert('Please select your main category properly');  
        }
        else if(subCategory === "Select"){
          f7.dialog.alert('Please select your Sub category properly');  
        }

        else if(!subCategory){
          f7.dialog.alert('Please select your sub category');  
        }



        else{

         
    
          let testname_array = new Array();

          axios.get("http://localhost:4000/api/get-tests").then((d)=>{
            //console.log(d)
            let all_test = d.data;
            all_test.map(val=>{
              testname_array.push(val.TestName)
            })
            //console.log(testname_array)
            if(testname_array.includes(test_name)){
              console.log('is there')
              f7.dialog.alert('Test name is already exists.. Please select different test name');  
            }
            else{
              // console.log('testname',test_name)
              // console.log('passpercent',passPercent)
              // console.log('isCerificate',iscertificate)
              // console.log('pageconfig',pageconfig)
              // console.log('date',date)
              // console.log('duration',duration)
              console.log('mainCatgory',mainCategory)
              sessionStorage.setItem("mainCat",JSON.stringify(mainCategory));
              console.log('subCategory',subCategory)
              sessionStorage.setItem("subCat",JSON.stringify(subCategory));
              //console.log('difficulty',difficulty)
              sessionStorage.setItem("testname", JSON.stringify(test_name));
              let testname = test_name;
              let questionlist = [];
              let passpercent = passPercent;
              let IsCertifiable = iscertificate;
              let ValidityDate = date;
              let PageConfig = pageconfig;
              let Duration = duration;
              let Active = false;
      
      
              let data = {
                testname,
                questionlist,
                passpercent,
                IsCertifiable,
                ValidityDate,
                PageConfig,
                Duration,
                Active
              }
              axios.post("http://localhost:4000/api/new_test",data).then((d)=>{
                console.log(d)
                let test_id = d.data._id;
                console.log('Test ID:',test_id)
                sessionStorage.setItem("testid", JSON.stringify(test_id));
                window.location.href = '/select-question'
              }).catch(err=>{
                alert(err)
              })
      
              window.location.href = '/select-question'
      
            }

          }).catch(err=>{
            alert(err)
          })

        }
        // not in use below code
        // console.log('testname',test_name)
        // console.log('passpercent',passPercent)
        // console.log('isCerificate',iscertificate)
        // console.log('pageconfig',pageconfig)
        // console.log('date',date)
        // console.log('duration',duration)
        // console.log('mainCatgory',mainCategory)
        // sessionStorage.setItem("mainCat",JSON.stringify(mainCategory));
        // console.log('subCategory',subCategory)
        // sessionStorage.setItem("subCat",JSON.stringify(subCategory));
        // console.log('difficulty',difficulty)
        // sessionStorage.setItem("testname", JSON.stringify(test_name));
        // let testname = test_name;
        // let questionlist = [];
        // let passpercent = passPercent;
        // let IsCertifiable = iscertificate;
        // let ValidityDate = date;
        // let PageConfig = pageconfig;
        // let Duration = duration;
        // let Active = false;


        // let data = {
        //   testname,
        //   questionlist,
        //   passpercent,
        //   IsCertifiable,
        //   ValidityDate,
        //   PageConfig,
        //   Duration,
        //   Active
        // }
        // // axios.post("http://localhost:4000/api/new_test",data).then((d)=>{
        // //   console.log(d)
        // // }).catch(err=>{
        // //   alert(err)
        // // })

        // //window.location.href = '/select-question'
        // not in use above code
        

      }
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
      // const Create_test = () => {
      //   f7.dialog.alert('Your already in Create Test Page');
      // }
      const Add_question = () => {
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
      }
      // student test
      const All_Test = () => {
        f7.dialog.alert('Your already in all test page');
      }
      const Test_summary = () => {
        //f7.dialog.alert('Page is under development');
        window.location.href='/test-summary'
      }


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

      const isMount = useIsMount();


      useEffect(() => {
        if(!isMount){
        pageconfigErrorHandler();
        }
      }, [pageconfig])
  
      useEffect(() => {
        if(!isMount){
        passpercentageErrorHandler();
        }
      }, [passPercent])
  
      useEffect(() => {
        if(!isMount){
        durationErrorHandler();
        }
      }, [duration])
  


      

let session = (JSON.parse(localStorage.getItem("firebase_email")))
if(session){
  if(role !== "Admin"){
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
            
            <BlockTitle>Your Tests</BlockTitle>
            {/* <form class="searchbar">
              <div class="searchbar-inner">
                <div class="searchbar-input-wrap">
                  <input type="search" placeholder="Search" />
                  <i class="searchbar-icon"></i>
                  <span class="input-clear-button"></span>
                </div>
                <span class="searchbar-disable-button if-not-aurora">Cancel</span>
              </div>
            </form> */}
            {/* <div class="list searchbar-found"> */}
            <div class="data-table card">
                  <table>
                    <thead>
                      <tr>
                        <th class="label-cell" >TestName</th>
                        <th class="numeric-cell">Pass Percentage</th>
                        <th class="numeric-cell">Certifiable</th>
                        <th class="numeric-cell">Duration</th>
                        <th class="numeric-cell">Attempt</th>
                      </tr>
                    </thead>
                    <tbody>

            {alltest.map((test)=>{
            const StudentTest = () => {
                let studenttest_id = test.id;
                console.log('studenttest-id',studenttest_id)
                sessionStorage.setItem("stutest-id", JSON.stringify(studenttest_id));
                window.location.href = '/questions-in-test'
            }
            

            
            return(
                      <tr>
                        <td class="label-cell" >{test.testname}</td>
                        <td class="numeric-cell">{test.passper}</td>
                      
                        <td class="numeric-cell">{test.certificate}</td>
                        <td class="numeric-cell">{test.duration}</td>
                        <td class="numeric-cell"><Button fill color="blue" onClick={StudentTest} >Take Test</Button></td>
                      </tr>
                // <center>
                //     <Card style={{ width:"97%"}}>
                //     <CardContent>
                //         <div className="bg-color-grey" style={{ height: "60%" }}>
                //         <CardHeader textColor="black" className="display-block">
                //             {test.testname}
                //             <br />
                            
                //         </CardHeader>
                    
                //             {/* <div class="page-content"> */}
                //             <div class="row no-gap">
                //               <div class="col">
                //                   <p style={{ color: "black"}}>
                //                 PassPercentage: {test.passper}
                //                 </p>

                              
                //               </div>
                //               <div class="col">
                //                   <p style={{ color: "black"}}>
                //                 Certification : {test.certificate}
                //                 </p>


                //               </div>
                //               <div class="col">
                //                   <p style={{ color: "black"}}>
                //                 Duration(in minutes) : {test.duration}
                //                 </p>


                //               </div>
                //             </div> 
                //             </div>
                    

                //             <Block strong>
                //             <Row>
                //                 <Col>
                //                 <Button fill color="blue" onClick={StudentTest} >Take Test</Button>
                //                 </Col>
                //             </Row>
                //             </Block>
                //         {/* </div> */}
                //         {/* <div>
                //         </div> */}
                //     </CardContent>
                //     </Card>
                //     </center> 
            )

          })

            }
            </tbody>
            </table>
          </div>
          {/* </div> */}


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
          {/* {ret_lis}
          {/*  */}
          {/* <appContext.Provider
          value = { 
            passPercent,iscertificate,pageconfig,date,duration
          }
          >
            <SelectQuestion />
          </appContext.Provider> */}
    <Page id="panel-page">
    <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
      <Page>
        <Block strong>
          <p><br/></p>
          {/* <p>This is page-nested Panel. User</p> */}
          <p>
            <Link onClick={Created_test}>Your Tests</Link>
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

        {/* <NavLeft>
          <Link onClick={Create_test}>Create Test</Link>
        </NavLeft> */}
        <NavRight>
          <Link onClick={Add_question}>Add Questions</Link>
        </NavRight>


    </Navbar>

          <LoginScreenTitle>Create Test</LoginScreenTitle>
          <List form>

            <ListItem>
            <ListInput
              label="Test Name"
              type="text"
              name = "Test_Name"
              placeholder="Test Name"
              value={test_name}
              onInput={(e) => {
                setTestName(e.target.value);
              }}
            />
            </ListItem>

            <ListItem>
            <ListInput
              label="Pass Percent"
              type="number"
              name = "Pass_Percent"
              placeholder="Pass Percent"
              value={passPercent}
              onInput={(e) => {
                setPassPercent(e.target.value);
              }}
            />
             <div style={{fontSize:"80%",marginTop:".25rem",color:"#dc3545",width:"100%"}}>
          
          {error_passpercent?error_passpercent:""}</div>
         
            </ListItem>
          {/* <React.Fragment>
            <div> */}
          <ListItem>
          <ListInput
            label="Is certifiable ?"
            type="select"

            onInput={changecertifiable}> 
                <option>Choose...</option> 
                <option>YES</option> 
                <option>NO</option> 
                
            </ListInput>
            </ListItem>
            {/* </div>
            </React.Fragment>       */}
          <ListItem>
          <ListInput
              label="Page config"
              type="number"
              name = "Page_config"
              placeholder="Number of questions per page"
              value={pageconfig}
              onInput={(e) => {
                setPageConfig(e.target.value);
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
            required
            validate
            value={date}
            min = {today}
            onChange={e => setDate(e.target.value)}
            //clearButton
            />
            </ListItem>


            <ListItem>
          <ListInput
              label="Duration in minutes"
              type="number"
              name = "Duration"
              placeholder="Duration in minutes"
              value={duration}
              onInput={(e) => {
                setDuration(e.target.value);
              }}
            />
            <div style={{fontSize:"80%",marginTop:".25rem",color:"#dc3545",width:"100%"}} >
        
        {error_duration?error_duration:""}
        </div>
        
            </ListItem>
            {/* <React.Fragment>
            
            <div>  */}
              {/** Bind changeSelectOptionHandler to onChange method of select. 
               * This method will trigger every time different 
               * option is selected. 
               */}
          <ListItem>
          <ListInput
            label="Main Category"
            type="select"

            onInput={changeSelectOptionHandler}> 
              { main_options }
            </ListInput>
            </ListItem>
            {/* </div> 
            <div>  */}

            <ListItem>
            <ListInput
            label="Sub Category"
            type="select"

            onInput = {changeSelect_2_OptionHandler}>
              { sub_options }
            </ListInput>
            </ListItem>
            {/* </div> 
            
            </React.Fragment> */}

            <ListItem>
          <ListInput
            label="Difficulty"
            type="select"
            
            placeholder="Please choose difficulty level"
            onInput={e => setDifficulty(e.target.value)}
            >
            <option defaultValue=""  >....</option> 
            <option  value="Beginner"  >Beginner</option>
            <option value="Moderate"  >Moderate</option>
            <option value="Advanced"  >Advanced</option>
        
            
            </ListInput>
            </ListItem>

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
            <ListButton onClick={Add_Test_to_Question} >Add Questions</ListButton>
            {/* <BlockFooter>
                Some text about test Page          
            </BlockFooter> */}
          </List>
        </Page>
      
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


export default test;
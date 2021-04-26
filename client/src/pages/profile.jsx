import React from 'react';
//import '../css/create.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
require('firebase/auth');
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
  BlockFooter, Card,CardContent,CardHeader

} from 'framework7-react';

// const Message = ()=>{
//     return  <h6 style={{color:"green"}}>user Updated successfully</h6>
   
//   }


const Profile = (props) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mong_email,setMong_email] = useState('');
  const [mobile_number, setMobile_number] = useState('');
  const [role_name, setRole_name] = useState('');
  const [dob,setDob]=useState('');
  const[data,setData] = useState('');
  //const [showMessage,setShowMessage]= useState(false);
 //user or admin
 const [role,setRole] = useState("")
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

  useEffect(() => {
    const localAuthUser=JSON.parse(localStorage.getItem("firebase_email"));
    const localUid=JSON.parse(localStorage.getItem("firebase_uid"));

    //let user_email = (JSON.parse(localStorage.getItem("firebase_email")))
    console.log(localAuthUser)
    axios.get(`http://localhost:4000/route/${localAuthUser}`).then((d)=>{
        //console.log(d)
        let role = d.data;
        console.log(role);
        setRole(role);

    }).catch(err=>{
        alert(err)
    })

      console.log(localAuthUser);
      console.log(localUid);
      axios.post(`http://localhost:4000/route/value/${localAuthUser}`)
      
          .then(response => {
              console.log(response.data);

              setData(response.data);
              setFirstname(response.data.firstname);
              setLastname(response.data.lastname);
              setMong_email(response.email);
              setMobile_number(response.data.mobile_number);
              setRole_name(response.data.role_name);
              let dob = (response.data.dob).split("T")[0]
              setDob(dob);
              console.log(response.data.role_name)
          });
  }, [])

  
  const clearState = () => {
      setFirstname('')
      setLastname('')
      //setMong_email('')
      setMobile_number('')
      setRole_name('')
      setDob('')
  }


  const onSubmit = (e) => {
    
    let mobile = mobile_number.toString();
    
    if(!firstname){
      f7.dialog.alert('Please enter your firstname');  
    }
    else if(!lastname){
      f7.dialog.alert('Please enter your lastname');  
    }
    else if(mobile.length !== 10){
      f7.dialog.alert('Please enter your mobile number or it should be 10 digits');  
    }
    else if(!role_name){
      f7.dialog.alert('Please enter your role name');  
    }
     else if(!dob){
        f7.dialog.alert('Please enter your dob');  
      }
    else{

    
    e.preventDefault();
    
      console.log("hii")
      let data = {
          firstname,
          lastname,
          //mong_email,
          mobile_number,
          role_name,
          dob,
      }
      console.log(data)
      updateuser(data);
      f7.dialog.alert('Profile updated successfully',"Updated", ()=>{window.location.href='/select'});
      //window.location.href = '/create-test'
      //clearState();
      //setShowMessage(true);
    }  
  }
  const updateuser = data => {
      console.log('update')
      const localAuthUser=JSON.parse(localStorage.getItem("firebase_email"));
          const pass = "123"
      console.log(localAuthUser);
      axios.put(`http://localhost:4000/route/update/${localAuthUser}/${pass}`, data)
          .then(d => {
              console.log(d);
          })
          .catch(err => alert(err))
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
    //window.location.href = '/edit-profile'
    f7.dialog.alert('Your already in Profile Page');
  }
  const Create_test = () => {
    window.location.href = '/create-test'
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
    window.location.href = '/create-test'
  }
  const Test_summary = () => {
    //f7.dialog.alert('Page is under development');
    window.location.href='/test-summary'
  }

  let session = (JSON.parse(localStorage.getItem("firebase_email")))
  if(session){
    if(role === "Admin"){


  
          return(
            
          
            <Page id="panel-page">
            <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
              <Page>
                <Block strong>
                  <p><br/></p>
                  {/* <p>This is page-nested</p> */}
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

                  
          <List form>
          <LoginScreenTitle>Edit Profile</LoginScreenTitle>
          <ListInput
              label="Firstname"
              type="text"
              placeholder="Firstname"
              name="Firstname"
              info="Default validation"
              required
              validate
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              
            />

            <ListInput
              label="Lastname"
              type="text"
              placeholder="Lastname"
              name="Lastname"
              info="Default validation"
              required
              validate
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              
            />
            {/* <ListInput
              label="Email"
              type="email"
              onValidate={(isValid) => setInputValid(isValid)}
              placeholder="Email"
              info="Default e-mail validation"
              required
              
              name="Email"
              value={email}
              
              onChange={e => setEmail(e.target.value)}
              clearButton
            /> */}
            <ListInput
              label="Mobile_number"
              type="number"
              placeholder="Mobile_number"
              name="Mobile_number"
              max-length="10"
              min-length="10"
              value={mobile_number}
              info="With custom error message"
              errorMessage="Only numbers please!"
              required
              validate
              pattern="[0-9]*"
              onChange={e => setMobile_number(e.target.value)}
              
            />
            <ListInput
            label="Role_name"
            type="select"
            value={role_name}
            placeholder="Please choose..."
            onInput={e => setRole_name(e.target.value)}
            >
            <option defaultValue=""  >....</option> 
            <option  value="Admin"  >Admin</option>
            <option value="User"  >User</option>
          
            
            </ListInput>
            <ListInput
              label="Date of Birth"
              type="date"
              name="dob"
              info="Default validation"
              required
              validate
              value={dob}
              max={today}
              onChange={e => setDob(e.target.value)}
              
            />



            
          </List>
          <List>
            <Button className="col" onClick= {e => {onSubmit(e)}}  fill style={{width:"30%",marginLeft:"30%"}}>save</Button>
          </List>
        </Page>
          )  
        }
        else{
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
      
                  
          <List form>
          <LoginScreenTitle>Edit Profile</LoginScreenTitle>
          <ListInput
              label="Firstname"
              type="text"
              placeholder="Firstname"
              name="Firstname"
              info="Default validation"
              required
              validate
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              
            />

            <ListInput
              label="Lastname"
              type="text"
              placeholder="Lastname"
              name="Lastname"
              info="Default validation"
              required
              validate
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              
            />
            {/* <ListInput
              label="Email"
              type="email"
              onValidate={(isValid) => setInputValid(isValid)}
              placeholder="Email"
              info="Default e-mail validation"
              required
              
              name="Email"
              value={email}
              
              onChange={e => setEmail(e.target.value)}
              clearButton
            /> */}
            <ListInput
              label="Mobile_number"
              type="number"
              placeholder="Mobile_number"
              name="Mobile_number"
              max-length="10"
              min-length="10"
              value={mobile_number}
              info="With custom error message"
              errorMessage="Only numbers please!"
              required
              validate
              pattern="[0-9]*"
              onChange={e => setMobile_number(e.target.value)}
              
            />
            <ListInput
            label="Role_name"
            type="select"
            value={role_name}
            placeholder="Please choose..."
            onInput={e => setRole_name(e.target.value)}
            >
            <option defaultValue=""  >....</option> 
            <option  value="Admin"  >Admin</option>
            <option value="User"  >User</option>
          
            
            </ListInput>
            <ListInput
              label="Date of Birth"
              type="date"
              name="dob"
              info="Default validation"
              required
              validate
              value={dob}
              max={today}
              onChange={e => setDob(e.target.value)}
              
            />



            
          </List>
          <List >
            <Button className="col"  onClick= {e => {onSubmit(e)}}  fill style={{width:"30%",marginLeft:"30%"}}>save</Button>
          </List>
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

}
  
export default Profile;
 
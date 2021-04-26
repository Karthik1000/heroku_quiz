import React from 'react';
//import '../css/create.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
require('firebase/auth');
import axios from "axios";
import { 
  f7,
  Page,
  List,
  ListInput,
  Button,
  ListItem,

} from 'framework7-react';

// const Message = ()=>{
//     return  <h6 style={{color:"green"}}>user Updated successfully</h6>
   
//   }


const Userprofile = (props) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mong_email,setMong_email] = useState('');
  const [mobile_number, setMobile_number] = useState('');
  const [role_name, setRole_name] = useState('');
  const [dob,setDob]=useState('');
  const[data,setData] = useState('');
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
 
  //const [showMessage,setShowMessage]= useState(false);
 
  // useEffect(() => {
  //   const localAuthUser=JSON.parse(localStorage.getItem("firebase_email"));
  //     console.log(localAuthUser);
  //     axios.post(`http://localhost:4000/route/value/${localAuthUser}`)
  //         .then(response => {
  //             console.log(response.data);

  //             setData(response.data);
  //             setFirstname(response.data.firstname);
  //             setLastname(response.data.lastname);
  //             setMong_email(response.mong_email);
  //             setMobile_number(response.data.mobile_number);
  //             setRole_name(response.data.role_name);

              
  //         });
  // }, [])

  const Create_test = () => {
    window.location.href = '/create-test'
  }

  const clearState = () => {
      setFirstname('')
      setLastname('')
      setMong_email('')
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
      f7.dialog.alert('Please enter your DOB');  
     }
    else{

    
    e.preventDefault();
    
      console.log("hii")
      let data = {
          firstname,
          lastname,
          mong_email,
          mobile_number,
          role_name,
         dob,
      }
      console.log(data)
      postuser(data);
      clearState();
      f7.dialog.alert('successfully created profile', "Profile Notification", ()=>{window.location.href='/select'})
      //window.location.href = '/create-test'
      //setShowMessage(true);
    }  
  }
  const postuser = data => {
      console.log('hello world')
      let localAuthUser = "";
      if(JSON.parse(localStorage.getItem("firebase_email"))){
        localAuthUser=JSON.parse(localStorage.getItem("firebase_email"));
      }
      else{
        localAuthUser=JSON.parse(localStorage.getItem("firebase_uid"));
      }
      
      const pass = "123"
      console.log(localAuthUser);
      axios.post(`http://localhost:4000/route/user/${localAuthUser}/${pass}`, data)
          .then(d => {
              console.log(d);
          })
          .catch(err => alert(err))
  }
  
  return(
  
  <Page>
          
  <List form>
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
  <List>
    <Button className="col" onClick= {Create_test}>Go to dashboard</Button>
  </List>

</Page>
  )    
}
  
export default Userprofile;
 
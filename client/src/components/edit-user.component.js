import React from 'react';
import '../css/create.css';
import { useState, useEffect } from 'react';
import axios from "axios";

const Message = ()=>{
    return  <h6 style={{color:"green"}}>user Updated successfully</h6>
   
  }


const Edituser = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('');
  const[data,setData] = useState('');
  const [showMessage,setShowMessage]= useState(false);
 
  useEffect(() => {
      const localAuthUser = JSON.parse(localStorage.getItem("object_id"));
      console.log(localAuthUser);
      axios.get(`http://localhost:4000/users/edit-user/${localAuthUser}`)
          .then(response => {
              console.log(response,"ressssponse");

              setData(response.data);
              setName(response.data.name);
              setEmail(response.data.email);
              setNumber(response.data.number);
              let dob = (response.data.dob).split("T")[0]
              setDob(dob);
          });
  }, [])

  console.log("hello", dob);
  console.log("Name",name);
  const clearState = () => {
      setName('')
      setEmail('')
      setNumber('')
      setDob('')
  }


  const onSubmit = (e) => {
      e.preventDefault();
      console.log("hii")
      let data = {
          name,
          email,
          number,
          dob,
      }
      console.log(data)
      postuser(data);
      clearState();
      setShowMessage(true);
      
  }
  const postuser = data => {
      console.log('hello world')
      const localAuthUser = JSON.parse(localStorage.getItem("object_id"));
      console.log(localAuthUser);
      axios.put(`http://localhost:4000/users/update-user/${localAuthUser}`, data)
          .then(d => {
              console.log(d);
          })
          .catch(err => alert(err))
  }
  const userlist = ()=>{
    window.location.href ="/user-list"
  }
  return (

      <>      
<div className="container cd1">
        <div className="cd2">
          <h3>Edituser</h3>
              <form onSubmit={onSubmit}>
                <div  style={{width :"400px"}} className="form-group">
                    <label >Name: </label>
                        <input  type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            style={{border: "1px solid black"}}
                        />
                    </div>
                <div  style={{width :"400px"}} className="form-group">
                    <label >Email: </label>
                      <input type="email" 
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          className="form-control"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          style={{border: "1px solid black"}}
                      />
                                
                </div>
                <div  style={{width :"400px"}} className="form-group">
                    <label >PhoneNumber: </label>
                        <input type="text"
                              pattern="^[6789]\d{9,9}$"
                              minLength="10"
                              maxLength="10"
                              value={number}
                              onChange={e => setNumber(e.target.value)} 
                              className="form-control"
                              required
                              style={{border: "1px solid black"}}
                        />                                
                </div>
                <div  style={{width :"400px"}} className="form-group">
                  <label>Date Of Birth: </label>
                      <input type="date" 
                            value={dob} 
                            onChange={e => setDob(e.target.value)}
                            className="form-control" 
                            required
                            style={{border: "1px solid black"}}
                    />       
                    </div>
                        { showMessage ? <Message /> : null }     
                    <div>
                         <button type="submit" className="btn btn-success" style={{width :"400px"}} >Update </button>
                    </div><br/><br/>
                    <div>
                         <button  className="btn btn-primary " onClick={userlist} style={{width :"400px"}}> UserList  </button>
                    </div>
                   
              </form>
            </div>
          </div>
            
      </>
  )


}
export default Edituser;
 
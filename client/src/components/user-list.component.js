import React from 'react';
 import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';
import { useState,useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';

const UserList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users/')
        .then(response => setData(response.data));
    console.log("hii",data)

}, [])
  
 let  DataTable=()=>{
        //console.log(data[0].dob,"qwertyuiop")
        console.log(data.length);
        for(var i = 0; i<data.length; i++){
          data[i].dob = (data[i].dob).split("T")[0]
        }
         return data.map((res, i) => {
         return <UserTableRow obj={res} key={i} />;
         });
       }
  const createlist = ()=>{
    window.location.href="/create-user"
  }  
  return(
    <>
    <div className="container" style={{position:"absolute",left:"200px"}}>
      <div className="table-wrapper">
      <Button onClick={createlist}  variant="primary" size="lg" style={{width: "300px"}} >createlist</Button><br/><br/>
      <Table striped bordered hover>
        <thead>
           <tr>
            <th>Name</th>
             <th>Email</th>
             <th>Contact number</th>
             <th>Date of Birth</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
         </thead>
         <tbody>
           {DataTable()}
         </tbody>
       </Table><br/>
      
     </div>
    </div>
    </>
  );

}
export default UserList;
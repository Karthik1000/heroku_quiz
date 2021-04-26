import React from 'react';
 import Table from 'react-bootstrap/Table';
//  import UserTableRow from './UserTableRow';
 import { useState,useEffect } from 'react';
// import axios from "axios";
import { 
    f7,
    Page,
    List,
    ListInput,
    Button,
    ListItem,
  
  } from 'framework7-react';
const TestResult = ()=>{

   let TestName = "Test-1";
   let DifficultLevel = "Hard";
   let Duration = "30min";
   let IsCertificate = "Java";


//    const userlist = ()=>{
//        console.log("hii",data)
//    }
 

    // let  DataTable=()=>{  
    //      return data.map((res, i) => {
    //      return <UserTableRow obj={res} key={i} />;
    //      });
    //    }

    return(
        <page>
            <h1>All Tests</h1>
            <Table striped bordered hover>
        <thead>
           <tr>
            <th>TestName</th>
             <th>DifficultLevel</th>
             <th>Duration</th>
             <th>IsCertificate</th>
            
          </tr>
         </thead>
         <tbody>
           {/* {DataTable()} */}
           <td>{TestName}</td>
           <td>{DifficultLevel}</td>
           <td>{Duration}</td>
           <td>{IsCertificate}</td>
          
         </tbody>
         
       </Table>
        </page>

    )
}
export default TestResult;
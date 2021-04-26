import React from 'react';
// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from "axios";

const UserTableRow = (props) =>{

    const edituser = () => {
        console.log(props.obj._id);
        localStorage.setItem("object_id", JSON.stringify(props.obj._id));
        window.location.href = '/edit-user'
    }
  const  deleteUser = ()=>{
             axios.delete('http://localhost:4000/users/delete-user/'+ props.obj._id)
             .then((res) =>{
                 console.log('User successfully deleted!')
             }).catch((error) =>{
                 console.log(error)
             })   
         }

    return(
        <>
        <tr>
                 <td>{props.obj.name}</td>
                 <td>{props.obj.email}</td>
                 <td>{props.obj.number}</td>
                 <td>{props.obj.dob}</td>
                 <td>
                 <Button onClick={edituser} size="sm" variant="success">Edit</Button>
                 </td>
                 <td>
                    <Button onClick={deleteUser} size="sm" variant="danger">Delete</Button>
                 </td>
             </tr>
        </>
    )

}
export default UserTableRow
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';

function Home() {

    const [users, setUsers] = React.useState([]);

    const {id} =useParams();

    useEffect(()=>{
        loadUsers();
    },[]);  

    const loadUsers=async()=>{
        const result=await axios.get("http://localhost:7890/users")
        setUsers(result.data)
        console.log("In useEffect")
    }

    const deleteUser = async (id)=>{
        await axios.delete(`http://localhost:7890/user/${id}`)
        loadUsers()
    }
    
    return (
    <div className='container'>
        <div className='py-4'>

        <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>

                {
                    users.map((user,index)=>(
                        <tr>
                            <th scope="row" key={index}>{index+1}</th>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email }</td>
                            <td>
                                <Link className='btn btn-primary mx-2' to={`/viewUser/${user.id}`}>View</Link> 

                                <Link type='button' className='btn btn-outline-primary mx-2' to={`/editUser/${user.id}`}>Edit</Link>

                                <button type='button' className='btn btn-success mx-2' onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }   
                
            </tbody>
        </table>

        </div>
    </div>
  )
}

export default Home
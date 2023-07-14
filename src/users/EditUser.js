import React from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useState, useEffect} from 'react';
import axios from 'axios';

function EditUser() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [user, setUser] = useState({
        username: "",
        passwsord: "",
        email: "",
      });

    const {username,password,email}=user;

    const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

    useEffect(()=>{
        loadUser();
    } ,[]);

    const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:7890/user/${id}`, user);
    navigate("/");
    };

    const loadUser = async()=>{
        const result=await axios.get(`http://localhost:7890/user/${id}`)
        setUser(result.data);
    }

  return (

    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>

                <h2 className="text-center m-4">Edit User</h2>

                <form onSubmit={(e) => onSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input type={"text"} className="form-control" placeholder="Enter your Username" name="username" value={username} onChange={(e) => onInputChange(e)}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type={"text"} className="form-control" placeholder="Enter password" name="password" value={password} onChange={(e) => onInputChange(e)}/>
                    </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label"> E-mail</label>
                    <input type={"text"} className="form-control" placeholder="Enter your e-mail address" name="email" value={email} onChange={(e) => onInputChange(e)}/>
                </div>

                <button type="submit" className="btn btn-outline-primary"> Submit</button>

                <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>

                </form>
            </div>
        </div>
    </div>
  )
}

export default EditUser
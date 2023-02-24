import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/api/users/${email}`)
        .then((res) => {
            // console.log(res.data.toString());
            bcrypt
                .compare(password, res.data.password)
                .then((res) => {
                console.log(res) // return true
                {res === true ? navigate("/success") : resetForm()}
                })
                .catch((err) => {
                    console.error(err.message)
                }) 
        })
        .catch(err => console.error(err));

        const resetForm = () => {
            setErrors("Username or Password is incorrect"); 
            setEmail(""); 
            setPassword("");
        }
    }


  return (
    <div className="col-6">
    <form action="/login" className="bg-dark mx-auto text-light p-5 rounded mt-5" style={{width:30 + 'em'}} onSubmit={handleLogin}>
        <div className="form-row">
            <div className="form-group col-12">
                <h2 className="text-success">Login</h2>
            </div>
        </div>
        <div className="form-row mt-3">
                {errors ? <span className="text-danger">{errors}</span> : null}
            <div className="form-group col-12">
                <label>Email:</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" value={email} />
            </div>
        </div>
        <div className="form-row mt-3">
            <div className="form-group col-12">
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" value={password} />
            </div>
        </div>
        <button className="btn btn-success mt-4">Login</button>
    </form>
</div>
  )
}

export default Login
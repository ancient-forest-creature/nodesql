import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';


const Signup = () => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw, setConfirmpw] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        bcrypt
            .hash(password, 10)
            .then(hash => {
                console.log('Hashed salted ', hash);
                axios.post("http://localhost:8000/api/users", {first_name:first_name, last_name:last_name, email:email, password:hash})
                  .then((res) => {
                    console.log('in axios post, res data is: ', res.data);
                    navigate("/success");
                  })
                  .catch((err) => {
                    console.log(`2nd err is: ${err}`);
                    // setErrors(err.response.data.errors);
                  });
              })
              .catch(err => console.error(err.message))
      };

    const validator = () => {

    }
    
  return (
    <div className="col-6">
        <form className="bg-dark mx-auto text-light p-5 rounded mt-5" style={{width:30 +'em'}} onSubmit={submitHandler}>
            <div className="form-row">
                <div className="form-group col-12">
                    <h2 className="text-primary">Register</h2>
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="form-group col-12">
                    <label>First Name:</label>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} name="first_name" className="form-control" value={first_name}/>
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="form-group col-12">
                    <label>Last Name:</label>
                    <input type="text" onChange={(e) => setLastName(e.target.value)} name="last_name" className="form-control" value={last_name}/>
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="form-group col-12">
                    <label>Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" className="form-control" value={email}/>
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="form-group col-12">
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" value={password}/>
                </div>
            </div>
            <div className="form-row mt-3">
                <div className="form-group col-12">
                    <label>Confirm Password:</label>
                    <input type="password" onChange={(e) => setConfirmpw(e.target.value)} name="confirm" className="form-control" value={confirmpw}/>
                </div>
            </div>                                        
            <button className="btn btn-primary mt-4">Register</button>
        </form>
    </div>
  )
}

export default Signup
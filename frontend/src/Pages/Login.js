import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "../utils";

function Login() {

    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...LoginInfo,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;
        if ( !email || !password) {
            return handleError('All fields are required');
        }
        try {
            const url = 'http://localhost:8080/shreyapp/login';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            const data = await res.json();
            const {success , message , jwtToke, name , error } = data;
            if(success){
                handleSuccess(message);
                localStorage.setItem('jwtToke',jwtToke);
                localStorage.setItem('LoggedinUser',name);
            setTimeout(()=>{
                navigate('/register')
            },1000)
        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name="email"
                        placeholder="Enter your Email"
                        value={LoginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name="password"
                        placeholder="Enter your Password"
                        value={LoginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
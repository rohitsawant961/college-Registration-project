import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "../utils";

function RegistrationForm() {
    const [registerInfo, setRegisterInfo] = useState({
        Marks: '',
        Percentile: '',
        Cast: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterInfo({
            ...registerInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Marks, Percentile, Cast } = registerInfo;
        if (!Marks || !Percentile || !Cast) {
            return handleError('All fields are required');
        }
        try {
            const url = 'http://localhost:8080/shreyapp/register';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerInfo)
            });
            localStorage.setItem('Marks', registerInfo.Marks);
            localStorage.setItem('Percentile', registerInfo.Percentile);
            localStorage.setItem('Cast', registerInfo.Cast);
            const data = await res.json();
            const { success, message, error } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Marks">Marks</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name="Marks"
                        placeholder="Enter your Marks"
                        value={registerInfo.Marks}
                        
                    />
                </div>
                <div>
                    <label htmlFor="Percentile">Percentile</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name="Percentile"
                        placeholder="Enter your Percentile"
                        value={registerInfo.Percentile}
                    />
                </div>
                <div>
                    <label htmlFor="Cast">Cast</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name="Cast"
                        placeholder="Enter your Cast"
                        value={registerInfo.Cast}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default RegistrationForm;

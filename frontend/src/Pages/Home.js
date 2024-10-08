import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';


function Home() {
    const [LoggedinUser, setloggedinUser] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        setloggedinUser(localStorage.getItem('LoggedinUser'))
    })

    const is_eligible= (e) => {
        // Convert string values to numbers before comparison
        const marks = parseInt(localStorage.getItem('Marks'), 10);
        const percentile = parseInt(localStorage.getItem('Percentile'), 10);

        if (marks > 80 && percentile > 65) {
            return <h1>Is Eligible</h1>; // Use return to render JSX
        } else {
            return <h2>Is not Eligible</h2>; // Use return to render JSX
        }
        // localStorage.clear(); // Consider moving this based on your logic
    }
    return (
        <div>
            <h1>{LoggedinUser}</h1>
            {is_eligible()} 
            <ToastContainer />
        </div>
    )
}

export default Home

import React from 'react'
import './Error.css'
export default function Unauthorize(){
    return(
        <div className="error">
            <h1>Unauthorized access</h1>
            <p>Please go back <a href="/">click here</a></p>
        </div>
    )
}
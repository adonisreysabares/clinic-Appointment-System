import React, { useState } from 'react'
import Input from '../components/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Logo from '../assets/logo.png'
import './Form.css'

export default function Login() {
    const apiURL = "http://localhost:8080/authentication/login"
    const {login} = useAuth()
    const [isClicked,setClicked] = useState('password')
    const [auth, setAuth] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        
        
        if (!auth.email || !auth.password) {
            alert('Please enter both username and password.') 
            return 
        }
    
        try {
            const response = await axios.post(apiURL, auth, { withCredentials: true })
            console.log(response.data)
            login(response.data)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            alert('An error occurred while logging in. Please try again.') 
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setAuth({ ...auth, [name]: value })
    }

    const visiblePassword = (e) =>{
        setClicked((prev) => prev ? 'text' : 'password')
    }

    return (
        <div className="form-container">
            <h1 className='logo'><img src={Logo} alt="Logo Here" />ODECOR</h1>
            <form onSubmit={onSubmit}>
                <Input
                    name="email"
                    label="Username"
                    text='text'
                    onChange={handleChange}
                    placeholder='Username'
                />
                <Input
                    onClick={visiblePassword}
                    name="password"
                    label="Password"
                    text="password" // Specify 'password' to show the toggle button
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

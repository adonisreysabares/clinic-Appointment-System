import React, { useState,useContext } from 'react'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Logo from '../assets/logo.png'
import './Form.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await login(username,password)
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="form-container">
            <h1 className='logo'><img src={Logo} alt="Logo Here" />ODECOR</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    label="Username"
                    text='text'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    value={username}
                />
                <Input
                    name="password"
                    label="Password"
                    text="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

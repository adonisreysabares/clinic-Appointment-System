import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authentication/AuthContext';
import Logo from '../assets/logo.png'
import './Admin.css'

export default function AdminNav({ setActiveSection }) {
    const {logout} = useContext(AuthContext)

    const handleLogout = async () =>{
        await logout()
    }

    return (
        <nav className='topNav'>
            <h1 className='logo'><img src={Logo} alt="Logo Here" />ODECOR</h1>
            <div className='profiler-container'>
                <img className='Profile' src='https://i.imgur.com/CnGwN4Y.jpeg'/>
                <p className='profiler-name'>Admin</p>
            </div>
            <ul className='listContent'>
                <li className='nav-item'>
                    <Link to="#" onClick={() => setActiveSection('dashboard')}>Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link to="#" onClick={() => setActiveSection('appointment')}>Appointment</Link>
                </li>
                <li className='nav-item'>
                    <Link to="#" onClick={() => setActiveSection('user')}>User</Link>
                </li>
                <li className='nav-item'>
                    <button className='logout' onClick={handleLogout}>Logout</button>

                </li>
            </ul>
        </nav>
    );
}
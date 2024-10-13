import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'
import './Admin.css'

export default function AdminNav({ setActiveSection }) {
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
            </ul>
        </nav>
    );
}
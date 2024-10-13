import React from 'react'
import Logo from '../assets/logo.png'
import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
        <nav className="top-nav">
            <div className="logo"><img src={Logo} alt="" />ODECOR</div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/book">Book</Link>
                </li>
                <li>
                    <Link to="/service">Service</Link>
                </li>
                <li>
                    <Link to="contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}
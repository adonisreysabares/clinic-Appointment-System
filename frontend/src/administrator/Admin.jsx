import React, { useState } from 'react'
import NavBar from './Navbar'
import Dashboard from './Dashboard';
import Appointment from './Appointment';
import User from './User'
import './Admin.css'

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'appointment':
                return <Appointment />;
            case 'user':
                return <User />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <section className='dashboard'>
            
            <NavBar setActiveSection={setActiveSection} />
            <div className='overview'>
               <div className="overview-container">
                    {renderSection()}
                </div> 
            </div>
        </section>
    );
}

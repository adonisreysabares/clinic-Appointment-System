import React, { useEffect, useState } from 'react'
import AppointmentCard from '../components/Card'
import './Admin.css'
import axios from 'axios';
export default function Dashboard(){
    const [total,setTotal] = useState()
    const [error, setError] = useState()
    const [latest,setLatest] = useState()
    const [loading,setLoading] = useState()
    const myData = [{
        icon: 'http://localhost:5173/src/assets/calendar.png',
        title: 'Total Appointments',
        data: total,
      },{
        icon: 'http://localhost:5173/src/assets/upcoming.png',
        title: 'Scheduled Appointment',
        data: latest,
      },{
        icon: 'http://localhost:5173/src/assets/patient.png',
        title: 'My Card Title3',
        data: 'This is the card data3.',
      },
    ];


    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const response = await axios.get(`http://localhost:8080/appointments/list`);
                const appointments = response.data;
                setTotal(appointments.length);

                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

                const recentAppointments = appointments.filter(appointment => {
                    const appointmentDate = new Date(appointment.appointment_time);
                    return appointmentDate >= yesterday && appointmentDate <= now;
                });

                const latestAppointment = recentAppointments.reduce((latest, current) => {
                    const currentDate = new Date(current.appointment_time);
                    return currentDate > latest ? current : latest;
                }, new Date(0)); 

                latestAppointment.appointment_time ? setLatest(latestAppointment): setLatest("No appointments in the last 24 hours.");

            } catch (error) {
                setError(error.message)
            } finally{
                setLoading(false)
            }
        }

        fetchData()
    },[])

    if (loading) return <p>Loading...</p>;
    return(
        <>
            <h2>Dashboard Overview</h2>
            <div className='card-container'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && myData.map((data) => (
                    <AppointmentCard key={Math.random()} icon={data.icon} title={data.title} data={data.data} />
                ))}
            </div>
        </>

    )
}

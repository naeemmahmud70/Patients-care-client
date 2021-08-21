import React, { useEffect, useState } from 'react';
import AppointmentByDate from './AppointmentByDate/AppointmentByDate';
import Sidebar from './Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    console.log(appointments)

    const handleDateChange = date => {
        setSelectedDate(date);
        fetch('http://localhost:5000/appointmentsByDate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date })
        })
            .then(res => res.json())
            .then(data => {
                setAppointments(data)
            })
    }

    // useEffect(() => {

    // }, [selectedDate])

    return (
        <div>
            <div className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-5 col-sm-12 col-12 d-flex justify-content-center">

                    <Calendar
                        onChange={handleDateChange}
                        value={new Date()}
                    />
                </div>
                <div className="col-md-5">
                    <AppointmentByDate appointments={appointments}></AppointmentByDate>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
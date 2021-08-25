import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentByDate from '../AppointmentByDate/AppointmentByDate';


const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    useEffect(() => {
        fetch('https://limitless-crag-84661.herokuapp.com/appointmentsByDate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: selectedDate })
        })
            .then(res => res.json())
            .then(data => {
                setAppointments(data)
            })
    }, [selectedDate])

    return (
        <div style={{ backgroundColor: "#F4FDFB", height: "100vh" }}>
            <div className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-4 col-sm-12 col-12 d-flex justify-content-center">

                    <Calendar
                        onChange={handleDateChange}
                        value={new Date()}
                    />
                </div>
                <div className="col-md-6">
                    <AppointmentByDate appointments={appointments}></AppointmentByDate>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
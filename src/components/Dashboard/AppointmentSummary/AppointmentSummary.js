import React, { useEffect, useState } from 'react';

const AppointmentSummary = ({ IsStatusUpdate }) => {
    const [todaysDate, setTodaysDate] = useState(new Date());
    const [todaysAppointment, setTodaysAppointment] = useState([])
    const [pendingAppointment, setPendingAppointment] = useState([]);
    const [totalAppointment, setTotalAppointment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/todaysAppointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: todaysDate.toDateString() })
        })
            .then(res => res.json())
            .then(data => {
                setTodaysAppointment(data)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/pendingAppointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: "Pending" })
        })
            .then(res => res.json())
            .then(data => {
                setPendingAppointment(data)
            })
    }, [IsStatusUpdate])

    useEffect(() => {
        fetch('http://localhost:5000/appointments')
            .then(res => res.json())
            .then(data => setTotalAppointment(data))
    }, []);

    return (
        <div>
            <h1>this is todays appointment: {todaysAppointment.length}</h1>
            <h1>this is pending Appointment: {pendingAppointment.length}</h1>
            <h1>this is total appointment: {totalAppointment.length}</h1>
        </div>
    );
};

export default AppointmentSummary;
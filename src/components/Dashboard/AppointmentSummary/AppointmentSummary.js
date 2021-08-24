import React, { useEffect, useState } from 'react';
import './AppointmentSummary.css'
const AppointmentSummary = ({ IsStatusUpdate, isDeleted }) => {
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
    }, [IsStatusUpdate, isDeleted])

    useEffect(() => {
        fetch('http://localhost:5000/appointments')
            .then(res => res.json())
            .then(data => setTotalAppointment(data))
    }, [isDeleted]);

    return (
        <div className="d-flex justify-content-center mb-4">
            <div className="summary-div-style">
                <h4>Pending Appointments: {pendingAppointment.length}</h4>
            </div>
            <div className="summary-div-style">
                <h4>Todays Appointment: {todaysAppointment.length}</h4>
            </div>
            <div className="summary-div-style">
                <h4>Total Appointment: {totalAppointment.length}</h4>
            </div>
        </div>
    );
};

export default AppointmentSummary;
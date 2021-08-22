import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import AllPatientsTable from './AllPatientstable/AllPatientsTable';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AppointmentSummary from '../AppointmentSummary/AppointmentSummary';

const AllPatients = () => {
    const [appointments, setAppointments] = useState([]);
    const [IsStatusUpdate, setStatusUpdate] = useState(false);
    const [isDeleted, setDeleted] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [IsStatusUpdate, isDeleted]);

    const handleUpdate = (id, appointmentStatus) => {
        setStatusUpdate(true)
        console.log(id, appointmentStatus)
        axios.patch(`http://localhost:5000/updateStatus/${id}`, { status: appointmentStatus })
            .then(res => {
                res.data.modifiedCount && setStatusUpdate(false)
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleDelete = id => {
        setDeleted(true)
        console.log(id)
        fetch(`http://localhost:5000/deleteAppointment/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    swal("Appointment Canceled!", "success")
                    setDeleted(false)
                }

            });
    };

    return (
        <div className="row" style={{ backgroundColor: "#F4FDFB" }}>
            <div className="col-md-2" >
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10" >
                <div className="p-5">
                    <AppointmentSummary IsStatusUpdate={IsStatusUpdate}></AppointmentSummary>
                    <h5 className="text-brand">All Patients</h5>
                    <AllPatientsTable appointments={appointments} key={appointments._id} handleUpdate={handleUpdate} handleDelete={handleDelete}></AllPatientsTable>
                </div>
            </div>
        </div>
    );
};

export default AllPatients;
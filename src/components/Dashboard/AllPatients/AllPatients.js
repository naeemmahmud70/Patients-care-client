import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import AllPatientsTable from './AllPatientstable/AllPatientsTable';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AppointmentSummary from '../AppointmentSummary/AppointmentSummary';


const AllPatients = () => {

    const [appointments, setAppointments] = useState([]);
    const [IsStatusUpdate, setStatusUpdate] = useState(false);
    const [isDeleted, setDeleted] = useState(false);

    useEffect(() => {
        fetch('https://limitless-crag-84661.herokuapp.com/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [IsStatusUpdate, isDeleted]);


    const handleUpdate = (id, appointmentStatus) => {
        setStatusUpdate(true)

        axios.patch(`https://limitless-crag-84661.herokuapp.com/updateStatus/${id}`, { status: appointmentStatus })
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
        fetch(`https://limitless-crag-84661.herokuapp.com/deleteAppointment/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    swal("Appointment Canceled!", "success")
                }
                setDeleted(false)

            });
    };

    return (
        <div className="row" style={{ backgroundColor: "#F4FDFB", height: "100vh" }}>
            <div className="col-md-2" >
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10" >
                <div className="p-5">
                    <AppointmentSummary IsStatusUpdate={IsStatusUpdate} isDeleted={isDeleted}></AppointmentSummary>
                    <h5 className="text-brand">All Patients</h5>
                    <AllPatientsTable appointments={appointments} key={appointments._id} handleUpdate={handleUpdate} handleDelete={handleDelete}></AllPatientsTable>
                </div>
            </div>
        </div>
    );
};

export default AllPatients;
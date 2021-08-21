import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import AllPatientsTable from './AllPatientstable/AllPatientsTable';

const AllPatients = () => {
    const [appointments, setAppointments] = useState([]);
    console.log(appointments)
    useEffect(() => {
        fetch('http://localhost:5000/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [])
    return (
        <div className="row" style={{ backgroundColor: "#F4FDFB" }}>
            <div className="col-md-2" >
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10" >
                <div className="p-5">
                    <h5 className="text-brand">All Patients</h5>
                    <AllPatientsTable appointments={appointments} key={appointments._id}></AllPatientsTable>
                </div>
            </div>
        </div>
    );
};

export default AllPatients;
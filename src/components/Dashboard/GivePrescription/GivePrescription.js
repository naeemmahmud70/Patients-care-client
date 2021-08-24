import React, { useState } from 'react';
import PrescriptionModal from '../PrescriptionModal/PrescriptionModal';

const GivePrescription = ({ appointments }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [patient, setPatient] = useState({});
    const [patientId, setPatientId] = useState(null);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const handleGetPatient = appointment => {

        const patientDetails = {
            name: appointment.name,
            email: appointment.email,
            age: appointment.appointment.age,
            gender: appointment.appointment.gender,
            appointmentDate: appointment.appointmentDate,
            todaysDate: appointment.todaysDate,
            appointmentOn: appointment.appointmentOn,
            id: appointment._id
        }
        setPatient(patientDetails)
    }

    const handleGetId = id => {
        setPatientId(id)
    }

    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Phone</th>
                    <th className="text-secondary" scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map((appointment, index) =>

                        <tr>
                            <td>{appointment.appointment.name}</td>
                            <td>{appointment.appointment.email}</td>
                            <td><button className="btn-brand" onClick={() => { openModal(); handleGetPatient(appointment); handleGetId(appointment._id) }} >Prescription</button></td>
                            <PrescriptionModal modalIsOpen={modalIsOpen} closeModal={closeModal} patient={patient} id={patientId}></PrescriptionModal>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default GivePrescription;
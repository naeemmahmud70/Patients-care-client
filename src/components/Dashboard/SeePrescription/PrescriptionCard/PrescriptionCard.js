import React from 'react';
import icon from '../../../../images/dentistry.png'
import './PrescriptionCard.css'

const PrescriptionCard = ({ prescription }) => {
    console.log(prescription);
    return (
        <section className=" bg-light container-fluid prescription-card">
            <div className="w-100">
                <div className="d-flex justify-content-between prescription-bg p-5">
                    <div className="">
                        <h1 className="fw-bold">Patients Care</h1>
                        <h3>Dr. Richard (BDS, DAND, MS, DDS)</h3>
                        <h5>Professor And Head</h5>
                        <h5>Oral And Maxillofacial Surgery</h5>
                        <h5>New Jersey, Europe</h5>
                        <h5>Phone: +5643-2343545</h5>
                    </div>
                    <div className="ml-5">
                        <img className="w-50" src={icon} alt="" />
                    </div>
                </div>
                <div className="row bg-light">
                    <div className="col-md-6 p-5">
                        <h5>Name: {prescription.appointment.name}</h5>
                        <h5>Age: {prescription.appointment.age}</h5>

                    </div>
                    <div className="col-md-6 p-5">
                        <h5>Gender: {prescription.appointment.gender}</h5>
                        <h5>Date: {prescription.todaysDate}</h5>
                    </div>
                    <hr />
                    <h1>{prescription.prescription}</h1>
                </div>
            </div>
        </section>
    );
};

export default PrescriptionCard;
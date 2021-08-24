import React from 'react';
import GivePrescription from '../GivePrescription/GivePrescription';

const AppointmentByDate = ({ appointments }) => {
    return (
        <div>
            <h2 className="text-brand text-center">Appointments</h2>
            {
                appointments.length ?
                    <GivePrescription appointments={appointments} key={appointments._id} ></GivePrescription>
                    :
                    <div className="p-5">
                        <h4 className="lead text-center">No Appointments for this Date</h4>
                    </div>
            }
        </div>
    );
};

export default AppointmentByDate;
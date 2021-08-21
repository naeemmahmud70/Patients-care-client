import React from 'react';

const AppointmentByDate = ({ appointments }) => {
    return (
        <div>
            <h1>Date: {appointments.length}</h1>
        </div>
    );
};

export default AppointmentByDate;
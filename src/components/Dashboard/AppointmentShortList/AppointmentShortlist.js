import React from 'react';

const AppointmentShortlist = ({appointments}) => {
    console.log(appointments)
    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Phone</th>
                    <th className="text-secondary" scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map((appointment, index) =>

                        <tr>
                            <td>{appointment.appointment.name}</td>
                            <td>{appointment.appointment.phone}</td>
                            <td>{appointment.appointment.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default AppointmentShortlist;
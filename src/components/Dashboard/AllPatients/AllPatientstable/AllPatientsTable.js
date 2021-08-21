import React from 'react';

const AllPatientsTable = ({ appointments }) => {

    return (
        <table className="table table-borderless ">
            <thead>
                <tr>
                    <th className="text-secondary text-left" scope="col">Sr No</th>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Gender</th>
                    <th className="text-secondary" scope="col">Age</th>
                    <th className="text-secondary" scope="col">Weight</th>
                    <th className="text-secondary" scope="col">Phone</th>
                    <th className="text-secondary" scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map((appointment, index) =>

                        <tr>
                            <td>{index + 1}</td>
                            <td>{appointment.appointment.name}</td>
                            <td>{appointment.appointment.gender}</td>
                            <td>{appointment.appointment.age}</td>
                            <td>{appointment.appointment.weight}KG</td>
                            <td>{appointment.appointment.phone}</td>
                            <td>{appointment.appointment.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default AllPatientsTable;
import React from 'react';
import './AllPatientsTable.css'

const AllPatientsTable = ({ appointments, handleUpdate, handleDelete }) => {

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
                    <th className="text-secondary" scope="col">Status</th>
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
                            <td>
                                <div class="dropdown">
                                    <button class="drop-down-btn dropdown-toggle fw-bold" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                        {appointment.appointmentStatus}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li><button onClick={() => handleUpdate(appointment._id, 'Pending')} class="dropdown-item selection-option" type="button">Pending</button></li>
                                        <li><button onClick={() => handleUpdate(appointment._id, 'Viewed')} class="dropdown-item selection-option" type="button">Viewed</button></li>
                                        <li><button onClick={() => handleDelete(appointment._id)} class="dropdown-item selection-option" type="button">Cancel</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default AllPatientsTable;
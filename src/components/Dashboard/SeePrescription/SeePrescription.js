import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

import PrescriptionCard from './PrescriptionCard/PrescriptionCard';


const SeePrescription = () => {
    const [prescriptions, setPrescription] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // ?email=' + loggedInUser.email
    useEffect(() => {
        fetch('http://localhost:5000/yourPrescription?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setPrescription(data))
    }, [loggedInUser]);

    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                {
                    prescriptions.map(prescription => <PrescriptionCard prescription={prescription} key={prescription._id}></PrescriptionCard>)
                }
            </div>
        </div>
    );
};

export default SeePrescription;
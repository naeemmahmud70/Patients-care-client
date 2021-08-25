import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

import PrescriptionCard from './PrescriptionCard/PrescriptionCard';


const SeePrescription = () => {
    const [prescriptions, setPrescription] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://limitless-crag-84661.herokuapp.com/yourPrescription?email=' + loggedInUser.email)
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
import React, { useContext } from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import { toast } from 'react-toastify';
import swal from 'sweetalert';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

const AppointmentForm = ({ modalIsOpen, closeModal, appointmentOn, date }) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = data => {
        const todaysDate = new Date()
        const appointmentDetails = {
            appointment: data,
            appointmentStatus: 'Pending',
            appointmentDate: date,
            appointmentOn: appointmentOn,
            prescription: '',
            todaysDate: todaysDate.toDateString(),
            ...loggedInUser
        };

        const url = `http://localhost:5000/addAppointment`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointmentDetails)
        })
            .then(res => {
                console.log(res)
                if (res) {
                    swal("Appointment Done!", "Your appointment submitted successfully!", "success")
                }
                closeModal()
                reset();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 className="text-brand text-center">{appointmentOn}</h2>
                <p className="text-secondary text-center "><small>On {date.toDateString()}</small></p>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <input type="text" ref={register} defaultValue={loggedInUser.name} name="name" placeholder="Your Name" className="form-control" />
                        {errors.name && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <input type="text" ref={register} name="phone" placeholder="Phone Number" className="form-control" />
                        {errors.phone && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" ref={register} defaultValue={loggedInUser.email} name="email" placeholder="Email" className="form-control" />
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group row">
                        <div className="col-4">

                            <select className="form-control" name="gender" ref={register} >
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}

                        </div>
                        <div className="col-4">
                            <input ref={register} className="form-control" name="age" placeholder="Your Age" type="number" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input ref={register} className="form-control" name="weight" placeholder="Weight" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>

                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-brand">Send</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AppointmentForm;
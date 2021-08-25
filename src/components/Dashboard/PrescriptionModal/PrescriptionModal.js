import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
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

const PrescriptionModal = ({ modalIsOpen, closeModal, patient, id }) => {

    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {

        axios.patch(`https://limitless-crag-84661.herokuapp.com/prescription/${id}`, { prescription: data.prescription })
            .then(res => {
                // res.data.modifiedCount && setStatusUpdate(false)
                swal("Prescription Given!", "Prescription will see in the dashboard!", "success")
                reset();
                closeModal();
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
                <div className="text-center prescription-bg p-2">
                    <h1 className="fw-bold">Patients Care</h1>
                    <h3>Dr. Richard (BDS, DAND, MS, DDS)</h3>
                    <h5>Professor And Head</h5>
                    <h5>Oral And Maxillofacial Surgery</h5>
                    <h5>New Jersey, Europe</h5>
                    <h5>Phone: +5643-2343545</h5>
                </div>
                <div className="row m-1 bg-light">
                    <div className="col-md-6">
                        <h5>Name: {patient.name}</h5>
                        <h5>Age: {patient.age}</h5>

                    </div>
                    <div className="col-md-6">
                        <h5>Gender: {patient.gender}</h5>
                        <h5>Date: {patient.todaysDate}</h5>
                    </div>
                </div>
                <h1>R<small>x</small></h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <textarea name="prescription" className="form-control" placeholder="Prescribed here" cols="35" rows="10" ref={register}></textarea>
                        {errors.prescription && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input className="btn-brand" type="submit" />
                    </div>

                </form>
            </Modal>
        </div>
    );
};

export default PrescriptionModal;
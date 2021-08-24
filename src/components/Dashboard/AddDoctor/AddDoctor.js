import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from 'react-hook-form';
import './AddDoctor.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import swal from 'sweetalert';




const AddDoctor = () => {

    const { register, handleSubmit, reset } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', 'c27cdbd7f672caa5d177ddecda022824');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                toast.error(error.message);
            });
    }

    const onSubmit = data => {

        const adminData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            imageURL: imageURL
        }
        console.log(adminData)

        const url = `http://localhost:5000/addDoctor`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminData)
        })
            .then(res => {
                if (res.status) {
                    swal("Done!", "One new doctor added successfully!", "success")
                }
                setImageURL(null);
                reset();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div style={{ backgroundColor: "#F4FDFB", height:"100vh" }} className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                <div className="bg-light">
                    <h2 className="fw-bold p-2">Post Blog</h2>
                    <hr />
                </div>
                <div className="shadow m-5 p-5 rounded">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group col-md-5 col-sm-12">
                            <input type="text" ref={register} name="name" placeholder="Doctor Name" className="form-control" />
                        </div>
                        <div className="form-group col-md-5 col-sm-12">
                            <input type="text" ref={register} name="email" placeholder="Doctor Email" className="form-control" />
                        </div>
                        <div className="form-group col-md-5 col-sm-12">
                            <input type="text" ref={register} name="phone" placeholder="Doctor Phone number" className="form-control" />
                        </div>
                        <div className="form-group px-3">
                            <label htmlFor="upload" className="image-upload-button fw-bold">Upload Image <FontAwesomeIcon icon={faCloudUploadAlt} /></label>
                            <input id="upload" hidden="hidden" className="form control" type="file" onChange={handleImageUpload} />
                        </div>
                        <div className="form-group px-3">
                            {imageURL ? <input className="submit-button" type="submit" /> : <input value="Submit" className="disable-button" />}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
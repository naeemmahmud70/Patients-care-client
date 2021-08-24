import React, { useContext } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import defaultUser from '../../../images/default-user.png'
import toast from 'react-hot-toast';
import swal from 'sweetalert';


const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)

    const isSignOut = () => {
        const token = sessionStorage.removeItem('token');
        if (!token) {
            return false;
        }
        const decodedToken = jwt_decode(token);
        // get current time
        const currentTime = new Date().getTime() / 1000;
        // compare the expiration time with the current time
        // will return false if expired and will return true if not expired
        return decodedToken.exp > currentTime;
    }

    const handleLogOut = () => {
        console.log('clicked')
        firebase.auth().signOut()
            .then(() => {
                isSignOut()
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setLoggedInUser(signOutUser);
                swal({
                    title: "Log Out Successfully!",
                    icon: "success",
                });

            }).catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div style={{ backgroundColor: "#F4FDFB", height:"100vh" }} className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                <div className="bg-light p-1">
                    <h2 className="fw-bold text-brand">Your Profile</h2>
                    <h5>Dear {loggedInUser.name}, Welcome to Patients Care!</h5>
                    <hr />
                </div>

                <div className="text-center shadow m-5  p-5 rounded profile-bg w-50">
                    <img className="rounded-circle w-25" src={loggedInUser.photo} alt="" />
                    {
                        !loggedInUser.photo && <div><img className="w-25" src={defaultUser} alt="" /></div>

                    }
                    <h3 className="fw-bold p-2">{loggedInUser.name}</h3>
                    <Link onClick={handleLogOut} to="/"> <button className="fw-bold submit-button ">LogOut <FontAwesomeIcon className="text-white" icon={faSignOutAlt} /></button></Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
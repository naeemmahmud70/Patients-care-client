import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../FirebaseConfig/FirebaseConfig';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';
import loginImg from '../../../images/Group 140.png'
import toast from 'react-hot-toast';
import swal from 'sweetalert';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });

    const handleBlur = (e) => {
        let isFieldValid;
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 4;
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        };
    };

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo)
                    updateUserName(user.name)
                    const { displayName, email } = userCredential.user;
                    const signInUser = { name: displayName, email: email };
                    setLoggedInUser(signInUser);
                    storeAuthToken();
                    swal({
                        title: "Sign Up Successfully!",
                        icon: "success",
                    });
                })

                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                    toast.error(error.message);
                });
        };

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.error = "";
                    setUser(newUserInfo)
                    const { displayName, email } = userCredential.user;
                    const signInUser = { name: displayName, email: email };
                    setLoggedInUser(signInUser);
                    storeAuthToken();
                    swal({
                        title: "Sign In Successfully!",
                        icon: "success",
                    });
                })

                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                    toast.error(error.message);
                });
        }
        e.preventDefault();;
    };

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            swal({
                title: "Updated name successfully!",
                icon: "success",
            });
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                storeAuthToken();
            }).catch(function (error) {
                const errorMessage = error.message;
                toast.error(errorMessage);
            })
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                toast.error(error);
            });
    }
    return (
        <div className="row  shadow m-2 p-5">
            <div className="col-md-5 bg-light p-5">
                <div className="text-center"> 
                    <h2 className="fw-bold">Create An Account</h2>
                    <hr className="mb-5" />
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            {newUser && <input className="form-control" name="name" type="text" onBlur={handleBlur} placeholder="enter your name" />}
                        </div>
                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required />
                        </div>
                        <input className="btn-brand fw-bold" type="submit" value={newUser ? "Sign Up" : "Sign In"} />
                    </form>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id="" />
                    <label htmlFor="newUser">Create new user</label>
                    <hr/>
                </div>
                <div className="from-group mt-5 text-center">
                    <button onClick={handleGoogleSignIn} className="btn-brand" >Google Sign in</button>
                </div>
            </div>
            <div className="col-md-7">
                <img className="img-fluid" src={loginImg} alt="" />
            </div>
            <div>
                <p>{user.error}</p>
                {user.success && <p>User {newUser ? 'created' : 'Logged In'} successfully</p>}
            </div>
        </div>
    );
};

export default Login;
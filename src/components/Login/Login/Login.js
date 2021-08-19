import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../FirebaseConfig/FirebaseConfig';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';
import loginImg from '../../../images/Group 140.png'


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

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
            console.log(errorMessage)
        })
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                console.log(error)
            });
    }
    return (
        <div className="row  shadow m-2 p-5">
            <h4 className="fw-bold">Login Here</h4>
            <div className="col-md-6 bg-light">
                <div className="form-group">
                    <label htmlFor="">User Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-danger">Forgot your password?</label>
                </div>
                <div className="from-group mt-5">
                    <button onClick={handleGoogleSignIn} className="btn-style" >Google Sign in</button>
                </div>
            </div>
            <div className="col-md-6">
                <img className="img-fluid" src={loginImg} alt="" />
            </div>
        </div>
    );
};

export default Login;
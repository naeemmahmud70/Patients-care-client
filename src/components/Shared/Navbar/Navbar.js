import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-bg fixed-top t-0">
            <h2 className="fw-bold">Patients Care</h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active fw-bold">
                        <Link to="/home" className="nav-link mr-5">Home</Link>
                    </li>
                    <li className="nav-item active fw-bold">
                        <a className="nav-link mr-5" href="#aboutUs">About</a>
                    </li>
                    <li className="nav-item active fw-bold">
                        <a className="nav-link mr-5" href="#services">Services</a>
                    </li>
                    <li className="nav-item active fw-bold">
                        <a className="nav-link mr-5 " href="#reviews">Reviews</a>
                    </li>
                    <li className="nav-item active fw-bold">
                        <a className="nav-link  mr-5 " href="#blogs">Blogs</a>
                    </li>
                    <li className="nav-item active fw-bold">
                        <a className="nav-link mr-5" href="#contact">Contact Us</a>
                    </li>
                    <li className="nav-item active fw-bold">
                    <Link to="/dashboard" className="nav-link mr-5">Dashboard</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
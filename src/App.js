import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import Appointment from './components/Appointment/Appintment/Appointment';
import Login from './components/Login/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import AddDoctor from './components/Dashboard/AddDoctor/AddDoctor';
import AllPatients from './components/Dashboard/AllPatients/AllPatients';
import SeePrescription from './components/Dashboard/SeePrescription/SeePrescription';
import Appointments from './components/Dashboard/Appointments/Appointments';



export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/appointment">
            <Appointment></Appointment>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/allPatients">
            <AllPatients></AllPatients>
          </Route>
          <Route path="/seePrescription">
            <SeePrescription></SeePrescription>
          </Route>
          <Route path="/appointments">
            <Appointments></Appointments>
          </Route>

          <Route path="/addDoctor">
            <AddDoctor></AddDoctor>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

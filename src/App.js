import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import { useIdleTimer } from 'react-idle-timer'
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails, setLoginFlag } from './actions';

import Login from './components/login/Login';
import Dashboard from './components/boost/dashboard';
import NotFound from './components/Show_404';
import Background from './assets/images/banner_wfm_2.jpg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

    const dispatch = useDispatch();

    // Idle Handling = 30 mins
    const timeout = 1800000;
    
    const [isIdle, setIsIdle] = useState(false)
    const [shoModal, setShowModal] = useState(false);

    // When user has been idle for timeout amount
    const handleOnIdle = () => {
        if (!isIdle) {
            setIsIdle(true);
        }
        
        var loginState = localStorage.getItem('is_logged_in');
        if (loginState) {
            if (!shoModal) {
                console.log(shoModal);
                handleShowModal();
            }            
        }
    }

    // Idle timer init run
    useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });

    const isLogged = useSelector( state => state.isLogged);
    
    const [appStyle, setAppStyle] = useState({
        background: '#fff',
    });
    
    const bgImg = {
        backgroundImage: `url(${Background})`
    };

    // Initialize states from localstorage data
    const initLocalStorage = () => {
        var loginState = localStorage.getItem('is_logged_in');
        var lastLogin = localStorage.getItem('login_time');
        if (loginState) {
            var old_date = new Date(parseInt(lastLogin));
            var to_date = new Date();
            var diff_in_hours = Math.abs(to_date - old_date) / 36e5;
            
            if (diff_in_hours > 12) {
                handleShowModal();
            } else {
                console.log("last login: " + diff_in_hours.toFixed(2) + " hours ago.");
                if (isLogged === false) {
                    dispatch(setLoginFlag(true));
                }
            }
            
        }
    }

    const loginStyler = (e) => {
        setAppStyle(e);
    }

    const whichHome = () => {

        if (!isLogged) {
            return <Login loginStyle={loginStyler} />
        } else {
            return <Dashboard />
        }
    }

    const handleLogout = () => {
        dispatch(setLoginFlag(false));

        localStorage.clear();

        dispatch(setUserDetails({
            UserImage : '',
            MyName : '',
            MyCloudId : '',
            MyEmail : ''
        }));

        return <Redirect to="/" />
    }

    const gotoPage = (whatPage) => {
        
        console.log("Checking session: " + isLogged);

        
        
        if (whatPage.match.url === "/dashboard") {
            if (!isLogged) {
                return <Redirect to="/" />
            }
            return <Dashboard />
        } else if (whatPage.match.url === "/login") {
            if (isLogged) {
                return <Redirect to="/dashboard" />
            } else {
                return <Redirect to="/" />
            }            
        } else {
            return <NotFound />
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        handleLogout();
    }
    const handleShowModal = () => setShowModal(true);

    const AlertIdle = () => {
        return (
            <Modal
                show={shoModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="sm"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="modal-header">Session Timeout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have been logged out due to inactivity.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" size="sm" onClick={handleCloseModal}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        )
        
    }

    useEffect(() => {
        initLocalStorage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    

    return (
        
        <Router>
            
            <div className="App" style={ isLogged ? appStyle : bgImg }>
                <AlertIdle />
                <Switch>
                    <Route path="/" exact render={whichHome} />
                    <Route path="/logout" exact render={handleLogout} />
                    <Route path="/:any" render={gotoPage} />                    
                </Switch>
            </div>
            
        </Router>
        
    );
}

export default App;

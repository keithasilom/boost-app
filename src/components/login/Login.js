import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserDetails, setLoginFlag } from '../../actions';

import loginImg from "../../assets/images/img-footer-logo.png";
import './Login.scss';
import { Button } from 'react-bootstrap';

const Login = (props) => {

    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        setErrorMsg('');

        if (username === '' || password === '') {
            setPassword('');
            setErrorMsg('Username and password required.');            
            return false;
        }

        setIsLoading( (prev) => !prev );

        let axiosConfig = {
            headers: {                
                'Content-Type': 'application/json',
                'Authorization': API_KEY
            }
        };

        var postData = {
            "ashData" : {
                "username" : username,
                "password" : password,
            }
        };

        setPassword('');
        
        axios.post(API_URL+'boost_login', postData, axiosConfig)
            .then(response => {
                var rsp = response.data;
                                
                setIsLoading( (prev) => !prev );

                if (rsp) {
                    if (rsp.Status === 0) {
                        setErrorMsg(rsp.Message);
                    }
                    const respHeaders = response.headers;
                    const authHeader = respHeaders.authorization;

                    var ashData = rsp.AshData;

                    var loginTime = new Date();
                    var logTimestamp = loginTime.getTime();
                    
                    if(authHeader !== undefined) {
                        props.loginStyle({
                            background: '#fff'
                        });

                        // props.isLogin(true);
                        // props.setToken(authHeader);
                        // props.userHandler({
                        //     UserImage : ashData.ProfileImg,
                        //     MyName : ashData.FullName,
                        //     MyCloudId : ashData.CloudID,
                        //     MyEmail : ashData.UserEmail,
                        // });

                        localStorage.setItem("cookie_jar", authHeader);
                        localStorage.setItem("is_logged_in", true);
                        localStorage.setItem("user_image", ashData.ProfileImg);
                        localStorage.setItem("user_full_name", ashData.FullName);
                        localStorage.setItem("user_cloud_id", ashData.CloudID);
                        localStorage.setItem("user_email", ashData.UserEmail);
                        localStorage.setItem("user_emp_id", ashData.EmpID);
                        localStorage.setItem("login_time", logTimestamp);

                        // redux
                        dispatch(setUserDetails({
                            UserImage : ashData.ProfileImg,
                            MyName : ashData.FullName,
                            MyCloudId : ashData.CloudID,
                            MyEmail : ashData.UserEmail,
                        }));
                        dispatch(setLoginFlag(true));
                    }
                    
                }
            })
            .catch(error => {                
                setIsLoading( (prev) => !prev );
                console.log(error);
                setErrorMsg('Oops! Server timeout.');
            })
        
    }

    useEffect(() => {
        console.log("try logging in");
        // props.a({
        //     background: "url(../../assets/images/banner_wfm_2.jpg)",
        // });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="login-component">
            <div className="login-container">
                <div className={isLoading ? 'loader' : 'loader ihide'}></div>    
                <div className="base-container" >                
                    <div className="login-box">
                        <div className="image">
                            <img src={loginImg} alt="boost-logo" className="login-logo"/>
                        </div>

                        <div className="content">
                            <form onSubmit={submitHandler}>
                                <div className="header">
                                    <p>Login to Boost</p>
                                </div>

                                <div className="alert alert-danger">	
                                    {errorMsg}
                                </div>

                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            value={username} 
                                            onChange={changeHandler} 
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" value={password} name="password" autoComplete="off" onChange={passwordHandler} />
                                    </div>
                                    <div>
                                        <Button type="submit" className="login-btn">Login</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>   
    );
}

export default Login;
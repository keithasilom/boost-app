import React, { useEffect, useState } from 'react';
import { ListGroup, Table, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setPayPeriod } from '../../actions';
import axios from "axios";

import './dashboard.scss';
import Menu from '../Menu';

const Dashboard = () => {

    const API_URL = process.env.REACT_APP_API_URL;
    const jTkn = localStorage.getItem('cookie_jar');
    const dispatch = useDispatch();
    const periodFrom = useSelector( state => state.payPeriod.periodFrom );
    const periodTo = useSelector( state => state.payPeriod.periodTo );
    const payDate = useSelector( state => state.payPeriod.payDate );

    const [applications, setApplications] = useState({});
    console.log(applications);
    
    const getCurrectPeriod = () => {

        if (jTkn === '') {
            return false;
        } 

        let axiosConfig = {
            headers: {                
                'Content-Type': 'application/json',
                'Authorization': jTkn
            }
        };

        axios.get(API_URL + 'boost/pay_period', axiosConfig)
        .then( response => {
            var rsp = response.data;
            console.log(rsp);
            if (rsp) {
                if (rsp.Status === 0) {
                    console.log(rsp.Message);
                } else {
                    const respHeaders = response.headers;
                    const authHeader = respHeaders.authorization;
                    var ashData = rsp.AshData;
                    if(authHeader !== undefined) {
                        localStorage.setItem("cookie_jar", authHeader);

                        dispatch(setPayPeriod({
                            periodFrom: ashData.PeriodStart,
                            periodTo: ashData.PeriodEnd,
                            payDate: ashData.PayPeriod,
                        }));
                    } else {
                        console.log("invalid auth");
                    }
                }
            }
        })
        .catch( err => {
            console.log(err);
        });
    }

    const getBoostHistory = () => {
        if (jTkn === '') {
            return false;
        } 

        let axiosConfig = {
            headers: {                
                'Content-Type': 'application/json',
                'Authorization': jTkn
            }
        };

        axios.get(API_URL + 'boost/application_history', axiosConfig)
        .then( response => {
            var rsp = response.data;
            console.log(rsp);

            if (rsp.Status === 0) {
                console.log(rsp.Message);
            } else {
                const respHeaders = response.headers;
                const authHeader = respHeaders.authorization;
                var ashData = rsp.AshData;
                if(authHeader !== undefined) {
                    localStorage.setItem("cookie_jar", authHeader);

                    setApplications(ashData);
                } else {
                    console.log("invalid auth");
                }
            }
        })
        .catch( err => {
            console.log(err);
        });
    }

    const numberFormat = (num) => {
        var n = Number(num);
        return n.toFixed(2);
    }

    const dateFormater = (date) => {
        var d = new Date(date);

        return d.toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join('-');
    }

    useEffect(() => {
        getCurrectPeriod();
        getBoostHistory();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="Dashboard container">
            <Menu />
            
            <div>
                <ListGroup horizontal className="summary-div">
                    <ListGroup.Item>
                        <span className="boost-details"><a href="/payslip">View Details</a></span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <label>Payroll Period</label><br />
                        <span>{periodFrom} &ndash; {periodTo}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <label>Pay Date</label><br />
                        <span>{payDate}</span>
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div style={{ marginTop: 50 }}></div>
            <div className="table-header tbl-bottom-border">
                <span className="text-left pull-left" style={{ marginBottom: 10 }}>Boost History</span>
            </div>

            <div>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th style={{ width:50, textAlign: "center" }}>
                            <Form.Check type="checkbox" />
                        </th>
                        <th style={{ width:130 }}>Requested Amount</th>
                        <th style={{ width:130 }}>Date Applied</th>
                        <th style={{ width:220 }}>Payroll Period</th>
                        <th style={{ width:130 }}>Pay Date</th>
                        <th style={{ width:220 }}>Details</th>
                        <th style={{ width:100 }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length > 0 
                        ?
                            applications.map((application, ind) => (
                                <tr 
                                    key={application.boost_application_id} >
                                    <td style={{ textAlign: "center" }}>
                                        <Form.Check 
                                        type="checkbox"
                                        id={application.boost_application_id} />
                                    </td>
                                    <td>{application.request_amount}</td>
                                    <td>{dateFormater(application.date_applied)}</td>
                                    <td>
                                        <label>From: </label> {dateFormater(application.period_from)} <br />
                                        <label>To: </label> {dateFormater(application.period_to)}
                                    </td>
                                    <td>{dateFormater(application.pay_period)}</td>
                                    <td>
                                        <label>Interest: </label> {numberFormat(application.interest_amount)}%<br />
                                        <label>Boost Amount: </label> {numberFormat(application.amount)}<br />
                                        <label>Interest Amount: </label> {numberFormat(application.boost_interest)}
                                    </td>
                                    <td>{application.application_status}</td>
                                </tr>
                            ))
                        :
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No data.</td>
                        </tr>
                    }

                    
                </tbody>
            </Table>
            </div>
        </div>
    );
}

export default Dashboard;
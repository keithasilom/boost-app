import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Show_404 = () => {

    const history = useHistory();

    const clickHandler = (e) => {
        e.preventDefault();

        console.log(e.target.id);
        if (e.target.id === "login_404") {
            history.push("/login");
        } else {
            history.push("/");
        }

    }

    return (
        <div className="page-not-found">
            <h1>404</h1>
            <h2>Are you lost child?</h2>
            <p>Sorry, the page you were looking for does not exist.
                If you follwed a broken link, please let us know
                where the link came from.
            </p>
            <div className="mod-links">
                <Button variant="outline-primary" id="home_404" onClick={clickHandler}>Home</Button>{' '}
                <Button variant="outline-primary" id="login_404" onClick={clickHandler}>Login</Button>{' '}
            </div>
        </div>
    );
}

export default Show_404;
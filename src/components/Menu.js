import React from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// import BrandLogo from '../assets/images/white-logo.png';
import DummyUser from '../assets/images/dummy-user.jpg';

const Menu = () => {

    const VERSION_NUM = process.env.REACT_APP_VERSION;
    const history = useHistory();

    const userData = useSelector(state => state.userDetails);
    console.log(userData);
    var UserImage = userData.UserImage;
    var UserName = userData.MyName;
    var UserCloudID = userData.MyCloudId;
    var UserEmail = userData.MyEmail;
    UserImage = (UserImage) ? UserImage : DummyUser

    const menuNavigator = (e) => {
        e.preventDefault();

        history.push(e.target.pathname);
    };
        
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (        
        <Image 
            src={UserImage} 
            roundedCircle 
            className="profile-img" 
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} />
    ));

    return (
        <Navbar collapseOnSelect expand="sm" fixed="top" variant="dark" className="boost-nav">
            <Navbar.Brand href="/">
            {/* <img
                alt=""
                src={BrandLogo}
                width="25"
                height="25"
                className="d-inline-block align-top home-logo"
            />{' '} */}
            
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard" onClick={menuNavigator}>Home</Nav.Link>
                    <Nav.Link href="/payslip" onClick={menuNavigator}>My Pay</Nav.Link>
                    <NavDropdown title="Tools" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/pay-calculator" onClick={menuNavigator}>Pay Calculator</NavDropdown.Item>
                        <NavDropdown.Item href="/pay-projection" onClick={menuNavigator}>Pay Projection</NavDropdown.Item>                        
                        <NavDropdown.Item href="/lenders" onClick={menuNavigator}>View Lenders</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/profile" onClick={menuNavigator}>Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                <Dropdown className="profile-div">
                    <Dropdown.Toggle as={CustomToggle} className="profile-drop"></Dropdown.Toggle>

                    <Dropdown.Menu align="right">
                        <Dropdown.ItemText >
                        <Image 
                            src={UserImage} 
                            roundedCircle 
                            className="profile-img-md" />
                        <div className="profile-details"> 
                            <span className="profile-name">{ UserName }</span>
                            <span className="profile-id">{ UserCloudID }</span>
                            <span className="profile-id">{ UserEmail }</span>
                        </div>
                        </Dropdown.ItemText>
                        <Dropdown.Divider />
                        <Dropdown.ItemText >
                            <span className="version-num">Version {VERSION_NUM}</span>
                            <Button variant="light" className="logout-btn" href="/logout">Logout</Button>
                        </Dropdown.ItemText>
                    </Dropdown.Menu>
                </Dropdown>
                

            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;
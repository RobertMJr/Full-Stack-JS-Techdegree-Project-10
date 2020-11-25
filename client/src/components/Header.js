import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    const { context } = props;
    const authUser = context.authenticatedUser;
        return (
            <>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav>
                            {
                                authUser ?
                                <>
                                <span>Welcome, {authUser.firstName} {authUser.lastName} </span>
                                <NavLink to="/signout" className="signout">Sign Out</NavLink>
                                </>
                                :
                                <>
                                    <NavLink to="/signup" className="signup">Sign Up</NavLink>
                                    <NavLink to="/signin" className="signin">Sign In</NavLink>
                                </>
                            }
                        </nav> 
                    </div>
                </div>
                <hr></hr> 
            </>
        );
}

export default Header;
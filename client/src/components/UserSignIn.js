import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form 
                        cancel={this.cancel}
                        submit={this.submit}
                        errors={errors}
                        submitButtonText="SignIn"
                        elements={() => (
                            <React.Fragment>
                                <div>
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        placeholder="Email Address"
                                        value={emailAddress}
                                        onChange={this.change}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.change}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    />
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }

    // Update state based on the value of the input fields
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name] : value
            };
        });
    }

    // Handle form submit
    submit = () => {
        const { context } = this.props;
        // Access 'from' via this.props.location.state.from
        const { from } = this.props.location.state || { from: {pathname: '/'} }
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
        .then( user => {
            // Check if the returned promise value is equal to null (meaning the response  is a 400 status)
            if (user === null) {
                this.setState(() => {
                    return { errors: ['Sign-in was unsuccessful'] };
                })
            } else {
                // Redirect user after a successfull sing-in to the previous screen
                this.props.history.push(from);
            }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/error');
        })
    }


    // Route user back to the main page
    cancel = () => {
        this.props.history.push('/');
    }
}

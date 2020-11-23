import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }


    render() {

        // Provide the utility methods of the Data class 
        const value = {
            data: this.data,
            // Pass the Provider's value prop an actions object to store any event handlers/actions to be performed on data that is passed down through context
            actions: {
                signIn: this.signIn,
            }
        };

        return(
            // value is an object containg the context to be shared throughout the component tree
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    // Uses the credentials to call the getUser() method in Data.js which returns the user data
    signIn = async (emailAddress, password) => {
        /**
         * //The returned promise of below user variable will be an object like:
         * { firstName: "John", lastName: "Doe", emailAddress: "john.doe@doe.com"}
         */
        console.log(emailAddress.length);
        const user = await this.data.getUser(emailAddress, password); 
        return user;
    }

    signOut = async () => {

    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
*/

export default function withContext(Component) {
    return function ContextComponent(props) {
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}
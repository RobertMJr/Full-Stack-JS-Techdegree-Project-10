import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { Consumer } from './Context';

// Destructure and rename the component prop, collect any other passed props in the '...rest' variable
const PrivateRoute =  ({ component: Component, ...rest }) => {
    return (
        // Consumer component subscribes PrivateRoute to all actions and data provided by Context.js
        <Consumer>
            {context => (
                <Route 
                    {...rest}
                    render={props => context.authenticatedUser ? (
                            <   Component {...props} />
                        ) : (
                            <Redirect to={{
                                pathname: '/signin',
                                // The state property holds the info about the user's current location
                                // If authentication is successful, the router can redirect to the original location - from: props.location
                                state: { from: props.location }, // current location of the route the user tried to access
                            }} />
                        )
                    }
                />
            )}
        </Consumer>
    );
};

export default PrivateRoute;
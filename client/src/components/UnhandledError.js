import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => (
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <span>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </span>
        </div>
    );

export default UnhandledError;
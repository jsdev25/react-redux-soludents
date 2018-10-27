import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
    render() {
       
        return (
            <div style={{textAlign:"center"}}>
                <h2>This is Unauthorized User.</h2>
                <Link to="/">Go back to home</Link>
            </div>
        );
    }
}


export default Error;
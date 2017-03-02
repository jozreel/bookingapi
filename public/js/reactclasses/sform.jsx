import React from 'react';
import $ from 'jquery';

import {render} from 'react-dom';
import { Component } from 'react';
import ServiceSearch from './searchservice.jsx';
import Login from './signin.jsx';
import SignUp from './signup.jsx';
class LandingPage extends React.Component{
    render() {
        return (
            <div>
                <ServiceSearch />
                <div className="singup">
                    <SignUp />
                    <Login />
                </div>
            </div>
        )
    }
}
render(<LandingPage />, document.getElementById('landing'));

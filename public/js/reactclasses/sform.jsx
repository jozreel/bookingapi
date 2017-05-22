import React from 'react';
import $ from 'jquery';

import {render} from 'react-dom';
import { Component } from 'react';
import ServiceSearch from './searchservice.jsx';
import Login from './signin.jsx';
import SignUp from './signup.jsx';
import auth from './auth.jsx';
import { Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
class LandingPage extends React.Component{
    constructor()
    {
        super();
        this.auth = new auth();
    }
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
    checkExpired()
    {
        let pload = this.auth.decodeToken();
        //navigate to login component
        if(!pload.error )
        {
            console.log(pload.error);
        }
        else
        {
            this.auth.refreshToken();
        }

    }

    componentDidMount()
    {
        console.log('mounted');
        if(this.auth.isLogedIn())
        {
            this.auth.refreshToken();
            
           // history.push('/home');
            //browserHistory.push('/ClientHome')
            
        }
       

    }
}
export default LandingPage;
//render(<LandingPage />, document.getElementById('landing'));

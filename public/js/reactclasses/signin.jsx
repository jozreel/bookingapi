import React from 'react';
import $ from 'jquery';
import UserService from './userservice.jsx';
import auth from './auth.jsx';
class Login extends React.Component{
    constructor()
    {
        super();
        this.userservice = new UserService();
    }
    render() {
        return (
            <form method="post" onSubmit={this.handleLoginSubmit.bind(this)}>
                <h3>SIgn in</h3>
                <input className="binput" name="email" type="text" placeholder="username" onChange={this.handleInputChange.bind(this)} />
                <input className="binput" name="password" type="password" placeholder="password" onChange={this.handleInputChange.bind(this)} />
                <button style={{ background: '#FF4081' }}>Login</button>
            </form>
        );
    }
    handleLoginSubmit(event)
    { 
        console.log(this.state);
         event.preventDefault();
         this.userservice.authUser({email:this.state.email, password:this.state.password}).then(res =>{if(! res.error)
        {
             if(typeof(localStorage) !== undefined)
             {
               
                 
                 //localStorage.hd = "mon";
                 localStorage.setItem("access_token",res.accessToken); 

                 let ath = new auth();
                 ath.decodeToken();
               
             }
        } 
        }).catch(err=> console.log(err));
       
     

    }
    handleInputChange(e)
    {
        let obj ={};
        let name = e.target.name;
        obj[name] = e.target.value;
        
        this.setState(obj);
    }
}
export default Login;

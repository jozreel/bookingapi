import React from 'react';
import $ from 'jquery';
import UserService from './userservice.jsx';
class SignUp extends React.Component{
    constructor() {
        super();
        this.state = { email: '', fullName: '', password: '', passwordr: '', sex: '', birthday: '', error: '' };
        this.userservice = new UserService();
    }
    handleEmailChange(e) {
        console.log(this);
        this.setState({ email: e.target.value });
    }
    handleNameChange(e) {
        this.setState({ fullName: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handlePasswordrChange(e) {
        this.setState({ passwordr: e.target.value });


    }
    handleSexChange(e) {
        console.log(e.target.value);
        this.setState({ sex: e.target.value });
    }
    handleBdayChange(e) {
        this.setState({ birthday: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        var fullName = this.state.fullName.trim();
        var password = this.state.password.trim();
        var sex = this.state.sex.trim();
        var passwordr = this.state.passwordr.trim();
        var bday = this.state.birthday;
        var fd = { email: email, fullname: fullName, password: password, sex: sex, passwordr: passwordr, birthday: bday }
       
        if (password === passwordr) {
            this.setState({ error: "" });
            this.userservice.addUser(fd).then(success=>{console.log(success), err=>this.error = err.error});

            
           /* $.ajax({
                type: 'POST',
                url: '/user',
                data: fd,
                dataType: 'json',
                success: function (result) {
                    console.log('success');
                }
            });*/
        }
        else {

            this.setState({ error: "Passwords do not match" });
        }
    }
    handleLeave(e) {
        if (this.state.password !== this.state.passwordr)
            this.setState({ error: 'Passwords do not match' });
        else
            this.setState({ error: '' });
    }
    emailLeave(e) {
        var regx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        var test = regx.test(e.target.value);
        if (!test)
            this.setState({ error: 'Invalid email' })
        else
            this.setState({ error: '' });
    }
    handleDateChange(e)
    {
        this.setState({birthday:e.target.value});
    }
    render() {
        return (

            <form onSubmit={this.handleSubmit.bind(this)}>
                <h3>New user registration</h3>
                <input type="email" placeholder="Email" onChange={this.handleEmailChange.bind(this)} required onBlur={this.emailLeave.bind(this)} />
                <input type="text" placeholder="Full Name" onChange={this.handleNameChange.bind(this)} required />
                <input type="Password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)} required />
                <input type="Password" placeholder="Repeat Password" onChange={this.handlePasswordrChange.bind(this)} onBlur={this.handleLeave.bind(this)} required />
                <select required  onChange={this.handleSexChange.bind(this)} >
                    <option value="" default onChange={this.handleSexChange.bind(this)} >Select Sex</option>
                    <option value="M"  >Male</option>
                    <option value="F"  >Female</option>
                </select>
                <input type="date" onChange={this.handleDateChange.bind(this)} /> 
                <input type="submit" value="Sign Up" style={{ cursor: 'pointer', background: '#FF4081' }} />
                <p style={{ color: '#fe464e' }}>{this.state.error}</p>
            </form>



        );
    }
}
export default SignUp;
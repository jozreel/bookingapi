import React from 'react';
import {render} from 'react-dom';
import { Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import BusinessInfoComponent from './businessInfoComponent.jsx';
class Bpage extends React.Component{
constructor()
{
    super();
    this.state={_id:''};
}
componentDidMount()
{
    var id = document.getElementById('_id').value;
    this.setState({_id:id});
  
}
render()
{ 
console.log(this.state);
return ( 
<div>
<ul className="left profilelist">  
           <li><Link to={`/${this.state._id}`}>
           <iron-icon style={{color:'#fe464e'}} icon="communication:contacts"></iron-icon> <p>Business Contacts and Info</p>
           </Link>
           </li>
           <li> 
           <Link to={`address/${this.state._id}`}>
           <iron-icon style={{color:'#d9d92b'}} icon="maps:person-pin-circle"></iron-icon> <p>Address  and Directions</p>
           </Link>
           </li>
           <li>
           <iron-icon style={{color:'#5a7840'}} icon="communication:mail-outline"></iron-icon> <p>Email and Passwords</p>
           </li>
            <li>
           <iron-icon style={{color:'#92c676'}} icon="icons:card-giftcard"></iron-icon> <p>Ads and Photos</p>
           </li>
           <li >
           <iron-icon style={{color:'#423756'}} icon="icons:schedule"></iron-icon> <p>Opening Hours</p>
           </li>
           <li>
           <iron-icon style={{color:'blue'}} icon="icons:assignment"></iron-icon> <p>Services Offered</p>
           </li>
           <li>
           <iron-icon icon="social:person-add" style={{color:"orange"}} ></iron-icon> <p>Employees</p>
           </li>
</ul>
{this.props.children}
</div>
);
} 
} 
export default Bpage; 
//render(< /> , document.getElementById('app')); 
import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import BusinessInfoComponent from './businessInfoComponent.jsx';
import {render} from 'react-dom';
import Bpage from './sidenavbrofile.jsx';
import ClientHome from './clienthome.jsx';
import LandingPage from './sform.jsx';
import BusinessAddressComponent from './businessaddresscomponent.jsx';

class App extends Component
{
  componentDidMount()
  {
    
  }
  render()
  {
    //     <Route path = '/' component={Bpage} >  thisis the one with the links
     // <IndexRoute component={ClientHome} /> default route
    return  <Router history={hashHistory}>
    <Route component ={}>
     <Route path = '/' component={LandingPage} /> 
     <Route path = '/landing' component={LandingPage} /> 
      <Route path='/home' component={ClientHome} />
          <Route path='/:uid' component={BusinessInfoComponent} />
         <Route path='/address/:uid' component={BusinessAddressComponent} />
         
    </Route>
      </Router> 
  
  }
} 
export default App; 
render(<App />, document.getElementById('app'));
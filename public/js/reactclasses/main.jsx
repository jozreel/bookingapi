import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import BusinessInfoComponent from './businessInfoComponent.jsx';
import {render} from 'react-dom';
import Bpage from './sidenavbrofile.jsx';
import BusinessAddressComponent from './businessaddresscomponent.jsx'
class App extends Component
{
  componentDidMount()
  {
    
  }
  render()
  {
    return  <Router history={hashHistory}>
     <Route path = '/' component={Bpage} >
        <IndexRoute component={BusinessInfoComponent} />
          <Route path='/:uid' component={BusinessInfoComponent} />
         <Route path='/address/:uid' component={BusinessAddressComponent} />
        
        </Route>
      </Router> 
  
  }
}
export default App; 

render(<App />, document.getElementById('app'));
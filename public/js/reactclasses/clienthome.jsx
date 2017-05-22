import React from 'react';
//import {render} from 'react-dom';
import $ from 'jquery';
class ClientHome extends React.Component{
    constructor()
    {
        super();
        this.state = {}
        console.log('in home');
    }
    getClientDetails()
    {
       ;
    }
    render()
    {
        return (
              <div className="clienthome">
                 <div className="search"> <input onChange={this.handleSearchChange.bind(this)}  /> <div className="sbutton ripple"></div> </div>
              </div>
        );
    }
    handleSearchChange(e) {
        this.setState({ searchtext: e.target.value }); 
    }
}
export default ClientHome; 
//render(<ClientHome />, document.getElementById('client') );
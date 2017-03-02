import React from 'react';
import $ from 'jquery';
class ServiceSearch extends React.Component {
    constructor() {
        super();
        this.state={ services: [], servicename: '', searchReturned: true }
    }

    handleServiceChange(e)
    {
       
        this.setState({ servicename: e.target.value });
        if (this.state.searchReturned) {


            $.ajax({
                beforeSend() { this.setState({ searchReturned: false }) },
                url: '/service/regxpfind/' + e.target.value.trim(),
                dataType: 'json',
                success: ()=> {
                   this.setState({ searchReturned: true, services: res });         
                }
            });
    }
}

handleSearchSubmit(e) {
  

         var v = '';
        var opt = this.sinpt.querySelector('option[value="' + this.state.servicename + '"]');
        if (opt !== null)
            var v = this.sinpt.querySelector('option[value="' + this.state.servicename + '"]').dataset.value;
        
        window.location = '/webapp/searchresults/' + this.state.servicename + '/service/' + v;

    }

render() {
        return (
            <div className="left">
                <div className="sbform">
                    <div className="center">
                        <h3>Find It, Reserve it</h3>
                        <input className="binput" type="text" placeholder="Search service provider" />
                        <input type="text" list="services" value={this.state.servicename} onChange={this.handlServiceChange} placeholder="Search by service name" />
                        <datalist id="services" ref={function (si) { this.sinpt = si }.bind(this)}>
                            {this.state.services.map((tval, indx) => { return (<option data-value={tval.serviceid} value={tval.servicename} key={tval.serviceid}></option>) })}
                        </datalist>
                        <paper-icon-button onClick={this.handleSearchSubmit} style={{ background: '#FF4081', borderRadius: '50%' }} icon="search" ></paper-icon-button>
                    </div>
                </div>
                <p><a href="/user/businessregistrationpage">Register your buisness with us. Quick and easy </a></p>
            </div>
        )
}
}
export default ServiceSearch;
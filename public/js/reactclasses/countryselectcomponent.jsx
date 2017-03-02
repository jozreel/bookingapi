import React from 'react'
import $ from 'jquery'; 
class CountrySelect extends React.Component
{
    constructor()
    {
        super();
     //this.propTypes = {
       // url: React.PropTypes.string.isRequired
   // };
    this.state = {
            options: []
           
        };
      
    }
    componentDidMount()
    {
        console.log(this.state, 'state');
       
        // get your data
        $.ajax({
            url: this.props.url,
            success: this.successHandler.bind(this)
        })
    }
   
    successHandler(data) {
        data = JSON.parse(data);
        
        // assuming data is an array of {name: "foo", value: "bar"}
        for (var i = 0; i < data.length; i++) {
            var option = data[i];
            this.state.options.push(
                <option key={i} value={option.code}>{option.name}</option>
            );
        }
        this.forceUpdate();
    }
    render() 
    {
        return(
            <select value={this.props.value} onChange={this.props.onChange} name={this.props.name} >{this.state.options}</select>
        )
    }
    }
    export default CountrySelect;

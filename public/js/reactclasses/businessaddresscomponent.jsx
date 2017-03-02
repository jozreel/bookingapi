import React from 'react';
import MapComponent from './mapcomponent.jsx'
import CountrySelect from './countryselectcomponent.jsx'
import Bpage from './sidenavbrofile.jsx';
import $ from 'jquery'; 
class BusinessAddressComponent extends React.Component
{
constructor()
{
    super();
    this.state = {country:'', businesstwn:'', street:'', townlist:[], mapMarkers:[], businessname:'Fort young'}
}
componentDidMount()
{
  this.animate();
   this.setState({_id:this.props.params.userid});
  $.get('user/getaddressdetails', (success)=>{
     this.setState(success);
  });

  
  
}
  handleInputChange(e)
   {
     
       name =e.target.name;
       var userobj ={}
       userobj[name]=e.target.value;
      console.log(userobj);
      this.setState(userobj) ; 
   }
   handlBtwnChange(e)
   {
  
     this.setState({businesstwn:e.target.value}) ;
   }
   zipChange()
   {
       
   }
   handleSubmitCountry(e)
   { var mp = this;
       e.preventDefault();
       var addrObject = {country:this.state.country, street:this.state.street, businesstwn:this.state.businesstwn, zip:this.state.zip,_id:this.state._id}
       console.log(addrObject);
       $.ajax({
           method:'POST',
           dataType:'json',
           url:'/user/saveaddress/',
           data:addrObject,
           beforeSend:function()
           {
            startSpinner();   
           },
           success:function(res)
           {
               mp.setState(res);
               stopSpinner();
               if(res.success !==false)
                 showToast('address has been saved');
           }
       });
   }
    handleMapSubmit(res)
    {
       
        this.setState(res);
      
    }

    handleMapLoad(res)
    {
           console.log('init',res);
           this.setState({country:res.country});
           console.log(this.state.country)
    }

 render()
{ 
     //render map and stuff
        return ( 
          <div>     
               <div className="middle-cont"  style = {{opacity:'0'}} id="adddiv" >
               <form onSubmit={(e)=>this.handleSubmitCountry(e)} >
                <p>Country</p>
                <CountrySelect url="/static/countries.json"
                  value={this.state.country}
                  onChange={this.handleInputChange}
                  name="country" />
                  <p>Street</p>
                  <input type="text" placeholder='Street'  onChange={(e)=>this.handleInputChange(e)} value= {this.state.street} name="street" />
                   <p>Town</p>
                    <input style={{display:'none'}} name="businesstwn" />
                    <input list="towns" autocomplete="off"  value= {this.state.businesstwn}  placeholder="eg Asgard" onChange = {(e)=>this.handlBtwnChange(e)} onKeyUp={(e)=>this.handleTextDDChange(e)} />
                     <datalist id="towns">
                    
                       {this.state.townlist.map((tval,indx)=>{return(<option value={tval.name} key={tval.nameid}>{tval.name},{tval.country}</option>)})}
                     </datalist>
                   
                   <p>Zip</p> 
                   <input type="text" placeholder='12345'  onChange={(e)=>this.handleInputChange(e)} value= {this.state.zip} name="zip" />
                  <button>Save</button>
                  </form>
                  <MapComponent formSubmit  ={(res)=>this.handleMapSubmit(res)} businesstype = {this.state.businesstype} mapLoaded = {(res)=>this.handleMapLoad(res)} uid={this.props.params.uid}  businessname={this.state.businessname} />
                  </div>  
                  </div> ); 
}
animate()
{
  
   $('#adddiv').fadeTo('slow',1);
}

 handleTextDDChange(e)
        {   var ob = this;
          
            console.log(e.target.value, typeof e.target.value);
            this.setState({town:e.target.value});
            $.ajax({
                url:'/towns/regxpfind/'+e.target.value,
               
                success:function(res)
                {
                   
                     console.log(res);
                     ob.setState({townlist:res});
                    /* if(res.length >0)
                      document.getElementById('tlist').style.display='block';
                     else
                       document.getElementById('tlist').style.display='none';*/
                     
                }
            });
           // if(e.target.value===''|| typeof e.target.value !== 'string')
             //  document.getElementById('tlist').style.display='none';
        }
}
export default BusinessAddressComponent;
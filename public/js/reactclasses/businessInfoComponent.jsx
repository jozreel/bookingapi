import React from 'react';
import {render} from 'react-dom';
import Bpage from './sidenavbrofile.jsx';
import $ from 'jquery';
class BusinessInfoComponent extends React.Component{

    constructor()
    {
        super();

        this.state ={
            profilethumb:'/image/lady.png', servicename:'',businessname:'',businesstype:[], mobilelist:[]
        }

    }

    componentDidMount()
    {
         var id = this.props.params.userid
          if(!id)
            id = document.getElementById('_id').value;
           this.setState({_id:id});
    }


    render() 
    {
        return  (  
            <div>
           
            <div id="maindiv" style={{display:'block',float:'left', width:'600px', position:'relative', opacity:'0'}} onLoad={this.animateLoad}>
                <form method="POST" className="fluid" onSubmit={this.handleSubmitImage} ref={function(mf){this.BIFORM=mf}.bind(this)}>
                  <p style={{fontSize:'16pt', color:'#294b77'}}>Business Logo</p>
                  <div style={{position:'relative', width:'150px'}}>
                  <canvas  style={{display:'none'}} id="canv"></canvas>
                   <img className="sqavatar" width="150"  style={{position:'absolute', top:'0px', opacity:'0'}} id="pimg" />
                  <img className="sqavatar" src={this.state.profilethumb} width="150" id="ppic" />
                 
                  </div>
                   
                  <input type="file"  onChange={this.handleImageChange} style={{opacity:'0.6' }}/>
                   <img src='' width='480' id="invimg" style={{position:'absolute', opacity:'0', zIndex:'-1'}} />
                  <button disabled ref ={function(btn){this.imgbtn = btn}.bind(this)}>Save</button>
                </form>
                <form method="POST" className="fluid" onSubmit={this.handleInfoSubmit} >
                 <p>Business Name</p>
                  <input type="text" value ={this.state.businessname} onChange={this.handleInputChange} name="businessname"  />
                  <p>Main contact person for your business</p>
                  <input type="text" value ={this.state.contactname} onChange={this.handleInputChange} name="contactname" />
                 
                  <p>Date you started doing business</p>
                  <input type="date" required  onChange={this.handleInputChange} value={this.state.dateformed} name="dateformed"/>
                   <p>Service Name</p>
                  <input type="text" list="services" value ={this.state.servicename} onChange={this.handlServiceChange}   />
                   <datalist id="services">
                      {this.state.businesstype.map((tval,indx)=>{return(<option key={tval.businesstypeid}>{tval.businesstypename}</option>)})}
                    </datalist>
                   <button>Save</button>
             </form>
             <div>
             
              <p style={{fontSize:'16pt', color:'#294b77'}}>Telephone numbers for business <button onClick={this.handleClickPhone}> <iron-icon icon="add"></iron-icon></button></p>
               <div style={{display:'inline-block',maxHeight:'0px', overflow:'hidden'}} className="transh"  id="ph">
               <form onSubmit={this.handleSubmitMainNumber}>
                 <p>Main Phone</p>
                   <input type="number" name ="contactnumber" onChange={this.handleInputChange}  value={this.state.contactnumber} />
                  <button>save</button>
             </form>
              <form className="fluid" onSubmit={this.handlePhoneSubmit} ref={function(mob){this.MOBILEFORM=mob}.bind(this)} >
                  
                  <p>Enter new mobile phone No.</p>
                  <input type="number" className="num"   onChange={this.handleInputChange} name="mobile" onBlur={this.validatePhone} />
                 
                  <button>Save</button>
             </form>
            
                  
            <p>Mobile Phones</p>
            <ul className="text" style={{listStyle:'none'}}>
               {this.state.mobilelist.map(function(lv,indx){ if(lv !== null) return <li key={indx}> 
               <paper-icon-button onClick={this.handleRemoveMobile} icon="close" style ={{color:'red', width:'32px', height:'32px'}}>
               </paper-icon-button>{lv} 
               <input type='hidden' value={lv} name="mobilenumber" readOnly />
               </li>}.bind(this))}
            </ul>
            </div>
             </div>
             </div>
             </div>
             );
    }

    handleInfoSubmit()
    {

    } 

    animateLoad(event)
    {
      
        $('#maindiv').fadeTo('slow',1);
       
        
    }

}
export default BusinessInfoComponent;
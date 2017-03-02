import React from 'react';
import $ from 'jquery'; 
class MapComponent extends React.Component{

constructor() 
{
    super();
    var mark;
    if(this.props !== undefined && this.props.markers)
     mark =this.props.markers;
    else 
      mark =[];
    this.state = {map:'', markers:mark, latlang:'', markercoll:[],searchRes:[]}
}
componentDidMount()
{
     
     var mp=this;
     this._map.innerHTML='<google-map id="gmap" zoom="15"  click-events api-key="AIzaSyDaFDezXQf6QryH2oFfewgZM3TgZRrh_AE" }></google-map>';
   
    var browserSupportFlag = new Boolean();
    if(navigator.geolocation) {
    var map = document.getElementById('gmap');
     $.get(
    '/user/getlocationdetails/'+this.props.uid,(success)=>{
      if(success.mapMarkers)
         this.setState({markers:success.mapMarkers, businesstype:success.servicename});

    if(map.map)
    {
       this.getGeolocation();
      this.setMapCenter();
      
    
    
     //this.props.mapLoaded({a:'DM'})
     
     map.map.addListener('dragend', ()=>
     {
          this.updateByLocSelected(map.map);

     });
     
    }
    else
    {

      map.addEventListener('google-map-ready',function(e)
       {
        map.map.addListener('dragend', ()=>
        {
          this.updateByLocSelected(map.map);

         });
         mp.getGeolocation();
        mp.setMapCenter();
        mp.findCountryCurrent(map.map);
        
        
      /* browserSupportFlag = true;
       navigator.geolocation.getCurrentPosition(function(position) {
       var  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     
      map.map.setCenter(initialLocation);
      mp.createMarkers(map.map);
     });*/
    });
    }

    }

   

   );
    
    
    }
    else{
        alert('We are sorry but we do not cater for dinosaurs.. sorry');
    }
    
      //this.myMap.apiKey='AIzaSyDaFDezXQf6QryH2oFfewgZM3TgZRrh_AE';
      //console.log(this.myMap.apiKey);
      //document.getElementById('mp').apiKey= 'AIzaSyDaFDezXQf6QryH2oFfewgZM3TgZRrh_AE';
 
    
}

updateByLocSelected(map)
{
   this.setMapCenterDraged(map);
}

setMapCenterDraged(map)
{
  var center = map.getCenter();
 
  map.setCenter(center);
  this.searchMap();
}

setMapCenter()
    {
      
      var mp=this; 
       this.getGeolocation();
      if(navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {
      var  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      var map = document.getElementById('gmap');
     
     
       map.map.setCenter(initialLocation);
       mp.findCountryCurrent(map.map);
        google.maps.event.addListener(map.map, 'dblclick', function(e) {
               // map.setZoom(15);
              
               
                 mp.placeMarker(e.latLng, map.map);
    
        });
     
      mp.createMarkers(map.map);
      });
      }
      else{
          alert('we are sorry we do not support dinosaurs');
      }
     
  
    }
createMarkers(map)
{
    var mp = this;
    for(var i = 0; i < this.state.markers.length;i++)
    {
    
    if(this.state.markers[i] === null)
      continue;   
   
    var infowindow = new google.maps.InfoWindow();
     infowindow.setContent(mp.props.businessname);
     var id = mp.state.markers.length;
    var iconBase = '/image/marker.png';
    var opts = JSON.parse(JSON.stringify(this.state.markers[i]));
     opts.map = map
    
  
     var marker = new google.maps.Marker(opts);
     
     infowindow.open(map, marker);
     marker.addListener('rightclick', function() {
      
        
         var nmarker = mp.state.markercoll[this.id];
         delete mp.state.markercoll[this.id];
         mp.state.markers.splice(this.id,1);
         //delete mp.state.markers[this.id];
         
         nmarker.setMap(null);
         
         
     });
     marker.infowindow = infowindow;
    mp.state.markercoll[marker.id] =marker;
    marker.addListener('click', function() {
    this.infowindow.close();
    var infowindowcl = new google.maps.InfoWindow();
    infowindowcl.setContent(mp.props.businessname);
    infowindowcl.open(map, this);
     }); 
    
   
   
   /// mp.minpt.value = marker.id;
   
    map.panTo(opts.position);
    }
    
}
drawMarker(e)
{   e.preventDefault();
    var mp=this;
    var map =document.getElementById('gmap').map;
    console.log( e.target.parentNode);
    var lat = e.target.parentNode.querySelector('input[name="latvalue"]').value;
    var lng = e.target.parentNode.querySelector('input[name="lngvalue"]').value;
    var id = this.state.markers.length;
     var position = {lat:parseFloat(lat), lng:parseFloat(lng)};
      console.log(position);
    console.log(lat,lng);
    var opts = {
       
     position:position,
      icon: '/image/marker.png',
      title:mp.props.businessname,
      optimized:false,
      id:id,
       map:map
    }
     var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker(opts);
    infowindow.setContent(mp.props.businessname);
    infowindow.open(map, marker);
     marker.addListener('rightclick', function() {
         var nmarker = mp.state.markercoll[this.id];
         delete mp.state.markercoll[this.id];
         mp.state.markers.splice(this.id,1);
         //delete mp.state.markers[this.id];
         nmarker.setMap(null);
         
         
     });
    marker.addListener('click', function() {
    infowindow.setContent(mp.props.businessname);
    infowindow.open(map, marker);
     }); 
    
    mp.state.markercoll[marker.id] =marker;
   mp.state.markers[id] = { position:position,
      icon: '/image/marker.png',
      title:mp.props.businessname,
      optimized:false,
      id:id}
   /// mp.minpt.value = marker.id;
   
    map.panTo(opts.position); 
  
}
formSubmit(e)
{
  
    var mp = this;
    e.preventDefault();
    //seems to be giving problems
   var markers = this.state.markers;
   var id = document.getElementById('_id').value;
   console.log(markers);
   var mapdata = JSON.stringify({_id:id, markers:markers});
   $.ajax({
       method:'POST',
       dataType:'json',
       data:mapdata,
       url:'/user/savelocationdetails',
       beforeSend:function(){startSpinner();},
       success:function(res)
       {
           stopSpinner();
           
           mp.props.formSubmit(res);
           if(res.success !== false)
             showToast('Location details have been saved'); 
       }

   });
}
searchMap()
{
  var mp =this;
    var map = document.getElementById('gmap').map;
      var service = new google.maps.places.PlacesService(map);
    var type  = this.state.businesstype;
     console.log(type);
    var lat= map.center.lat();

    var long = map.center.lng();
    console.log(this.props.businessname);
    var loc =   new google.maps.LatLng(lat,long);//{lat: lat, lng: long};
     var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
    
    var request = {
    location: loc,
    radius: '500', 
 //  type:type,
    name:this.props.businessname,
  };
 

  service.nearbySearch(request, (result,status)=>{
      console.log(status, 'quer status');
      if(result.length > 0 )
         {
             console.log(result);
             mp.createPlacesDiv(result);
             mp.setState({stext: 'We found these business in your area with the same name as yours'});  
         }
  
});
 
}

findCountryCurrent(map)
{
  
  var geocoder = new google.maps.Geocoder();
  var mp= this;
geocoder.geocode( {location:map.center}, function(resultsgc, statusgc) {
 var country ='';
 var countryCode = '';
  console.log(resultsgc,'gcres');
 
 if (statusgc == google.maps.GeocoderStatus.OK) {
         
          var f;
          var  countryarr;
          for(var i=0;i<resultsgc.length; i++)
          {
             f  = resultsgc[i].address_components.find(function(value)
              {  
                  //var con;
                  return(value != undefined);
                  
                   
              });
             if(f)
             {
              countryarr = resultsgc[i].address_components;
              break;
             }
          }
         
           if(countryarr)
           {
             
            for(var fa = 0; fa<countryarr.length; fa++)
            {
             var ct =  countryarr[fa].types.find((val)=>{
                  return val = 'country';
              });

              if(ct === 'country')
              {
                country = countryarr[fa].long_name;
                countryCode = countryarr[fa].short_name; 
                break;
              }
              
            }
           }
         
       //callback
     // console.log(mp.props);
     
      var obj ={country:country, countrycode:countryCode};
      console.log(obj, 'coded');
       mp.props.mapLoaded({country:countryCode,  countryname:country});
     mp.setState(obj);
    
       
      
     }
});
}

searchGeocode()
{
    var geocoder = new google.maps.Geocoder();
      var map = document.getElementById('gmap').map;
       var service = new google.maps.places.PlacesService(map);
   console.log(map.country);
    var lat= map.center.lat();
    var long = map.center.lng();
    var loc = {lat: lat, lng: long};
      var mapOptions = {
      zoom: 8,
      center: loc
    }
    var mp= this;
     var country = '';
   var address = mp.state.businessname;
    geocoder.geocode( {location:map.center}, function(results, status) {
    
      if (status == google.maps.GeocoderStatus.OK) {
          var f;
          for(var i=0;i<results.length; i++)
          {
             f  = results[i].types.find(function(value)
              {  
                  //var con;
                  return(value ==='country');
                  
                   
              });
             
          console.log(f);
         if(f ==='country')
         {  
             country = results[i].formatted_address;
            break;
             
         }
       }
          geocoder.geocode( {location:map.center,address: 'aid bank',
              componentRestrictions: {
             country: country
          }}, function(results, status) {
              console.log(results);
          });
       /* map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });*/
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  
}
addloc(e)
{e.preventDefault();
  alert('bim');  
}
createPlacesDiv(result)
{
  
  
  //  var pdic ='<div>';
  this.setState({searchRes:result});
  /* for(var i in result)
   {
       console.log(result[i]);
       pdic+='<div class="btstyle"><p>'+result[i].name+'</p><p>'+result[i].formatted_address+'</p><button onClick={this.addloc}></div>';
       
   }
   pdic +='</div>';
    this._mdiv.innerHTML=pdic;*/
}
    placeMarker(position, map) {
    var marker;
    var mp=this;
    var infowindow = new google.maps.InfoWindow();
     infowindow.setContent(mp.props.businessname);
     var id = mp.state.markers.length;
    var iconBase = '/image/marker.png';
    var mopts = {
      position: position,
     
     icon: iconBase,
      title:mp.props.businessname,
      optimized:false,
      id:id,
       map:map
    }
   
    mp.state.markers[id]={icon: iconBase,
      title:mp.props.businessname,
      optimized:false,
      id:id,
      position:{lat:position.lat(),
      lng: position.lng()}
      
    };
    console.log(mp.state.markers, 'markers');
     marker = new google.maps.Marker(mopts);
    infowindow.open(map, marker);
     marker.addListener('rightclick', function() {
         var nmarker = mp.state.markercoll[this.id];
         delete mp.state.markercoll[this.id];
          mp.state.markers.splice(this.id,1);
        // delete mp.state.markers[this.id];
         nmarker.setMap(null);
         
     });
    marker.addListener('click', function() {
    infowindow.setContent(mp.props.businessname);
    infowindow.open(map, marker);
     }); 
    
    mp.state.markercoll[marker.id] =marker;
   
   /// mp.minpt.value = marker.id;
   console.log(mp.state.markers);
    map.panTo(position);
    }

 getGeolocation()
   {
     var browserSupportFlag =  new Boolean();  
     
    var mp = this;

    if(navigator.geolocation) {
    var map = document.getElementById('gmap');
   // map.addEventListener('api-load',function(e)
    //{
      
       browserSupportFlag = true;
       navigator.geolocation.getCurrentPosition(function(position) {
       var  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     
      map.map.setCenter(initialLocation);
      mp.searchMap();
     /*google.maps.event.addListener(map.map, 'dblclick', function(e) {
               // map.setZoom(15);
              
               
                 mp.placeMarker(e.latLng, map.map);
    
     });*/
    }, 
    function() {
      handleNoGeolocation(browserSupportFlag);
    });
   // });
   
   
    }
    else
    {
      browserSupportFlag = false;
    }
   }
   markersChanged(e)
   {   this.setState({latlang:e.target.value});
       console.log(this.state.markers);
   }
render()
{  
    return(
        <div style={{height:'600px'}}>
        <form onSubmit={(event)=>this.formSubmit(event)}>
        <div style={{height:'600px', width:'60%' ,display:'inline-block'}}>
        <p style={{fontSize:'16pt', color:'#294b77'}}>Choose a location on the map where your place of business is</p>
        <div style={{height:'400px', width:'100%' , border:'1px solid rgba(139,195,74,0.3)', boxShadow:'1px 3px 1px 1px #ccc', borderRadius:'4px', display:'inline-block'}} ref={(m)=> this._map = m}>{this.state.map}
        
        </div>
        <p> <button>Save Location</button></p>
        </div>
        <div ref={(dv)=>this._mdiv = dv} style={{width:'30%',  display:'inline-block', paddingLeft:'10px', verticalAlign:'top'}}>
        <p>{this.state.stext}</p>
        <ul style={{padding: '0px', margin: '0px'}}>
        {this.state.searchRes.map((lv,indx)=>{ if(lv && lv.name && (lv.name.toLowerCase().includes(this.props.businessname.toLowerCase()) || this.props.businessname.toLowerCase() === lv.name.toLowerCase()))
             return (<li  className="btstyle" key={indx}><p>{lv.name}</p>
             <p>{lv.formatted_address}</p><button onClick={(e)=>this.drawMarker(e)}>+ Loc</button>
             <input type="hidden" value={lv.geometry.location.lat()} name="latvalue" />
              <input type="hidden" value={lv.geometry.location.lng()} name="lngvalue" />
             </li>)})}
        </ul>
        </div>
         
         </form>
        </div>);
}   
}
export default MapComponent;

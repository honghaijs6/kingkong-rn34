import { GREY_COLOR, COFFEE_COLOR, GOOGLE_MAP_KEY } from '../../config/const';
import RetroMapStyle from '../../data/retroStyle.json';

import STORE_LOCATIONS from '../../data/stores.json';


import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container } from 'native-base';


import BenHeader from '../../components/BenHeader' ;
import BoxSearch from './boxSearch';


export default class StorePage extends Component{



  constructor(props){

    super(props);

    this.state  = {

      typeAction:'',
      onAction:'',
      tab:'store',

      currentAdress:'',
      region:{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },

      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      },
      hasLocationPermissions: false,
      locationResult: null,

      markers:[
        {
          "id":377,"stationName":"6 Ave & Canal St","availableDocks":22,"totalDocks":45,"latitude":40.72243797,"longitude":-74.00566443,"statusValue":"In Service","statusKey":1,"availableBikes":19,"stAddress1":"6 Ave & Canal St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2019-01-23 11:43:33 AM","landMark":""
        },


      ]


    };
  }


  _addressToLatLng(address,onSuccess){

     address = address.replace('#',',');

     const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address= '+address+'&key='+GOOGLE_MAP_KEY ;
     fetch(uri)
     .then((response) => response.json())
     .then((responseJson) => {

       const location = responseJson.results[0]['geometry']['location'];
       onSuccess(location);

     })
     .catch((error) => {
       console.error(error);
     });

  }


  componentDidMount(){

    const defAddress =  STORE_LOCATIONS[0]['address'];

    this.setState({
      currentAdress:defAddress
    })

    /*this._addressToLatLng(defAddress,(latLng)=>{



    });*/


  }

  _onItemAddressPress(address){
    this._geoCodeAddress(address);
  }

  _geoCodeAddress(address){

    address = address.replace('#',',');
     const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address= '+address+'&key='+GOOGLE_MAP_KEY ;

     fetch(uri)
     .then((response) => response.json())
     .then((responseJson) => {

       const location = responseJson.results[0]['geometry']['location'];

       this.setState({

         currentAdress:address,
         mapRegion:{
           latitude:location.lat,
           longitude:location.lng,
           latitudeDelta: 0.0025,
           longitudeDelta: 0.0025,
         }
       });



     })
     .catch((error) => {
       console.error(error);
     });
  }

  render(){

    const { mapRegion } = this.state

    if(this.props.onTab === this.state.tab){

      
      return(   
        <Container style={{
          backgroundColor:GREY_COLOR,
          display:  this.props.onTab === this.state.tab ? 'flex':'none'
        }}>
  
          <BenHeader type="single">
              <View>
                <Text style={{
                  fontSize:18,
                  fontFamily:'Roboto'
                }}> Stores </Text>
              </View>
          </BenHeader>
  
  
          <MapView
            style={{ flex: 1 }}
  
            
            showsUserLocation={ true }
            customMapStyle={  
              RetroMapStyle
            }
  
            region={mapRegion}
  
          >
              <Marker draggable
                 coordinate={{
                   latitude:mapRegion.latitude,
                   longitude: mapRegion.longitude,
                 }}
  
                 pinColor={ COFFEE_COLOR }
                 title={'King Kong Milk Tea'}
  
  
  
              >
              </Marker>
  
          </MapView>
  
          <BoxSearch
              onItemAddressPress={ (address)=>{ this._onItemAddressPress(address) } }
              keyFind={ this.state.currentAdress } data={ this.props.stores }  
              onCloseSearch={ ()=>{ this._onCloseSearch() } }
  
          />
  
  
  
        </Container>
  
      )
    }

    return <View></View>

    
  }
}

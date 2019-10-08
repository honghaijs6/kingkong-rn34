import USER from '../../config/user';

import {  COFFEE_COLOR, GOOGLE_MAP_KEY, TIMEOUT } from '../../config/const';
import RetroMapStyle from '../../data/retroStyle.json';

import STORE_LOCATIONS from '../../data/stores.json';


import React, { Component } from 'react';
import {connect} from 'react-redux';

import { View, Text,  SafeAreaView,  TouchableOpacity, Keyboard  } from 'react-native';


import MapView, { Marker, PROVIDER_GOOGLE,  } from 'react-native-maps';

//import {  Location } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Toast from 'react-native-easy-toast';



import { Container,  } from 'native-base';

import BenLoader from '../../components/BenLoader';
import BenStatusBar from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader' ;
import BackButton from '../../components/BackButton';
import BenBody from '../../components/BenBody';


import BoxSearch from './boxSearch';

class MapPage extends Component{


  constructor(props){

    super(props);

    this.state = {

        loader:false,
        settingFor:'',
        userInfo:props.userInfo,
        countMapChange:0,
        data:[],
        keyFind:'',
        currentAdress:'',
        typeAction:'',
        onAction:'',

        region:{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,

        },

        mapRegion: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
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



  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });


   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });

   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0025, longitudeDelta: 0.0025 }});
  };

  _handleMapRegionChange = mapRegion => {

    //this.setState({ mapRegion });
    const latLng = mapRegion.latitude+','+mapRegion.longitude;
    const curLatLng = this.state.mapRegion.latitude+','+this.state.mapRegion.longitude;

    if(this.state.countMapChange > 0){
      this._geoCode(mapRegion);

    }
    this.state.countMapChange +=1 ;


  };


  _onItemAddressPress(address){
    this._geoCodeAddress(address);
  }

  async _onSelectCurrentAddress(){
    /* UPDATE DATA USER INFO */
    this.state.userInfo[this.state.settingFor] = this.state.currentAdress;

    this.setState({loader:true});
    
    const resMsg = await USER.update(this.state.userInfo.id,{
      name:this.state.userInfo.name,
      [this.state.settingFor]:this.state.currentAdress
    });
    this.setState({loader:false})

    this.refs.toast.show(resMsg,3000);


  }

  _addressToLatLng(address,onSuccess){
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

  _geoCodeAddress(address){
     const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address= '+address+'&key='+GOOGLE_MAP_KEY ;

     fetch(uri)
     .then((response) => response.json())
     .then((responseJson) => {

       const location = responseJson.results[0]['geometry']['location'];

       this.setState({
         data:[],
         currentAdress:address,
         mapRegion:{
           latitude:location.lat,
           longitude:location.lng,
           latitudeDelta: 0.0025,
           longitudeDelta: 0.0025,
         }
       });

       this._onCloseSearch();


     })
     .catch((error) => {
       console.error(error);
     });
  }

  _geoCode(mapRegion){
    const latLng = mapRegion.latitude+','+mapRegion.longitude;
    const uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng= '+latLng+'&key='+GOOGLE_MAP_KEY ;

    fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {

      const address = responseJson.results[0]['formatted_address'];


      this.setState({
        mapRegion:mapRegion,
        keyFind:address,
        currentAdress:address
      });

      Keyboard.dismiss();


    })
    .catch((error) => {
      console.error(error);
    });


  }

  _onCloseSearch(){

    Keyboard.dismiss();
    this.setState({
      keyFind:'',
      data:[],
    })
  }
  _addressAutoComplete(key){

    let uri = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+key+'&key='+GOOGLE_MAP_KEY;
    fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {

      const locations = responseJson.predictions;
      let data = [];
      locations.map((item)=>{
        data.push({
          code:'search',
          icon:'pin',
          label:'',
          name:item.description
        });
      })

      this.setState({
        keyFind:key,
        data:data
      })

    })
    .catch((error) => {
      console.error(error);
    });


  }

  componentDidMount(){

    const defAddress = this.state.userInfo[this.state.settingFor] || STORE_LOCATIONS[0]['address'];
    this._addressToLatLng(defAddress,(latLng)=>{

      this.setState({
        keyFind:this.state.userInfo[this.state.settingFor],
        currentAdress:this.state.userInfo[this.state.settingFor],
        mapRegion:{
          latitude:latLng.lat,
          longitude:latLng.lng,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }
      });

    });






  }
  render(){

    const { mapRegion } = this.state
    this.state.settingFor = this.props.navigation.getParam('for');

    const arr = {
      home_address:"Add your home address",
      work_address:"Add your work place address"
    }


    return(
      <Container>
        <BenStatusBar></BenStatusBar>
        <BenHeader >

            <BackButton onPress={()=>{ this.props.navigation.goBack() }}></BackButton>
            <View>
              <Text style={{
                fontSize:18,
                fontFamily:'Roboto'
              }}>  { arr[this.state.settingFor] }  </Text>
            </View>
            <View></View>
        </BenHeader>

        <BenLoader visible={this.state.loader} />

        <MapView
          style={{ flex: 1 }}
          
          showsUserLocation={ true }
              
          region={mapRegion}

          onRegionChangeComplete={this._handleMapRegionChange}
        >
              <Marker draggable
                 coordinate={ {
                   latitude:mapRegion.latitude,
                   longitude: mapRegion.longitude,
                 } }

                 pinColor={ COFFEE_COLOR }
                 title={'Coffee Shop here '}

              >
              </Marker>

        </MapView>

        <BoxSearch onItemAddressPress={ (address)=>{ this._onItemAddressPress(address) } } keyFind={ this.state.keyFind } data={ this.state.data }  onCloseSearch={ ()=>{ this._onCloseSearch() } }  onChangeText={(text)=>{ this._addressAutoComplete(text) }} />

        <SafeAreaView style={{
            bottom: 20,
            position: 'absolute',
            width: '100%',
          }}>

              <BenBody width="90%">
                <TouchableOpacity onPress={ ()=>{ this._onSelectCurrentAddress() } } style={{
                    height: 50,
                    backgroundColor: COFFEE_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.5,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 6
                  }}>
                  <Text style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      color: '#fff'
                    }}> Select this location </Text>
                </TouchableOpacity>
              </BenBody>


          </SafeAreaView>

          <Toast position='top'
          positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}

           ref="toast"/>


      </Container>

    )
  }
}

function mapStateToProps(state){
  return {
    userInfo:state.user.userInfo
  }
}


export default connect(mapStateToProps)(MapPage);

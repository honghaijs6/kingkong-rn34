/* @flow */


import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Vibration
} from 'react-native';

import { Container } from 'native-base';



import BenStatusBar from '../components/BenStatusBar';
import BenHeader from '../components/BenHeader';
import BackButton from '../components/BackButton';



export default class Scanner extends Component {


  constructor(props){
    super(props);

    this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    }


  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {

    Vibration.vibrate(2000)


    this.props.navigation.navigate('CouponPage',{
        data:data
    });

  };




  render() {



    return (
      <Container>
        <BenStatusBar/>

        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <View>
            <Text style={s.title}> Scanner  </Text>
          </View>
          <View></View>
        </BenHeader>

        <View style={s.bg}>


            <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{ height: 300, width: 300, marginTop:-60 }}
            />
        </View>

      </Container>
    );
  }
}

const s = StyleSheet.create({

  bg:{
      backgroundColor:'#333',
      width:'100%',


      justifyContent:'center',
      alignItems: 'center',
      height:'100%'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize:18
  },
});

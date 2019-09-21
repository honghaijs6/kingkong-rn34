/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions

} from 'react-native';

import { Icon } from 'native-base';

const HEIGHT = Math.round(Dimensions.get('window').height);

const BenLoader = function(props){

  let isDisplay = props.visible ? 'flex':'none';   



  return(
    <View style={{
      position: 'absolute',
      zIndex: 3000,
      
      left: 0,
      right:0,
      top: HEIGHT/2 - 34 ,
      
      alignItems: 'center',
      justifyContent: 'center' 
    }}>
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 6,
        display: isDisplay,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(59, 133, 63,0.7)',
      }}>
          <ActivityIndicator visible={ props.visible } color="#fff" size="large" />
          <Text style={{
            color:'#fff',
            fontSize:11
          }}> King Kong...  </Text>
      </View>

    </View>
  )
}

export default BenLoader;

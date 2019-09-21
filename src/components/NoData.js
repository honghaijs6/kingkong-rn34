/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Icon } from 'native-base'
import { COFFEE_COLOR } from '../config/const';

const NoData = (props) => {

  const isDisplay = props.visible ? 'flex' : 'none';
  return (
    <View style={{
      alignItems:'center',
      marginTop:30,
      marginBottom:30,
      display:isDisplay
    }}>
      <View style={{
        width:120,
        height:120,
        borderRadius:60,
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,0.1)',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.3)'
      }}>
        <Icon style={{ fontSize:60, color:COFFEE_COLOR }} name={props.icon} />
      </View>
      <Text style={{
        marginTop:20,
        textAlign: 'center',
        fontFamily:'Roboto'
      }}>
        { props.message }
      </Text>
    </View>

  );
};

export default NoData;

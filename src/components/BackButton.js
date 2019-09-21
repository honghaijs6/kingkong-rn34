/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {  Icon } from 'native-base';


const BackButton = (props) => (

  <View style={{
    flexDirection: 'row',
    alignItems: 'center'
  }}>
      <TouchableOpacity onPress={()=>{ props.onPress() }}  style={{
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
         <Icon style={s.icon} name="arrow-back" />

      </TouchableOpacity>
      { props.children }
  </View>

);

export default BackButton;

const s = StyleSheet.create({
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  icon:{
    fontSize: 30,

  }
})

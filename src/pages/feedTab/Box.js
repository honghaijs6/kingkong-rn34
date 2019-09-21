/* @flow */
import {  COFFEE_COLOR } from '../../config/const'


import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';


export default class Box extends Component {
  render() {

    const { code, name} = this.props.data;
    return (
      <TouchableOpacity onPress={ this.props.onPress } style={{
        height:90,
        width:'32%',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,.1)',
        borderRadius:10,

      }}>
        <Icon style={{
          color:COFFEE_COLOR
        }} name={ code } />
        <Text style={{fontFamily:'Roboto'}}> { name } </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

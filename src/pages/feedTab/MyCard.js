/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class MyCard extends Component {

  
  render() {
    return (
      <View style={{
        marginTop:10,
        borderWidth:0.5,
        width:'95%',
        backgroundColor:'#fff',
        borderColor:'rgba(0,0,0,0.1)'
      }}>

        { this.props.children }

      </View>
    );
  }
}

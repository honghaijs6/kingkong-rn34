/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class CardFooter extends Component {
  render() {
    return (
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        alignItems:'center',
        borderTopWidth:0.5,
        borderTopColor:'rgba(0,0,0,0.1)',
        paddingRight:20,
        paddingLeft:20
      }}>
        { this.props.children }
      </View>
    );
  }
}

/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class OrderBody extends Component {
  render() {
    return (
      <View style={{
        alignItems:'center',
        paddingTop:10,
        paddingBottom:20
      }}>

          <View style={{
              width: '95%'
            }}>

              { this.props.children }


          </View>

      </View>
    );
  }
}

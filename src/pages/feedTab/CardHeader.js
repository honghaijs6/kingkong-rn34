/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class CardHeader extends Component {
  render() {
    return (
      <View style={{
        flexDirection:'row',
        paddingTop:10,
        paddingBottom:10,

      }}>
        { this.props.children }
      </View>
    );
  }
}

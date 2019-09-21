/* @flow */

import React, { Component } from 'react';
import {
  View,

  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon, Text } from 'native-base';

import { BLACK_COLOR, RED_COLOR } from '../config/const';


export default class BenNoti extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity style={ styles.container} onPress={ this.props.onPress  }>
          <Icon style={{color:BLACK_COLOR}} name="notifications" />
          <View style={{
            borderRadius:5,
            width:'auto',
            height:15,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            right:8,
            top:-3,
            backgroundColor:RED_COLOR
          }} danger>
            <Text style={{ fontSize:11, color:'#fff', display: 'none'}}> 10 </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:50,
    alignItems:'center',
  },
});

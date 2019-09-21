/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon,Thumbnail} from 'native-base';

import { COFFEE_COLOR, BLACK_COLOR,GREY_COLOR } from '../config/const';

export default class MyComponent extends Component {
  render() {

    const {uri,name,point} = this.props.data ;

    return (
      <TouchableOpacity  onPress={ this.props.onPress } style={{
        paddingLeft:10,
        flexDirection:'row'
      }}>

            <Thumbnail small source={{uri:uri}} />
            <View style={{
              marginLeft:5
            }}>
                <Text style={{ fontFamily:'Roboto' }}> { name } </Text>
                <Text style={{ color:COFFEE_COLOR, fontWeight:'bold', fontSize:16 }}> { point } <Icon style={{ fontSize:16, color:COFFEE_COLOR}} name="star" /> </Text>
            </View>


      </TouchableOpacity>
    );
  }
}

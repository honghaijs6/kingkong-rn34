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

    const {uri,name,info} = this.props.data ;

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
                <Text style={{ fontFamily:'Roboto', color:COFFEE_COLOR, fontSize:12 }}> { info }  </Text>
            </View>


      </TouchableOpacity>
    );
  }
}

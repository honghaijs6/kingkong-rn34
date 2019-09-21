/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {  Icon } from 'native-base';

const PINK = '#F86C6B';
const GREY = '#333333';

const LikeButton = (props) => {

  
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
          <TouchableOpacity
            onPress={ props.onPress }  
            style={{
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>  
            <Icon style={[
              s.icon,{
                color: props.isLiked ? PINK : GREY
              }
            ]} name="heart" />
    
          </TouchableOpacity>
          { props.children }
      </View>
  )
};

export default LikeButton;

LikeButton.defaultProps = {
  onPress:()=>{},
  isLiked:false
}

const s = StyleSheet.create({
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  icon:{
    fontSize: 30,

  }
})

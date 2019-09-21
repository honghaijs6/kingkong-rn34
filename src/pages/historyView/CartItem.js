/* @flow weak */
import {BLACK_COLOR, COFFEE_COLOR}  from '../../config/const';


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const CartItem = (props) => (
  <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.2)'}}>
      <View style={ [s.row,{ justifyContent: 'space-between'}] }>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
            <View style={{
              borderWidth: 0.5,
              borderColor: BLACK_COLOR,
              justifyContent: 'center',
              width: 30, height: 30,
              alignItems: 'center'
            }}>
              <Text> {  props.data.amount } </Text>
            </View>

            <Text style={{color:COFFEE_COLOR}}> { props.data.name } </Text>
        </View>

        <View style={{alignItems: 'center', height: 30}}>
            <Text style={{fontFamily:'Roboto',fontSize:14}}> { props.data.price } $ </Text>
        </View>

      </View>
  </View>
);

export default CartItem;

const s = StyleSheet.create({
  row:{
    flexDirection: 'row',
    marginVertical: 10
  },
})

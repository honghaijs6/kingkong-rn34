/* @flow weak */

import styles from '../../style/styles';


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {BLACK_COLOR, COFFEE_COLOR}  from '../../config/const';

//import console = require('console');



const SubProItem = (props)=>{

  return(
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
                <Text> 1 </Text>
              </View>
              
              <View  style={{marginLeft: 10}}>
                  <Text> { props.data.name } </Text>
              </View>

              
          </View>

          <View style={{alignItems: 'center', justifyContent:'center', height: 30}}>
              <Text> { props.data.price } $ </Text>
        </View>
    </View>
  )
}

const CartItem = (props) => {

  
  const { data } = props ;

  let subpros = data.bonus !== undefined ? data.bonus.subpro || [] : [] ;
  

  return(
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
              
              {
                props.data.price > 0 ? 
                <TouchableOpacity onPress={()=>{ props.onItemSelect(props.data) }} style={{marginLeft: 10}}>
                  <Text style={[styles.textUnderline,{color:COFFEE_COLOR}]}> { props.data.name } </Text>
                </TouchableOpacity>:
                <View onPress={()=>{ props.onItemSelect(props.data) }} style={{marginLeft: 10}}>
                  <Text> { props.data.name } </Text>
                </View>
              
              }
              
          </View>

          <View style={{alignItems: 'center', justifyContent:'center', height: 30}}>
              <Text> { props.data.price } $ </Text>
          </View>

        </View>
        
        
        {/* subpro */}
        {
          subpros.length > 0 ?
          subpros.map((item)=>{
            return(
              <SubProItem key={ item.id } data={ item } />
            )
          }):null
        }
  

    </View>
  )
}

export default CartItem;

const s = StyleSheet.create({
  row:{
    flexDirection: 'row',
    marginVertical: 10
  },
})

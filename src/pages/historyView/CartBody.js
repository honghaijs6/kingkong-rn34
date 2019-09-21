/* @flow weak */
import { GREY_COLOR, COFFEE_COLOR, RED_COLOR, BLACK_COLOR } from '../../config/const' ;


import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';



import CartItem from './CartItem';

export default class  CartBody extends Component{

  constructor(props){
    super(props);

    this.state = {
      userInfo:props.userInfo
    }

  }

  calculateBill(data){

    let total = 0
    data.map((item)=>{
       total += item.amount * item.price
    });

    return total;
  }
  render(){

    const data = this.props.data;
    const cart = JSON.parse(data.cart);
    const userInfo = JSON.parse(data.user);

    return(
      <View>
          <View style={{margin: 10}}>
            <Text style={{ fontFamily: 'Roboto'}}>Delivery infomation </Text>
          </View>

          <View style={{
            padding: 10,
            backgroundColor: '#fff'
          }}>

            {/*ROW*/}
            <View style={ s.row }>

              <Icon style={s.icon} name="contact" />
              <Text style={{color:'#999',fontFamily:'Roboto',fontSize:14}}>{ userInfo.name } </Text>

            </View>

            <View style={ s.row }>

              <Icon style={s.icon} name="call" />
              <Text style={{color:'#999',fontFamily:'Roboto',fontSize:14}}>{ userInfo.phone } </Text>

            </View>

            <View style={ [s.row,{width:'90%'}] }>

              <Icon style={s.icon} name="pin" />
              <Text style={{color:'#999',fontFamily:'Roboto',fontSize:14}}>{ data.delivery } </Text>

            </View>

          </View>

          {/* BLOCK 2 */}
          <View style={{margin: 10}}>
            <Text style={{ fontFamily: 'Roboto'}}>Your Orders detail </Text>
          </View>

          <View style={s.block}>

              {
                cart.map((item,index)=>{
                  return(
                    <CartItem key={index}  data={item} />
                  )
                })
              }


              {/* TOTAL */}
              <View style={{
                padding: 0,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>

                <View>
                  <Text style={s.txt}> Total </Text>
                </View>

                <View>
                  <Text style={[s.txt, {fontSize: 20, color: COFFEE_COLOR}]}> { this.calculateBill(cart) } $ </Text>
                </View>

              </View>

              {/* visa master cart */}
              <View style={{
                paddingVertical: 10,
                borderTopColor: 'rgba(0,0,0,0.2)',
                borderTopWidth: 0.5,
                padding: 0,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>

                <View style={{flexDirection: 'row'}}>
                  <Icon name="card" style={{fontSize: 20, color:COFFEE_COLOR, marginRight: 10, marginLeft: 5}} />
                  <Text style={s.txt}> Visa/Master/JCB </Text>
                </View>


              </View>

          </View>
      </View>
    )
  }
}

const s = StyleSheet.create({

  txt:{
    fontFamily: 'Roboto',
    fontSize: 14
  },
  block:{
    padding: 10,
    backgroundColor: '#fff'
  },
  row:{
    flexDirection: 'row',
    marginVertical: 10
  },
  input:{
    width: '80%',
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  icon:{
    fontSize:26,
    color: COFFEE_COLOR,
    marginHorizontal: 15
  }
});

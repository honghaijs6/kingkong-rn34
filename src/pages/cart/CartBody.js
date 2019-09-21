/* @flow weak */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import { Icon } from 'native-base';
import {  COFFEE_COLOR, } from '../../config/const' ;

import CartItem from './CartItem';

const iconPayPal = require('../../../assets/icon-paypal.png');

export default class  CartBody extends Component{

  constructor(props){
    super(props);

    this.state = {
      userInfo:props.userInfo
    }

  }

  calculateBill(data,discount=0){

    let total = 0
    data.map((item)=>{
       total += item.amount * parseFloat(item.price);

       if(item.bonus !== undefined){

         if(item.bonus.subpro){
          const { subpro } = item.bonus;
          subpro.map((item2)=>{
            total += parseFloat(item2.price)
          });
          
         }

         
       }

    });

    // ADD ON BONUS 



    return parseFloat(total - discount).toFixed(2);

  }

  calculateCoupon(json){
    let discount = 0 ;

    if(JSON.stringify(json)!=='{}'){
      const total = this.calculateBill(this.props.data) ;
      discount = (total * json.value)/100;
    }

    return parseFloat(discount).toFixed(2) ;


  }

  render(){

    const styleDisPlayCoupon = this.props.coupon.code !== undefined ? 'flex' : 'none';
    const discount = this.calculateCoupon(this.props.coupon);

    return(
      <View style={{ paddingBottom:60}}>
          <View style={{margin: 10}}>
            <Text style={{ fontFamily: 'Roboto'}}> Delivery infomation </Text>
          </View>

          <View style={{
            padding: 10,
            backgroundColor: '#fff'
          }}>

            {/*ROW*/}
            <View style={ s.row }>

              <Icon style={s.icon} name="contact" />
              <TextInput onChangeText={(text)=>{ this.props.onChangeText({name:text}) }} placeholder="Your name" value={ this.props.userInfo.name } style={s.input}  />

            </View>

            <View style={ s.row }>

              <Icon style={s.icon} name="call" />
              <TextInput keyboardType = "number-pad" onChangeText={(text)=>{ this.props.onChangeText({phone:text}) }}  placeholder="Your phone number" value={ this.props.userInfo.phone } style={s.input}  />

            </View>

            <View style={ s.row }>

              <Icon style={s.icon} name="pin" />
              <TouchableOpacity
                onPress={()=>{ this.props.onPressGotoSettingAdd() }}
                style={{
                  width: '90%'
                }}>
                <Text> { this.state.userInfo.recent_address || 'add your delivery address' } </Text>
              </TouchableOpacity>
   
            </View>

          </View>

          {/* BLOCK 2 */}
          <View style={{margin: 10}}>
            <Text style={{ fontFamily: 'Roboto'}}> Your Orders detail </Text>
          </View>

          <View style={s.block}>

              {
                this.props.data.map((item,index)=>{
                  return(
                    <CartItem key={index} onItemSelect={(data)=>{ this.props.onItemSelect(data) }} data={item} />
                  )
                })
              }

              

              {/* SUB TOTAL */}
              <View style={{
                padding: 0,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
                  <Text style={[s.txt]}> Total </Text>
                  <Text style={[s.txt]}> { this.calculateBill(this.props.data, 0 ) } $ </Text>
              
              </View>
              {/* END SUBTOTAL */}


              { /* COUPON HERE  */}
              <View style={{
                padding: 0,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                display: styleDisPlayCoupon,
                borderTopWidth:0.5,
                borderTopColor:'#ddd',
                borderBottomWidth:0.5,
                borderBottomColor:'#ddd',
                height:40,
                alignItems:'center'
                
              }}>
                  <View style={{ flexDirection:'row', alignItems:'center'}}>
                      <Icon name="pricetag" style={{marginRight: 10, fontSize:16, color:COFFEE_COLOR}} />
                      <Text style={{fontFamily:'Roboto', fontSize:16, color:COFFEE_COLOR}}> code : { this.props.coupon.code }   </Text>

                  </View>
                  <View>
                    <Text> - { discount } $ </Text>
                  </View>
              </View>
              { /* END COUPON */}


              {/* TOTAL PAYMENT */}
              <View style={{
                padding: 0,
                marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>

                <View>
                  <Text style={[s.txt,{ fontSize:18}]}> Total Payment </Text>
                </View>

                <View>
                  <Text style={[s.txt, {fontSize: 18, color: COFFEE_COLOR}]}> { this.calculateBill(this.props.data, discount ) } $ </Text>
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
                  <Image source={ iconPayPal } resizeMode="center" style={{
                    height:26,
                    width: 41
                  }} />
                </View>

                <TouchableOpacity
                  onPress={()=>{ this.props.onPressGotoCouponPage() }}
                  style={{
                    borderWidth:0.5,
                    padding:5,
                    borderColor:COFFEE_COLOR,
                    borderRadius:18,
                    backgroundColor:COFFEE_COLOR,
                    display: this.props.coupon.code !== undefined ? 'none':'flex'
                }}>
                  <Text style={{color:'#fff'}}> Get Coupon </Text>
                </TouchableOpacity>

              </View>

          </View>
      </View>
    )
  }
}

const s = StyleSheet.create({

  row:{
    padding: 0,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'

  },
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

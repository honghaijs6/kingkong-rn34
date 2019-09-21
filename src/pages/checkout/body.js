import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';

import { GREY_COLOR, COFFEE_COLOR, RED_COLOR, BLACK_COLOR } from '../../config/const' ;


export default class  CheckOutBody extends Component{


  constructor(props){

    super(props);

    this.state = {
      cardNumber:'',
      cardName:'',
      expired:'',
      cvv:''
    }



  }
  _onCheckOut(){

    this.props.onPress(this.state);
  }

  _onChangeText(json){
    this.setState(json)
  }
  render(){

    return(
      <View>

          {/*<View style={{margin: 10}}>
            <Text style={{ fontFamily: 'Roboto'}}> Visa / Master / JBC </Text>
          </View>*/}


          <View style={{
            marginTop: '10%',
            padding:30,
            backgroundColor:'#fff'
          }}>

            <Text style={{
              fontFamily: 'Roboto',
              fontSize: 15,
              alignItems: 'center'
            }}>
              { this.props.status === '' ? 'Payment will be processed via Paypal Gateway' : this.props.status }
            </Text>

            {
              this.props.status === ''?
              <TouchableOpacity onPress={ ()=>{ this.props.onPress() }} style={{
                marginTop: 15,  
                borderRadius: 6,
                width: '100%',
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COFFEE_COLOR
              }} >
                <Text style={{
                  fontFamily: 'Roboto',
                  color:'#fff',
                  fontSize: 18
                }}> Continue </Text>
              </TouchableOpacity>: null
            }


          </View>
          {/*<View style={{
            padding: 10,
            backgroundColor: '#fff'
          }}>
            <View style={ s.row }>

              <Icon style={s.icon} name="card" />
              <TextInput keyboardType = "number-pad" onChangeText={ (text)=>{ this._onChangeText({cardNumber:text}) } }  placeholder="card number"  style={s.input}  />

            </View>

            <View style={ s.row }>

              <Icon style={s.icon} name="contact" />
              <TextInput onChangeText={ (text)=>{ this._onChangeText({cardName:text}) } }  placeholder="Cart holder name"  style={s.input}  />

            </View>

            <View style={ s.row }>
              <Icon style={s.icon} name="time" />
              <TextInput onChangeText={ (text)=>{ this._onChangeText({expired:text}) } }  placeholder="Expired date"  style={[s.input,{ width: '60%'}]}  />
              <TextInput keyboardType = "number-pad" onChangeText={ (text)=>{ this._onChangeText({cvv:text}) } } placeholder="CVV"  style={[s.input,{width: '20%',padding: 5,marginRight: 10,borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.5)'}]}  />


            </View>

          </View> */}




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
    justifyContent: 'flex-start',
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

/* @flow */
import {COFFEE_COLOR, GREY_COLOR, GOOGLE_MAP_KEY} from '../../config/const';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,

} from 'react-native';

import { Icon } from 'native-base';
import BenBody from '../../components/BenBody';

export default class BoxSearchLocation extends Component {

  render() {
    return (
      <View style={{
        top: '11%',
        position: 'absolute',
        width: '100%',
      }}
      >
        <BenBody width="90%">
          <View style={{
              backgroundColor: '#fff',
              padding: 5,
              paddingHorizontal: 15,
              borderWidth: 0.5,
              borderColor: 'rgba(0,0,0,0.2)',
              flexDirection: 'row',
              alignItems: 'center'
            }}>

            <Icon name="pin" style={{fontSize: 20,color: 'rgba(0,0,0,0.5)'}} ></Icon>
            <TextInput onEndEditing={this.clearFocus} defaultValue={ this.props.keyFind } onChangeText={ (text)=>{ this.props.onChangeText(text) }} style={{
                width: '92%',
                height: 36,
                paddingHorizontal: 10,

              }} placeholder="Search" />

              <TouchableOpacity onPress={ ()=>{ this.props.onCloseSearch() }}  style={{
                  display: this.props.onAction === '' ? 'none':'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                <Icon style={{
                    fontSize:20,
                    color: 'rgba(0,0,0,0.5)'
                  }} name="close-circle" />
              </TouchableOpacity>


          </View>

          <View style={{ backgroundColor:'#fff'}}>

              {
                this.props.data.map((item,index)=>{
                  return (
                    <TouchableOpacity onPress={()=>{ this.props.onItemAddressPress(item.name) }} key={index} style={ s.btnItem }>
                      <Icon style={s.icon} name="pin" />
                      <Text style={s.txt}> { item.name } </Text>
                    </TouchableOpacity>
                  )
                })
              }

          </View>

        </BenBody>

      </View>
    );
  }
}


const s = StyleSheet.create({
  icon:{
    fontSize: 20,
    color: 'rgba(0,0,0,0.5)',
    marginRight:5
  },
  label:{
    fontSize:11,
    fontFamily:'Roboto'
  },
  title:{
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'rgba(0,0,0,0.5)'
  },
  lastBtnItem:{
    borderBottomWidth:0
  },
  btnItem:{

    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',

    borderLeftWidth: 0.5,
    borderLeftColor: 'rgba(0,0,0,0.2)',

    borderRightWidth: 0.5,
    borderRightColor: 'rgba(0,0,0,0.2)',

    alignItems: 'center',
    padding:15,

    flexDirection:'row',
    paddingRight: 10
  }
});

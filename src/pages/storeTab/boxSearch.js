/* @flow */

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

import {COFFEE_COLOR, GREY_COLOR, GOOGLE_MAP_KEY} from '../../config/const';

import BenBody from '../../components/BenBody';

import STORE_LOCATIONS from '../../data/stores.json';


export default class BoxSearchLocation extends Component {

  constructor(props){
    super(props);

    this.state = {

      isShowList:false,
      data:props.data
    }

    this._onShowList = this._onShowList.bind(this);

  }

  _onShowList(){
    this.setState({
      isShowList: !this.state.isShowList
    });

  }

  _onPressAddress(address){
    this.props.onItemAddressPress(address);
    this.setState({
      isShowList: !this.state.isShowList
    });
  }
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


            <TextInput editable={false} selectTextOnFocus={false}  defaultValue={ this.props.keyFind } style={{
                width: '96%',
                height: 36,
                paddingHorizontal: 0,

              }} placeholder="Search" />

              <TouchableOpacity onPress={ this._onShowList }  style={{
                  display: this.props.onAction === '' ? 'none':'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                <Icon style={{
                    fontSize:20,
                    color: 'rgba(0,0,0,0.5)'
                  }} name="arrow-dropdown-circle" />
              </TouchableOpacity>


          </View>

          <View style={{ backgroundColor:'#fff'}}>

              {
                this.state.data.map((item,index)=>{
                  if(this.state.isShowList){
                    return (
                      <TouchableOpacity onPress={()=>{ this._onPressAddress(item.address) }} key={index} style={ s.btnItem }>
                        <Icon style={s.icon} name="pin" />
                        <Text style={s.txt}> { item.address } </Text>
                      </TouchableOpacity>
                    )
                  }
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
    fontSize: 16,
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
    fontSize: 14,
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
    paddingHorizontal:10

  }
});

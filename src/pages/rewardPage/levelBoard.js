/* @flow */
import USERS_LEVEL_CONTENT  from './data.json';
import { USERS_LEVEL, COFFEE_COLOR, BLACK_COLOR } from '../../config/const';


import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base'


export default class LevelBoard extends Component {

  state={
    onTab:0
  }

  _onPressTab(index){
    this.setState({
      onTab:index
    })
  }
  render() {

    let tabColor = COFFEE_COLOR;

    return (
      <View style={s.boxHolder}>
          <View style={{

            flexDirection: 'row',

          }}>

            {
              USERS_LEVEL.map((item,index)=>{

                const activeColor = this.state.onTab === index ? tabColor : BLACK_COLOR;

                return(
                  <TouchableOpacity onPress={()=>{ this._onPressTab(index) }} key={index} style={{
                    width: '33%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    borderBottomWidth: 2,
                    borderBottomColor: activeColor,
                    paddingBottom: 15
                  }}>
                      <Text style={[s.txt,{fontSize: 18, color: activeColor}]}> { item } </Text>
                  </TouchableOpacity>
                )
              })
            }

          </View>

          {/* body tab */}
          <View style={{marginTop: 15}}>

              {
                USERS_LEVEL_CONTENT.map((item,index)=>{

                  return(
                    <View key={index} style={{
                      display: this.state.onTab === index ? 'flex' : 'none',
                    }}>

                    {
                      item.content.map((item2,index2)=>{
                        return(
                          <View key={index2} style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}>
                            <Icon style={{color: COFFEE_COLOR, fontSize: 16}} name="star" />
                            <Text style={[s.txt,{ paddingVertical: 5}]}> { item2 } </Text>
                          </View>
                        )
                      })
                    }

                    </View>
                  )

                })
              }

          </View>


      </View>
    );
  }
}



const s = StyleSheet.create({
  boxHolder:{
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius:6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 20
  },
  icon:{
    fontSize: 24,
    color: COFFEE_COLOR
  },
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 10,
    color:COFFEE_COLOR
  },
  txtWhite:{
    color: '#fff'
  },
  lastBtnItem:{
    borderBottomWidth:0
  },
  btnItem:{

    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    height: 50,
    flexDirection:'row'
  }
});

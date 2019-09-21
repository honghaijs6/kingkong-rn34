/* @flow weak */
import {RED_COLOR, COFFEE_COLOR, BLACK_COLOR, GREY_COLOR } from '../../config/const';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';


import {  Icon, Content } from 'native-base';
import BenBody from '../../components/BenBody';
import NoData from '../../components/NoData';


export default class BodyFoods extends Component{

  render(){


    return(
      <Content style={{
          backgroundColor: GREY_COLOR
        }}>

        <BenBody>

            <NoData icon="pizza" message="we have no food menu yet..." />

        </BenBody>

      </Content>
    )
  }
}

const s =  StyleSheet.create({
  h4:{
    color: COFFEE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',

  },
  price:{
    color:RED_COLOR,
    fontSize: 20,
    fontWeight: 'bold'
  },
  txt:{
    fontSize: 16,
    color: BLACK_COLOR,
    marginBottom:10,
    fontFamily: 'Roboto',

  }
})

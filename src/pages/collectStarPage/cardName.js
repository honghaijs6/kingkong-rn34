/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';



import {COFFEE_COLOR, BLACK_COLOR} from '../../config/const';
import Barcode from 'react-native-barcode-builder';



const ProfileName = (props)=>{

  const userInfo = props.userInfo || {};



  return(
    <ImageBackground resizeMode="repeat" source={require('../../../assets/images/profileBg.png')} style={ s.bg }>

      <View style={s.wrapper}>
          <Barcode width={2} height={84} value={ userInfo.code || 'unofficial' } format="CODE128" />
          <Text style={s.txtMember}> { userInfo.code || 'Unofficial code' } </Text>
      </View>

    </ImageBackground>
  )
}

const s = StyleSheet.create({
  txtMember:{
    textTransform:'uppercase',
    color:BLACK_COLOR,
    fontFamily:'Roboto',
    fontSize:14
  },
  bg:{
    backgroundColor:COFFEE_COLOR,
    height: 220,
    justifyContent:'center',
    borderRadius: 6,
    marginTop: 10
  },
  wrapper:{
    backgroundColor:'#fff', height:140,
    justifyContent:'center',
    alignItems:'center'
  },
  line:{
    flexDirection: 'row', alignItems: 'center'
  },
  txt:{
    fontSize: 18,
    fontFamily: 'Roboto',
    color:'#fff',
  }
})

export default ProfileName;

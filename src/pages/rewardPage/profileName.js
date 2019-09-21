/* @flow weak */
import {COFFEE_COLOR, USERS_LEVEL} from '../../config/const';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { Icon } from 'native-base';

const ProfileName = (props)=>{

  const userInfo = props.userInfo || {};
  
  return(
    <ImageBackground resizeMode="repeat" source={require('../../../assets/images/profileBg.png')} style={{
      backgroundColor:COFFEE_COLOR,
      height: 180,
      justifyContent:'center',
      padding: 20,
      borderRadius: 6,
      marginTop: 20
    }}>

      <View>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            color: '#fff'
          }}> { userInfo.name }
          </Text>

          <View style={s.line}>
             <Icon name="person" style={{fontSize: 16, color: '#fff', marginHorizontal: 5}} />
             <Text style={ s.txt}> { USERS_LEVEL[userInfo.level] + ' member' } </Text>
          </View>

          <View style={s.line}>
             <Icon name="star" style={{fontSize: 16, color: '#fff', marginHorizontal: 5}} />
             <Text style={ s.txt}> { userInfo.point } </Text>
          </View>

          <View style={s.line}>
             <Icon name="gift" style={{fontSize: 16, color: '#fff', marginHorizontal: 5}} />
             <Text style={ s.txt}> { userInfo.point } </Text>
          </View>


      </View>

    </ImageBackground>
  )
}

const s = StyleSheet.create({
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

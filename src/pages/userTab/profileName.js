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
      height: 160,
      justifyContent:'center',
      padding: 15,
    }}>

      <View>



          <View style={s.line}>
             <View style={s.col}>
               <Icon name="star" style={s.icon} />
               <Text style={s.txt}> Point </Text>
             </View>
             <View style={s.col}>
               <Text style={ s.txt}> { userInfo.point } </Text>
             </View>
          </View>

          <View style={s.line}>
             <View style={s.col}>
               <Icon name="car" style={s.icon} />
               <Text style={s.txt}> Visited </Text>
             </View>
             <View>
               <Text style={ s.txt}> { userInfo.num_visit || 0 } </Text>
             </View>

          </View>

          <View style={s.line}>
             <View style={s.col}>
               <Icon name="cafe" style={s.icon} />
               <Text style={s.txt}> Orders </Text>
             </View>
             <View style={s.col}>
               <Text style={ s.txt}> { userInfo.ORDER_NUM || 0 } </Text>
             </View>
          </View>

          <View style={s.line}>
             <View style={s.col}>
               <Icon name="bicycle" style={s.icon} />
               <Text style={s.txt}> Delivery </Text>
             </View>
             <View>
               <Text style={ s.txt}> { userInfo.num_order || 0 } </Text>
             </View>

          </View>


      </View>

    </ImageBackground>
  )
}

const s = StyleSheet.create({
  col:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  line:{
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 3
  },
  icon:{
    fontSize: 20, color: '#fff', marginHorizontal: 5
  },
  txt:{
    fontSize: 18,
    fontFamily: 'Roboto',
    color:'#fff',
  }
})

export default ProfileName;

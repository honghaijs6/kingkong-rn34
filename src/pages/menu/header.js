/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';

import BenHeader from '../../components/BenHeader';
import BackButton from '../../components/BackButton'

 
const MyHeader = (props) => ( 
  <BenHeader type="single">

      <BackButton onPress={ props.onBackBtnPress } />

      <TextInput 
          style={{
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.2)',
            width: '86%',
            height: 36,
            paddingHorizontal: 10,
            borderRadius: 20
          }} placeholder="Search" 
          
          defaultValue={props.keyText}
          onChangeText={ (text)=>{ props.onChangeText(text) } }
      />

      <TouchableOpacity 
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red'
        }}
        onPress={props.onPress}
      >
          <Icon style={{
              position: 'absolute',
              right:8,
              color: 'rgba(0,0,0,0.5)'
            }} name="close-circle" />
    </TouchableOpacity>


  </BenHeader>
);

export default MyHeader;

MyHeader.defaultProps = {
  onBackBtnPress:()=>{},
  onChangeText:()=>{},
  onPress:()=>{},
  key:''

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

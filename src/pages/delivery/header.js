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


export default class MyHeader extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      key:props.key
    }

  }


  _onPress(){
    this.setState({key:''})
    this.props.onCloseSearch();
  }
  _onChangeText(text){
    this.setState({key:text})
    this.props.onChangeText(text)
  }


  render(){
    return(
      <BenHeader type="single">
          <BackButton onPress={ this.props.onBackBtnPress } />

          <TextInput value={this.state.key} onChangeText={ (text)=>{  this._onChangeText(text) } } style={{
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.2)',
            width: '86%',
            height: 36,
            paddingHorizontal: 10,
            borderRadius: 20
          }} placeholder="Add delivery address" />

        <TouchableOpacity onPress={ ()=>{ this._onPress() } } style={{
            display: this.props.onAction === '' ? 'none':'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red'
          }}>
          <Icon style={{
              position: 'absolute',
              right:8,
              color: 'rgba(0,0,0,0.5)'
            }} name="close-circle" />
        </TouchableOpacity>

      </BenHeader>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

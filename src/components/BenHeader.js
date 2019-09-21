/* @flow */
import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  NetInfo,
  Text
} from 'react-native';

export default class BenHeader extends Component {


  state = {
    internet:true
  }

  componentWillUnmount(){
    NetInfo.isConnected.addEventListener('connectionChange', (isConnected)=>{
        this.setState({internet:isConnected})
    });
  }
  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', (isConnected)=>{
        this.setState({internet:isConnected})
    });
  }


  render() {

    // multi - single
    let type = this.props.type || 'multi' ;

    const arr = {
      'multi':'space-between',
      'single':'center',
      'flex-start':'flex-start'
    };


    const display = this.state.internet ? 'none':'flex';

    return (
      <View>

        <View style={[styles.netInfo,{display:display}]}>
           <Text style={styles.txt}> Check your internet connection </Text>
        </View>

        <View style={[
            styles.container,
            { justifyContent:arr[type] },
          ]}>

          { this.props.children }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  netInfo:{
    height: 30,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'red',
    display:'none'
  },
  txt:{
    color:'#fff',
    fontFamily:'Roboto'
  },
  container: {
    flexDirection:'row',
    height:55,borderBottomWidth:0.5,
    borderBottomColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    backgroundColor:'#fff'
  },
});

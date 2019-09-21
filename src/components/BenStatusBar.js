import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

export default function(){

  return(

    <View style={{
      height:Constants.statusBarHeight
    }}>


      <StatusBar backgroundColor="blue" barStyle="dark-content" />

    </View>
  )
}

/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  
} from 'react-native';


const H2 = (props) => (

    <View style={{
        paddingVertical:10
    }}>         
        <Text style={[{ fontFamily:'Roboto',fontSize:16},props.styleText]}> { props.children } </Text>
    </View>
  

);

export default H2;


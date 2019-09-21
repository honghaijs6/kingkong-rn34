//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from 'native-base';
import { COFFEE_COLOR } from '../config/const';


const BenProgress = (props)=>{

    const percent = props.percent || 0 ;
    const title = props.title || '';
    return(
        <View style={[{
            backgroundColor:'#fff',
            borderWidth:0.5,
            borderColor:COFFEE_COLOR,
            padding:1,
            borderRadius:12,
        },props.style]}>
            <View style={{width:percent+'%', borderRadius:12, alignItems:'center', padding:2, backgroundColor:COFFEE_COLOR}}>
                <Text style={{color:'#fff', fontSize:14}}> <Icon style={{color:'#fff', fontSize:12, marginRight:10}} name="bicycle"></Icon> { title } </Text>
            </View>
            
        </View>
    )
}

export default BenProgress
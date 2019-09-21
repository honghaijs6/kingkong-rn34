import {  COFFEE_COLOR } from '../config/const' ;

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

import { Container, Icon, Content } from 'native-base';



import HTMLView from 'react-native-htmlview';

import BenHeader from '../components/BenHeader';
import BenStatusBar  from "../components/BenStatusBar";


export default class FeedViewPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      typeAction:'',
      onAction:'',
      tab:'feedview',

      content:''
    }
  }

  _onPressBack = ()=>{

    this.props.navigation.goBack();
  }

  render(){

    const data = this.props.navigation.getParam('data');



    return(
      <Container>

        <BenStatusBar/>
        <BenHeader>

           <View style={{
             flexDirection: 'row',
             alignItems: 'center'
           }}>
               <TouchableOpacity onPress={ this._onPressBack} style={{
                 width: 40,
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>
                  <Icon style={s.icon} name="arrow-back" />

               </TouchableOpacity>
               <TextInput editable={false} selectTextOnFocus={false} style={{
                 width:'89%',
                 fontFamily:'Roboto',
                 fontSize:20,
                 color:COFFEE_COLOR
               }} defaultValue={ data.title || '...' } />

           </View>


        </BenHeader>


        <Content style={{marginTop:-10}}>
          <Image source={{uri: data.photo}}
              style={{height: 200, width: null, flex: 1, marginVertical: 10}}
            />

          <View style={{
            padding: 20
          }} >


              <HTMLView
                value={ data.content || '' }
                stylesheet={s}
              />


          </View>

        </Content>
      </Container>

    )
  }
}

const s = StyleSheet.create({
  img:{
    marginBottom:'10px'
  },
  i:{
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5
  },
  table:{
    marginTop: 10,
    marginBottom:10
  },
  p:{
    color: '#333',
    fontSize: 17,
    fontFamily: 'Roboto',
    lineHeight: 24
  },
  txt:{
    fontSize: 20,
    color: COFFEE_COLOR,
    fontFamily: 'Roboto'
  },
  icon:{
    fontSize: 30,

  }
})

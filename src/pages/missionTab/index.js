import { GREY_COLOR, COFFEE_COLOR } from '../../config/const' ;

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Container, Icon, Header, Tab, Tabs, ScrollableTab, Content, Button } from 'native-base';


import BenHeader from '../../components/BenHeader' ;

import NoData from '../../components/NoData';

export default class MissionPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      typeAction:'',
      onAction:'',
      tab:'mission'
    }
  }


  render(){
    return(
      <Container style={{
        backgroundColor:GREY_COLOR,
        display:  this.props.onTab === this.state.tab ? 'flex':'none'
      }}>
        <BenHeader type="single">
          <View>
              <Text style={{
                fontSize:18,
                fontFamily:'Roboto'
              }}> Missions </Text>
          </View>
        </BenHeader>
        <Content>

          <View style={{
            width:'95%',
            justifyContent:'center',
            alignItems:'center',

          }}>

            <NoData visible={true} icon="aperture" message="You have no missions yet, please update your information for getting missions" />

          </View>

        </Content>
      </Container>

    )
  }
}

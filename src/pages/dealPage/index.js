import { GREY_COLOR, COFFEE_COLOR, BLACK_COLOR } from '../../config/const';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
 
import { Container, Content } from 'native-base';

import BackButton from '../../components/BackButton';
import BenStatusBar  from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader';

import NoData from '../../components/NoData';


export default class DealPage extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { navigation } = this.props;
    const title = navigation.getParam('title','Deals for you');
    const message = navigation.getParam('message','Login or Sign up an account to receive more deals for you')

    return (
      <Container>
        <BenStatusBar/>
        
        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <View>
            <Text style={s.title}>  { title }  </Text>
          </View>
          <View></View>
        </BenHeader>

        <Content style={{
            backgroundColor:GREY_COLOR
        }}>

          <View style={{
            width:'81%',
            justifyContent:'center',
            alignItems:'center',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}>

            <NoData visible={true} icon="cafe" message={message} />

            <TouchableOpacity
                onPress={()=>{ this.props.navigation.navigate('Login') }}
                style={{
                    width:'100%',
                    height:50,
                    borderRadius:6,
                    backgroundColor:COFFEE_COLOR,
                    justifyContent:'center',
                    alignItems:'center'
                }}
            >
                <Text style={{
                    fontFamily:'Roboto',
                    fontSize:14,
                    color:'#fff'
                }}> Login </Text>
            </TouchableOpacity>
          </View>

        </Content>

      </Container>
    );
  }
}


const s = StyleSheet.create({

    icon:{
      color: COFFEE_COLOR
    },
    txt:{
      fontFamily:'Roboto',
      fontSize: 11,
      color: COFFEE_COLOR
    },
    title:{
      fontFamily:'Roboto',
      fontSize: 18,
      fontWeight: 'bold',
      color: BLACK_COLOR,
      marginLeft: -5
    },
    items:{
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 0.5
    },
    block:{
      backgroundColor: '#fff',
      alignSelf: 'center',
      width: '100%',
      marginTop: 10
    }
  });
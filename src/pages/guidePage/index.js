/* @flow */
import moFire from '../../model/moFirebase';
const MODE = 'company';

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  WebView
} from 'react-native';

import { Container } from 'native-base';

import BenStatusBar from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader';
import BackButton from '../../components/BackButton';


export default class HelpPage extends Component {


  constructor(props){
    super(props);

    this.state = {
      content:''
    }

    this._setup();

  }

  _setup(){

    this.model = new moFire(MODE);

  }

  componentDidMount(){
    this.model.fetch("code","howtogetpoint",(res)=>{
      const content = res[0]['content'];
      this.setState({content:content});



    })
  }
  render() {

    const htmlContent = `
    <style>

      body {
        padding:30px;
        font-size: 40px;
        font-family:'Arial';
        color:'#666'
      }

    </style>
      <body>
        ${ this.state.content || '' }
      </body>
    ` ;

    return (
      <Container>
        <BenStatusBar/>
        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <Text style={s.title}> How to earn star  </Text>

        </BenHeader>


        <WebView
          originWhitelist={['*']}
          source={{html: htmlContent }}

        />


      </Container>
    );
  }
}

const s = StyleSheet.create({

  h1:{
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  h3:{
    fontFamily: 'Roboto',
    fontSize: 22,
    marginBottom: 10
  },
  title: {
    fontFamily: 'Roboto',
    fontSize:18
  },
});

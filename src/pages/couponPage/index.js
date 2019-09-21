/* @flow */
import { GREY_COLOR, COFFEE_COLOR, BLACK_COLOR } from '../../config/const';
import doVerifyCoupon from '../../hook/ultil/doVerifyCoupon';

import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Container, Content, Icon } from 'native-base';


import BenLoader from '../../components/BenLoader';

import BenStatusBar from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader';
import BackButton from '../../components/BackButton';

import BenBody from '../../components/BenBody';

import H2 from '../../components/html/h2';
//import console = require('console');


const CouponItem = (props)=>{

  const { data } = props ; 
  return (
      <TouchableOpacity onPress={ props.onPress } style={{
        flexDirection:'row',
        alignItems:'center'
      }}>
        <Icon name="pricetag" style={{marginRight: 10, fontSize:16, color:COFFEE_COLOR}} /> 
        <Text style={{fontFamily:'Roboto', fontSize:16, color:COFFEE_COLOR}}> { data.code } </Text>
      </TouchableOpacity>
  )
}

class CouponPage extends Component {


  constructor(props){
    super(props);

    this.state = {
      code:'',
      loader:false,
      data:{}
    }

    this._setup();

  }

  _setup(){

    //this.model = new moFire(MODE);

  }

  _onSubmit = async ()=>{
    
    this.setState({loader:true});
    const resVerify = await doVerifyCoupon(this.state.code);
    this.setState({loader:false});
      
    if(resVerify.name==='success'){
      if(resVerify.message==='yes'){
        
        this.setState({
          data:resVerify.data
        })
      }else{ 
        Alert.alert('Message','this coupon code current not available')
      }
    }
  }
  
  componentWillReceiveProps(newProps){
    let myBarcode = newProps.navigation.getParam('data') ;
    myBarcode =  myBarcode !== undefined ? myBarcode.data : '';
    this.setState({code:myBarcode});
    
  }

  // ON PRESS APPLI CODE FOR ORDERS 
  _onPress = ()=>{
     
    this.props.dispatch({
      type:'COUPON',
      coupon:this.state.data
    }); 

    Alert.alert('Coupon code have saved success and ready  for your orders ');
     this.props.navigation.goBack();
    
  }
  render() {
    

    return (
      <Container>
        <BenStatusBar/>

        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <View>
            <Text style={s.title}> Your Coupon Code  </Text>
          </View>
          <View></View>
        </BenHeader>
        <BenLoader visible={this.state.loader} />

        <Content style={{ backgroundColor:GREY_COLOR }}>
          <BenBody width={'90%'}>
             <View style={s.wrapperInput}>

                <TextInput 
                  defaultValue={ this.state.code } 
                  onChangeText={(code)=>{ this.setState({code}) }}
                  style={{paddingHorizontal:10, width:'62%', fontFamily:'Roboto', color:BLACK_COLOR}} 
                  placeholder="enter your coupon code" 
                />

                <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Scanner') }} style={[s.btn,{backgroundColor:'#fff'}]}>
                  <Icon name="barcode"></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={ this._onSubmit } style={s.btn}>
                  <Text style={s.btnText}> Apply </Text>
                </TouchableOpacity>

             </View>

             <H2 styleText={{color:'rgba(0,0,0,0.6)'}}> Coupons </H2>
             <View style={[s.historyList,{display: this.state.data.code === undefined ? 'none' : 'display' }]}>
                   <CouponItem data={ this.state.data } onPress={ this._onPress } />
             </View>

          </BenBody>
        </Content>


      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user:state.user
  };
}

export default connect(mapStateToProps)(CouponPage);

const s = StyleSheet.create({

  historyList:{
    backgroundColor:'#ffff',
    borderWidth:0.5,
    borderColor:COFFEE_COLOR,
    padding:12,
    borderStyle:'dashed'
  },
  wrapperInput:{
    marginTop: 10,
    borderColor:'rgba(0,0,0,0.1)',
    borderWidth:1,
    height:50,
    borderRadius:9,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
    width:60,
    backgroundColor:COFFEE_COLOR,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  btnText:{
    fontFamily:'Roboto',
    color:'#fff',
    fontSize:14
  },

  title: {
    fontFamily: 'Roboto',
    fontSize:18
  },
});

/* @flow */
import { COFFEE_COLOR } from '../../config/const' ;
import moFire from '../../model/moFirebase';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container } from 'native-base';



import MenuHeader from './header';
import BenStatusBar  from "../../components/BenStatusBar";
import BenLoader  from "../../components/BenLoader";

import MenuBody from './body'

function ButtonOrder (props){


  const amount = props.data.length ;
  let total = 0 ;
  props.data.map((item)=>{
    total += parseInt(item.amount) * parseInt(item.price)
  });


  return(
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        backgroundColor: COFFEE_COLOR,
      }}>

        <View style={{
            width: '33%',
            paddingLeft: 10,
            color: '#fff'
          }}>
          <View style={{
              width:30, height: 30,
              borderWidth: 0.5,
              borderColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={s.txtWhite}> { amount } </Text>

          </View>
        </View>
        <TouchableOpacity onPress={ ()=> { props.onPress() } } style={{
            width: '34%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 18, color:'#fff'}}> Order Now  </Text>
        </TouchableOpacity>
        <View style={{
            width: '33%',
            alignItems: 'flex-end',
            paddingRight: 10,

          }}>
          <Text style={s.txtWhite}> $ { total } </Text>
        </View>

    </View>

  )
}

class Menu extends Component {

  _tempData = [];
  constructor(props){
    super(props)


    this.state = {
      loader:false,
      typeAction:'',
      onAction:'',
      tab:'menu',

      category:'milktea',
      data:[], // all list products from server
      cateInfo : props.navigation.getParam('cateInfo', null),
      shoppingcart:  props.shoppingcart.list,
      keyText:''

    }

    this._setup();
  }

  _setup(){

    this.model = new moFire('products');


  }

  componentWillReceiveProps(newProps){

    this.setState({
      shoppingcart:newProps.shoppingcart.list
    })
  }

  componentDidMount(){

    this.setState({loader:true});
    //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT)

    this.model.fetch("categories",this.state.cateInfo.uid,(data)=>{

      this._tempData = data; 

      this.setState({
          loader:false,
          data:data
      })
    });

  }

  _onBackBtnPress(){

    this.props.navigation.goBack();

  }

  _whereStateChange(newState){
    this.props.onStateChange(newState);
  }

  _onPressItem(info){


    // PASS ALL PRO INFO - CATE INFO 
    this.props.navigation.navigate('ProItem',{
      proInfo:info,
      cateInfo:this.state.cateInfo
    });




  }

  _onPressOrder(){

    this.props.navigation.navigate('CartPage')


  }

  _findProduct = (text)=>{
    
    
      const rows = [] ;
      this._tempData.map((item)=>{
        if(item.name.indexOf(text)>-1){
          rows.push(item);
        }
      });
      
      this.setState({
        keyText:text,
        data:rows
      });
      
  }
  _close = ()=>{
    
    this._findProduct('');

  }
  render() {


    const { navigation } = this.props;
    
    return(
      <Container>
        <BenLoader visible={this.state.loader} />
        <BenStatusBar/>

        <MenuHeader keyText={this.state.keyText} onPress={ this._close } onChangeText={ this._findProduct } onBackBtnPress={()=>{ this._onBackBtnPress() }} />
      
        <MenuBody onPressItem={(item)=>{ this._onPressItem(item) }} loader={this.state.loader} cateInfo={this.state.cateInfo} data={ this.state.data } />

        { this.state.shoppingcart.length > 0 ? <ButtonOrder data={this.state.shoppingcart} onPress={()=>{  this._onPressOrder() }} /> : null }



      </Container>
    )




  }
}

function mapStateToProps(state){
  return {
    shoppingcart:state.shoppingcart
  }
}

export default connect(mapStateToProps)(Menu);

const s = StyleSheet.create({

  txtWhite:{
    color: '#ffffff'
  },
});

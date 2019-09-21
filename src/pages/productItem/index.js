/* @flow */
import Model from '../../model/model';
import { GREY_COLOR, COFFEE_COLOR, RED_COLOR, STORAGE_FAVORIES } from '../../config/const' ;



// hooks
import isSaveProduct from '../../hook/ultil/isSaveProduct';
import setStorage from '../../hook/ultil/setStorage';
import removeItemStorage from '../../hook/ultil/removeItemStorage';


import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Container,  Content, Icon } from 'native-base';


import BenHeader from '../../components/BenHeader';
import BenStatusBar  from "../../components/BenStatusBar";
import BackButton from '../../components/BackButton';
import LikeButton from '../../components/LikeButton';

import BodyItem from './bodyItem';




class ProductItem extends Component {

  constructor(props){
    super(props)


    this.state = {

      typeAction:'',
      onAction:'',
      tab:'productitem',
      amount:1, // cureent amount
      info:{}, // current product info
      cateInfo:{},
      shoppingcart:  props.shoppingcart,
      favoryList:[],
      isLiked:false,

      bonus:{
        type:"cold", // DEFAUT DATA
        sugar:"0",
        ice:"0",
        subpro:[]
      } // options and subpro here 

    }



    this._onBackBtnPress = this._onBackBtnPress.bind(this);
    this._onInCrease = this._onInCrease.bind(this);
    this._onDeCrease = this._onDeCrease.bind(this);
    this._onBtnOrder = this._onBtnOrder.bind(this);

    this._onSelectPrice = this._onSelectPrice.bind(this);

    this._setup();


  }

  _setup(){

    this.moOrder = new Model('shoppingcart');

  }


  /* option change
    {
      type:{},
      sugar:{},
      ice:{}
      subpro:[]
    }
  */
  _onOptionChange(json){

    const formatJson = {
      type:json.type.id,
      sugar:json.sugar.id,
      ice:json.ice.id,
      subpro: json.subpro.length > 0 && json.subpro.map((item)=>{  
        return {
          id:item.id,
          name:item.name,
          price:item.price_l,

        }
      })  
    }

    let info = this.state.info;
    info['bonus'] = formatJson;

    this.setState({info:info});

  }

  _onSelectPrice(json){


    Object.assign(this.state.info,json);

    this.setState({
        onAction:'_onSelectPrice'
    });


  }
  _onInCrease(){


    this.setState({
      amount: this.state.amount +=1
    });

  }

  _onDeCrease(){

    let amount = this.state.amount;
    amount = amount > 0 ? amount -1  : 0 ;

    this.setState({
      amount: amount
    });


  }

  _onBackBtnPress(){

    this.goBack();
  }


  _onBtnOrder(){

    if(this.state.amount>0){

      const cart = this.state.info;
      cart.amount = this.state.amount;
      
      
        
      this.moOrder.addDataStore(cart);
      this.goBack();


    }else{
      // remove item on shoppingcart ;
      this.moOrder.removeItemDataStore(this.state.info.uid,this.props.dispatch);
      this.goBack();


    }


  }


  async componentDidMount(){

    let info =  this.props.navigation.getParam('proInfo',{});
    const cateInfo = this.props.navigation.getParam('cateInfo',{});


    info['price'] = info['price'] || info['price_m'];
    const cartInfo = this._getInfoOnShoppingCart(info.uid);
    const isLike = await isSaveProduct(info);



    this.setState({
      amount:info.amount || this.state.amount ,
      info:Object.assign(info,cartInfo),
      isLiked:isLike,
      cateInfo:cateInfo
    });

  }

  

  goBack(){
    this.props.navigation.goBack();

  }
  _getInfoOnShoppingCart(uid){
    let json = {};
    this.state.shoppingcart.map((item)=>{
        if(uid===item.uid){
          json = item;
        }
    });

    return json;
  }


  async _toggleLike(){

    const isSave = await isSaveProduct(this.state.info);

    if(!isSave){
      const resSetStorage = await setStorage(STORAGE_FAVORIES,this.state.info,this.props.dispatch);
      this.setState({
        isLiked:!this.state.isLiked
      })
    }else{
      // REMOVE ITEM
      const resRemoveItem  = await removeItemStorage(this.state.info,this.props.dispatch);

      this.setState({
        isLiked:! this.state.isLiked
      })
    }



  }

  _preCalculate(){

    const price = this.state.info.price || 0 ;
    let TOTAL = this.state.amount * price ;
    let TOTAL_SUBPRO = 0 ;


    //this.state.bonus = this.state.info.bonus !== undefined ? this.state.info.bonus : this.state.bonus
    
    if(this.state.info.bonus !== undefined){
      if(this.state.info.bonus.subpro.length>0){
      
        this.state.info.bonus.subpro.map((item)=>{
          const total = parseFloat(item.price) * 1 ;
          TOTAL_SUBPRO += total 
        });
      }

    }
    


    return TOTAL + TOTAL_SUBPRO


  }
  render() {


      const TOTAL = this._preCalculate();
      

      return (
        <Container>

          <BenStatusBar/>
          
          <BenHeader>
            <BackButton onPress={ this._onBackBtnPress } />
            <LikeButton isLiked={this.state.isLiked} onPress={ ()=>{ this._toggleLike() } } />
          </BenHeader>

          <View style={{
            flex:1,
            justifyContent: 'space-between'
          }}>

              <Content style={{
                backgroundColor:GREY_COLOR
                }}>
                  <BodyItem 

                    onSelectPrice={ this._onSelectPrice } 
                    info={this.state.info} 
                    cateInfo={ this.state.cateInfo }
                    onOptionChange={(json)=>{ this._onOptionChange(json) }}

                    bonus={ this.state.info.bonus || {} }


                  />

              </Content>


              {/* FOOTER */}
              <View style={s.footerBar}>

                {/* LFET SIDE */}
                <View>
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10
                    }}>
                        <TouchableOpacity onPress={ this._onDeCrease } style={{
                          borderRadius: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 32, width: 32,
                          borderWidth: 0.5,
                          borderColor: RED_COLOR

                        }}>
                          <Icon style={{color: RED_COLOR}} name="remove" />

                        </TouchableOpacity>

                        <View style={{ justifyContent: 'center',
                        alignItems: 'center',height: 32, width: 41, }}>
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}> { this.state.amount } </Text>
                        </View>

                        <TouchableOpacity onPress={ this._onInCrease } style={{
                          borderRadius: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 32, width: 32,
                          borderWidth: 0.5,
                          borderColor:COFFEE_COLOR,
                          backgroundColor: COFFEE_COLOR

                        }}>
                          <Icon style={{color: '#fff'}} name="add" />
                        </TouchableOpacity>

                    </View>
                </View>
                
                {/* BUTTON ORDER RIGHT */}
                <View>
                    <TouchableOpacity onPress={ this._onBtnOrder }  style={{

                      marginHorizontal: 10,
                      width: 140,
                      height: 36,
                      borderRadius: 6,
                      borderColor: 'rgba(0,0,0,0.2)',
                      justifyContent: 'center',
                      backgroundColor: COFFEE_COLOR,
                      alignItems: 'center'
                    }} >
                      <Text style={{ color:'#fff', fontFamily: 'Roboto', fontSize: 18}}> $ { parseFloat(TOTAL).toFixed(2) } </Text>
                    </TouchableOpacity>
                </View>
              </View>

          </View>


        </Container>
    );
    
  }
}

function mapStateToProps(state){
  return {
    shoppingcart:state.shoppingcart.list,
    favories:state.favories
  }
}

export default connect(mapStateToProps)(ProductItem);



const s = StyleSheet.create({
  footerBar:{
    height: 55,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffff'
  },
  txt:{
    fontFamily: 'Roboto',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: COFFEE_COLOR
  },
});

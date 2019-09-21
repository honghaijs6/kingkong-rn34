

import server from '../../config/server';

import Model from '../../model/model'; // shoppingcart only
import Api from '../../model/api';
import USER from '../../config/user';


/* hook */
import {detectForm} from '../../hook/before/';


import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  WebView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';

import { connect } from 'react-redux';

import { Container,  Content} from 'native-base';
import Toast from 'react-native-easy-toast';


import BenLoader from '../../components/BenLoader';


import BenStatusBar from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader';
import BackButton from '../../components/BackButton';

import CheckOutBody from './body';
//import console = require('console');


const style = StyleSheet.create({
  brHeader:{
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  },
  brContainer:{
    width: '100%',
    height: '100%'
  }
})
const Browser = (props)=>{
  return(
    <View style={style.brContainer}>

        <BenStatusBar/>
        <View  style={ style.brHeader}>
          <BackButton onPress={()=>{ props.onClose() }} />

          <Text style={{ fontFamily: 'Roboto', fontSize: 14}}> Paypal </Text>
          <View></View>
        </View>


         <WebView
           onNavigationStateChange={(data)=>{ props.onNavigationStateChange(data) }}
           source={{uri: props.uri }}
           injectedJavaScript={`document.f1.submit()`}

         />
    </View>
  )
}

class CheckOutPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      loader:false,
      typeAction:'',
      onAction:'',
      tab:'checkout',
      shoppingcart: props.shoppingcart.list,
      userInfo:props.user.userInfo,
      isOpen:false,
      uri:'',
      checkoutStatus:'',
      orderID:0

    }
    this.moShoppingcart = new Model('shoppingcart');
    this._settup();
  }

  _settup(){
    this.moOrder = new Api('orders');

  }

  calculateBill(data,discount=0){

    let total = 0
    data.map((item)=>{
       total += item.amount * parseFloat(item.price) ;

       if(item.bonus !== undefined){

        if(item.bonus.subpro){
         const { subpro } = item.bonus;
         subpro.map((item2)=>{
           total += parseFloat(item2.price)
         });
         
        }
      }


    });

    return parseFloat(total - discount).toFixed(2);

  }

  calculateCoupon(json){
    let discount = 0 ;

    if(JSON.stringify(json)!=='{}'){
      const total = this.calculateBill(this.state.shoppingcart) ;
      discount = (total * json.value)/100;
    }

    return parseFloat(discount).toFixed(2) ;


  }

  _onSuccess(){


    const COUPON = this.props.user.coupon.code !== undefined ? this.props.user.coupon.code : '';

    // calculateBill
    const discount = this.calculateCoupon(this.props.user.coupon);
    const total =  this.calculateBill(this.state.shoppingcart)

    const data = {

      status:0,
      creator_id:this.state.userInfo.id,
      coupon_code:COUPON,
      discount:discount,
      total:total,

      isMobile:true,
      cart:this.state.shoppingcart,

      user:{
        uid:this.state.userInfo.uid,
        name:this.state.userInfo.name,
        email:this.state.userInfo.email,
        phone:this.state.userInfo.phone,
        photoURL:this.state.userInfo.photoURL
      },
      delivery:this.state.userInfo.recent_address,
      payment:"creditcard",
      creditcard:this.state.userInfo.creditcard
    };
    

    this.setState({loader:true});
    this.moOrder.post(data,(res)=>{
      if(res.name==='success'){

        this.setState({loader:false,orderID:res.data.id});

        const IP = server.base()+'/paypal?id='+res.data.id;
        this._openBrowser(IP);

        //this.moShoppingcart.removeStoreData();

      }
    });


  }
  _openBrowser(IP){
    this.setState({
      isOpen:true,
      uri: IP
    });
  }

  _closeBrowser(){
      
    this.setState({isOpen:false})
      
      // DELETE DON HANG
      this.moOrder.delete(this.state.orderID,(data)=>{
        console.log(data);
        
      });


  }

  async _onCheckOut(data){

    // VALIDATE
    if(detectForm(['cardName','cardNumber','expired','cvv'],data)===''){

      let userInfoData = this.state.userInfo;
      userInfoData.creditcard = data ;
      
      this._onSuccess();


    }else{
      this.refs.toast.show('Please enter correct infomation',3000);
    }


  }

  

  componentWillReceiveProps(newProps){
    this.setState({
      userInfo:newProps.user.userInfo,
      shoppingcart:newProps.shoppingcart.list
    })
  }

  async _handleBrowserChange(data){
   
    if(data.title==='success'){
      this.setState({
        isOpen:false,
        checkoutStatus:data.title
      });

      this.moShoppingcart.removeStoreData();

      // REMOVE COUPON CODE ON REDUX
      this.props.dispatch({
        type:'COUPON',
        coupon:{}
      });

      // cap nhat userInfo cho redux 
      await USER.getInfo(this.props.user.userInfo.id);

      


    }
  }

  render(){
    return(
      <Container>

        <BenStatusBar/>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isOpen}
          onRequestClose={() => {
            this.setState({isOpen:false})
          }}>
          <Browser
            onNavigationStateChange={(data)=>{
              this._handleBrowserChange(data);
            }}
            onClose={()=>{  this._closeBrowser() }} uri={ this.state.uri } />

        </Modal>

        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <View>
            <Text style={{
              fontSize: 16, fontFamily: 'Roboto'
            }}> Paypal Gateway </Text>
          </View>


        </BenHeader>
        <BenLoader visible={this.state.loader} />
        <Content>

            <CheckOutBody  status={ this.state.checkoutStatus } onPress={ (data)=>{ this._onCheckOut(data) } }  />

        </Content>


        <Toast position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}

         ref="toast"/>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    user:state.user,
    shoppingcart:state.shoppingcart
  }
}

export default connect(mapStateToProps)(CheckOutPage);

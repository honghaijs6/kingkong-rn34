import { GREY_COLOR, COFFEE_COLOR } from '../../config/const' ;



import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Content, } from 'native-base';

import BenProgress from '../../components/BenProgress';

import OrderHeader from './Header';
import OrderBody from './Body';


function ListItem(props){

  const categories = props.data || [] ;

  return(
    categories.map((item,index)=>{

      const photoURL = item.photo.replace(/ /g,'%20')

      return(
        <TouchableOpacity  onPress={()=>{ props.onCateItemPress(item) }} key={item.uid} style={{
            width: '48%',
            borderRadius: 6,
            marginBottom: 14

          }}>

          <Image source={{uri:photoURL}}
          style={{height: 140, width: '100%', flex: 1, borderRadius: 6, borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.2)'}}
          />



          <View style={{
              width: '100%',
              height: 140,
              position: 'absolute',
              top:0,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              backgroundColor:'rgba(0,0,0,0.4)'
            }}>
            <Text style={{
                fontFamily: 'Roboto',
                color:'#fff',
                fontSize: 20

              }}> { item.name } </Text>
          </View>


        </TouchableOpacity>
      )

   })
  )
}


function ListOrderItem(props){

  const arr = [
      'pendding',
      'delivery',
      'finish'
  ];

  const list = props.data
  return(
    list.map((item)=>{

      const info = item ;
      const step = parseInt(info.status) + 1
      const statusPercent = step * 33.3;

      return(
        <TouchableOpacity
          onPress={()=>{
            props.navigation.navigate('HistoryPageView',{
              data:item
            })
          }}

          style={{marginBottom:10}} key={info.id}>
          <View style={{flexDirection:'row',justifyContent:'space-between', marginBottom:5}}>
              <Text style={s.p}> Your orders in progress </Text>
              <Text style={[s.p,{textTransform:'uppercase'}]}> #{ item.code }  </Text>

          </View>
          <BenProgress title={arr[info.status]} percent={statusPercent}  />
        </TouchableOpacity>
      )
    })
  )


}


export default class OrderPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      typeAction:'',
      onAction:'',
      tab:'order',

      categories:[]

    }

    this._onPressNavigate = this._onPressNavigate.bind(this);

  }

  /*WHEN*/

  _onCateItemPress = (item)=>{


    this.props.navigation.navigate('MenuPage', {
        cateInfo: item,
        shopingCart:this.props.shopingCart
    });


  }

  _onPressNavigate(code){
    //DeliveryPage
    this.props.navigation.navigate(code)
  }


  componentWillReceiveProps(newProps){
    if(newProps.onTab===this.state.tab){
      this.component._root.scrollToPosition(0, 0);
    }
  }

  render(){

    const categories = this.props.data['categories'];
    const ordersData = this.props.data['orders'];


    return(
      <Container style={{
        backgroundColor:GREY_COLOR,
        display:  this.props.onTab === this.state.tab ? 'flex':'none'
      }}>

        <OrderHeader shoppingcart={ this.props.shoppingcart } onPressNavigate={ this._onPressNavigate } userInfo={ this.props.userInfo }  />


        <Content ref={c => (this.component = c)} >

            <OrderBody>

                <ListOrderItem navigation={ this.props.navigation } data={ordersData} />

                {/* LIST VIEW  */}
                <Text style={s.h4}> King Kong Menu </Text>
                <View style={{
                     justifyContent: 'space-between',
                     flexWrap: 'wrap',
                     flexDirection:'row'

                  }}>

                  <ListItem onCateItemPress={(item)=>{ this._onCateItemPress(item) }} data={categories} />
               </View>
            </OrderBody>

        </Content>
      </Container>

    )
  }
}



const s = StyleSheet.create({

  p:{
    fontWeight:'500',
    fontSize: 10,
    fontFamily: 'Roboto',
    color:'#666'
  },
  h4:{
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: 10,

    textTransform:'uppercase',
    marginBottom: 10,
    color:COFFEE_COLOR

  }
});

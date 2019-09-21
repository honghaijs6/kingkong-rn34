import { GREY_COLOR, COFFEE_COLOR, BLACK_COLOR } from '../../config/const'
import { AVATAR_URL } from '../../config/const';
import Api from '../../model/api';


import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Container, Icon,  Text, Content } from 'native-base';

import moment from 'moment';

// LIB Component
import BenHeader from '../../components/BenHeader'
import BenAvatar from '../../components/BenAvatar';
import MyAvatar from '../../components/MyAvatar';


import BenLoader from '../../components/BenLoader';

import MyCard from './MyCard';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import CardImage from './CardImage';

import Box from './Box';

export default class FeedPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      loader:false,
      typeAction:'',
      onAction:'',
      tab:'feed',

      userInfo: props.userInfo,

    }

    this.box = [
      { code:'star', name:'Collect Star' },
      { code:'cafe', name:'Orders' },
      { code:'pizza', name:'Coupon' },

    ];

    this.data = [];


    this._setup();

    this._onPressAvarar  = this._onPressAvarar.bind(this);
    

  }


  /* WHEN*/
  _setup(){
    this.Api = new Api('feeds');
    this.Api.set('method',{
      name:'listAll',
      params:'all'
    })
  }

  _onPressAvarar(){
    alert('Click avatar ')
  }

  

  _onCardPress(data){

    this.Api.getInfo(data.id,(idata)=>{
      this.props.navigation.navigate('FeedView',{
        data:idata
      });

    })
  }

  _fetchData(){

    this.setState({loader:true})
    //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT)

    this.Api.fetch((res)=>{
      this.data = res.data.rows;

      this.setState({
        loader:false,
        onAction:'_fetchData'
      });

    });




  }

  componentWillReceiveProps(newProps){

    
    if(this.state.tab===newProps.onTab){

      this._fetchData() ;
      this.setState({
        userInfo:newProps.userInfo,
        
      });

    }

  }

  _goto(code){
    switch(code){

      case 'star':
        this.props.navigation.navigate('CollectStarPage')
      break ;

      case 'cafe':
        this.props.onPressChangeTab({tab:'order'});
      break;

      case 'pizza':
        this.props.navigation.navigate('CouponPage')
      break ;
      case 'login':
        this.props.navigation.navigate('Login')
      break;
    }
  }

  _onPressShopingCart(){
    if(this.props.shoppingcart.length>0){
      this.props.navigation.navigate('CartPage');
    }else{ Alert.alert('No items in your shopping cart') }
  }
 
  render(){

    
    return(  
      <Container style={{
        backgroundColor:GREY_COLOR,
        display:  this.props.onTab === this.state.tab ? 'flex':'none'
      }}>
        <BenHeader>
           {
             this.state.userInfo.id !== 0 ? 
                <BenAvatar
                  onPress={()=>{ this.props.navigation.navigate('EditProfilePage',{
                        userInfo:this.state.userInfo
                      })
                  }}
                  data={{
                    uri: this.state.userInfo.photoURL ,
                    name: this.state.userInfo.name ,
                    point:this.state.userInfo.point
                  }}
                />:  
             <View style={{
               marginLeft:10,
               flexDirection:'row',
               justifyContent:'center',
               alignItems:'center'
             }}>  
                 <Icon style={{fontSize:22, marginRight: 10,}} name="person" /> 
                 <TouchableOpacity onPress={ ()=>{ this._goto('login') } } style={{
                   borderWidth:1,  
                   borderRadius:22,
                   width:100,
                   borderColor:COFFEE_COLOR,
                   alignItems:"center",
                   justifyContent:'center',
                   height:30
                 }}>
                    <Text style={{ color:COFFEE_COLOR, fontFamily:'Roboto' }}> Login </Text>
                 </TouchableOpacity>
             </View>
              
           }  
          
           {/* ICON CART INFO  */}
           <TouchableOpacity onPress={()=>{ this._onPressShopingCart() }} style={{ width: '10%', flexDirection: 'row', alignSelf: 'center'}}>

                <Icon style={{ fontSize: 28, color: COFFEE_COLOR}} name="cart" />
                
                {
                  this.props.shoppingcart.length > 0 ? 
                  <View style={[s.notiHolder, {display: this.props.shoppingcart.length > 0 ? 'flex' : 'none'} ]}>
                            <Text style={{color:'#fff', fontSize:10}}> { this.props.shoppingcart.length } </Text>
                  </View>:(null)
                  
                }
                

          </TouchableOpacity>

           

        </BenHeader>

        <BenLoader visible={this.state.loader} />

        <Content>

          <View style={ s.wraper }>

              <View style={ s.boxs}>

                  {
                    this.box.map((item)=>{
                      return(
                        <Box onPress={()=>{ this._goto(item.code) }} key={ item.code }  data={ item} />
                      )
                    })
                  }

              </View>

            {
                  this.data.map((item)=>{

                    const creatorAvatar = item.creator_avatar === null ? AVATAR_URL : item.creator_avatar ;

                    return(
                      <MyCard key={ item.id }>
                        <CardHeader>
                            <MyAvatar
                                data={{
                                 uri:creatorAvatar,
                                 name:item.creator,
                                 info:moment(item.date_created).fromNow()
                               }}
                            />

                        </CardHeader>

                        <CardImage
                          onPress={()=>{ this._onCardPress(item) }}
                          uri={ item.photo }
                        />

                        <View style={ s.cardContent }>
                            <View style={{
                              marginTop: 5,
                              marginBottom: 5
                            }}>
                                <Text style={{fontSize: 16,fontFamily:'Roboto',fontWeight: '500', color: COFFEE_COLOR}}>{ item.title } </Text>
                            </View>
                            <View>
                                <Text style={{fontFamily: 'Roboto', color: '#666'}}>{ item.short_content.replace(/&nbsp;/g,' ') } </Text>
                            </View>

                        </View>

                        <CardFooter>
                            <TouchableOpacity style={{ flexDirection:'row'}}>
                                 <Icon style={s.icon} name="heart" />
                                 <Text> { item.like } </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection:'row'}}>
                                 <Icon style={s.icon} name="chatbubbles" />
                                 <Text> { item.comments === null ? 0 : item.comments.length } </Text>
                            </TouchableOpacity>
                        </CardFooter>
                      </MyCard>



                    )
                  })
                }

          </View>


        </Content>
      </Container>

    )
  }
}

const s = StyleSheet.create({
  notiHolder:{
    position:'absolute',
    backgroundColor:'#000',
    width:15,
    height:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
    right:'14%',
    backgroundColor:'#DD4B39'
  },
  cardContent:{
    padding: 10,
    fontFamily: 'Roboto'
  },
  icon:{ fontSize:20,color:BLACK_COLOR},
  wraper:{
    alignItems:'center',
    paddingTop:10,
    paddingBottom:20
  },
  boxs:{
    width:'95%',
    flexDirection:'row',
    justifyContent:'space-between'
  }
})

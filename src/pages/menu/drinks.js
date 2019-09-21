/* @flow weak */
import {RED_COLOR, COFFEE_COLOR, BLACK_COLOR, GREY_COLOR } from '../../config/const';


import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';


import {  Icon, Content } from 'native-base';
import BenBody from '../../components/BenBody';

import NoData from '../../components/NoData';

const w = Dimensions.get('window');


const ItemPro = (props)=>{

  const item = props.data;
  const photo = item.photo.replace(/ /g,'%20');

  const percentWidth  = Platform.OS === 'android' ? '105%' : '100%';
  
  return(
    <View style={{
        marginTop: 15,
        flexDirection: 'row',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 0,
        width:percentWidth

      }}>

        <TouchableOpacity style={{
          backgroundColor:'rgba(0,0,0,0.1)'
          }} onPress={()=>{ props.onPress(item) }} >
          <Image 
            resizeMode="cover" 
            style={{width:120,height: 120}}  
            source={{
              uri: photo ,
            }}  

          />
        </TouchableOpacity>

        <View style={{
          paddingLeft: 10,
          justifyContent: 'center',
          width: '66%',
          backgroundColor:'#fff'
        
        }}>
          <TouchableOpacity onPress={()=>{ props.onPress(item) }}>
              <Text style={[s.txt,s.h4]}> { item.name }  </Text>
          </TouchableOpacity>

          <Text style={s.txt}> Size L  </Text>
          <Text style={s.txt,s.price }> { item.price_m }$ </Text>

        </View>

    </View>
  )
}

export default class BodyDrinks extends Component{


  constructor(props){
    super(props);

    this.data = props.data ;

  }


  _onPressItem(data){

    this.props.onPressItem(data);

  }
  render(){


    const data = this.props.data ;
    const cateInfo = this.props.cateInfo 

    return(
      <Content style={{
          backgroundColor: GREY_COLOR
        }}>

        <View style={{
          marginTop:15,
          width:'95%',
          marginLeft:'auto',
          marginRight:'auto',
          marginBottom:-15
        }}>
            <Text style={{
              fontFamily:'Roboto',
              fontSize:15,
              textTransform:'uppercase',
              color:COFFEE_COLOR
            }}>  
                { cateInfo.name }
            </Text>
        </View>    
        <BenBody>
            

            {
              data.map((item, index)=>{

                
                return (
                  <ItemPro key={index} onPress={(item)=>{  this._onPressItem(item)  }} data={item} />
                )
              })
            }
            { data.length == 0 ? <NoData visible={ !this.props.loader } icon="cafe" message=" On update data .. " /> : null }


        </BenBody>

      </Content>
    )
  }
}

const s =  StyleSheet.create({
  h4:{
    color: COFFEE_COLOR,
    fontSize: 16,
    fontWeight: '500',

  },
  price:{
    color:RED_COLOR,
    fontSize: 16,
    fontWeight: '500'
  },
  txt:{
    fontSize: 16,
    color: BLACK_COLOR,
    marginBottom:10,
    fontFamily: 'Roboto',

  }
})

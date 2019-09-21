import { COFFEE_COLOR, BLACK_COLOR } from '../../config/const';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Icon  } from 'native-base';

import BenProgress from '../../components/BenProgress';

function calculate(cart){

   let total = 0
   cart.map((item)=>{
     total += parseFloat(item.price) * parseInt(item.amount) ;
   });

   return total ;
}

function OrderItem(props){

    const arr = [
        'pendding',
        'delivery',
        'finish'
    ];
    const info = props.data ;
    const cart = JSON.parse(info.cart);
    const total = calculate(cart);

    const step = parseInt(info.status) + 1
    const statusPercent = step * 33.3;


    return(
        <TouchableOpacity onPress={props.onPress} style={s.card}>

            <View style={s.row}>
                <Icon style={s.icon} name="apps" />
                <Text style={s.text}>Invoice : { info.code }  </Text>
            </View>

            <View style={s.row}>
                <Icon style={s.icon} name="calendar" />
                <Text style={s.text}>Date : { info.date_created }   </Text>
            </View>

            <View style={s.row}>
                <Icon style={s.icon} name="pin" />
                <Text style={s.text}>Ship to : { info.delivery }   </Text>
            </View>


            <BenProgress style={{marginTop: 10,}} title= { arr[info.status] } percent={ statusPercent } />



            <View style={[s.row,{marginTop:15, flexDirection:'row', justifyContent:'space-between',}]}>
                <Text style={[s.text,{color:COFFEE_COLOR}]}>Total : ${ total }    </Text>
                <Text style={{backgroundColor:COFFEE_COLOR, color:'#fff', borderRadius:3, padding:3}}> { cart.length } </Text>
            </View>


        </TouchableOpacity>
    )
}

export default OrderItem;


const s = StyleSheet.create({
    row:{
      flexDirection:'row',
      alignItems: 'center',
      paddingBottom: 5,

    },
    icon:{fontSize:18, color:BLACK_COLOR, marginRight: 5, width:20, alignItems:'center', alignContent: 'center',},
    text:{fontFamily:'Roboto',fontSize:14, color:'#999'},
    card:{

      borderWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.1)',
      padding: 15,
      backgroundColor:'#fff',
      borderRadius: 6,
      marginBottom:10
    },
    title: {
      fontFamily: 'Roboto',
      fontSize:18
    },
  });

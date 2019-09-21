
import {RED_COLOR, COFFEE_COLOR, BLACK_COLOR, GREY_COLOR } from '../../config/const';


import moFire from '../../model/moFirebase';

import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Image, StyleSheet, TextInput } from 'react-native';

import { Content, Icon } from 'native-base';

import PopupModal from '../../components/PopupModal';



const ItemPro = (props)=>{

    const item = props.data;
    const photo = item.photo.replace(/ /g,'%20');
  
    return(
      <View style={{
          marginTop: 15,
          flexDirection: 'row',
          borderBottomColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 0,
  
        }}>
  
          <TouchableOpacity onPress={()=>{ props.onPress(item) }} style={{
            backgroundColor:'rgba(0,0,0,0.1)'
            }} >
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
            <TouchableOpacity onPress={()=>{ props.onPress(item) }} >
                <Text style={[s.txt,s.h4]}> { item.name }  </Text>
            </TouchableOpacity>
  
            <Text style={s.txt}> Size L  </Text>
            <Text style={s.txt,s.price }> 0$ </Text>
  
          </View>
  
      </View>
    )
}
export default class ListProFreeModal extends Component {


    _tempData = [];

    constructor(props){
        super(props);

        this.state = {
            data:[],
            keyText:''
        }
    }

    _onPressItem(item){
        this.props.onSelect(item)
    }
    componentDidMount(){
        
        try{

            this.model = new moFire('products');
            this.model.read((data)=>{

                this._tempData = data; 

                this.setState({
                    loader:false,
                    data:data
                })
            });
            
        }catch(err){
            console.log(err)
        }

        

    }

    // on search text
    _onChangeText(text){

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
    render() {
        return (
        <PopupModal 
            visible={ this.props.visible }
            style={{ height:'90%'}}>
            
            <View style={[s.header]}>
                <TouchableOpacity onPress={()=>{ this.props.onClose() }} style={{ width:30,height:30, position:'absolute',right:-36, top:-36}}>
                    <Icon  size={12} name="close-circle" />
                </TouchableOpacity>

                <View style={[s.searchBar]}>
                    <TextInput onChangeText={ (text)=>{ this._onChangeText(text) } } style={{ margin:5}} placeholder="search.." />
                </View>

                
            </View>
            <Content>

                {/* SEARCH BAR*/}
                
                {
                    this.state.data.map((item,index)=>{
                        return(
                            <ItemPro onPress={(item)=>{  this.props.onSelect(item)  }} key={index} data={ item } />
                        )
                    })
                }
            </Content>

            
        </PopupModal>
        )
    }
}

ListProFreeModal.defaultProps = {
    onClose:()=>{},
    onSelect:()=>{}
}


const s = StyleSheet.create({

    header:{
        width:'100%',
        marginBottom:20,
        alignItems:'center',
        height:36,
        justifyContent:'center'

    },
    searchBar:{
        marginVertical:10,
        borderRadius:18,
        height:34,
        padding:5,
        borderWidth:0.5,
        borderColor:'#ddd',
        width:'100%'
    },
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
});
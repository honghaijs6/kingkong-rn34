/* @flow */
import {  COFFEE_COLOR, BLACK_COLOR, GOOGLE_MAP_KEY, TIMEOUT } from '../../config/const' ;
import USER  from '../../config/user';

import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';


import { Container,  Content, Icon } from 'native-base';

import MyHeader from './header';
import BenStatusBar from '../../components/BenStatusBar';
import BenLoader from '../../components/BenLoader';





function Item(props){

  const data = props.data ;

  return(
    <TouchableOpacity onPress={()=>{ props.onPress(data)  }} style={s.items}>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{ justifyContent: 'center'}}>
            <Icon style={s.icon}  name={data.icon} />
          </View>
          <View style={{marginLeft: 10}}>
              <Text style={s.txt}> {data.label} </Text>
              <Text style={s.title}>  { data.name  }   </Text>
          </View>
        </View>
    </TouchableOpacity>
  )
}

class DeliveryPage extends Component {

  constructor(props){
    super(props)


    const userInfo = JSON.stringify(props.user.userInfo) === '{}' ? props.user.tempInfo : props.user.userInfo

    this.state = {

      loader:false,
      typeAction:'',
      onAction:'',
      tab:'delivery',

      mode:'none',
      userInfo: userInfo || {} ,



      personalItems:[
        {
          code:'home',
          icon:'home',
          label:'Home',
          name:  userInfo['home_address'],
          isEmpty: userInfo['home_address']
        },
        {
          code:'office',
          icon:'briefcase',
          label:'Work place',
          name:  userInfo['work_address'] ,
          isEmpty: userInfo['work_address']
        },
        /*{
          code:'current',
          icon:'navigate',
          label:'Current location',
          name:'..'
        },*/
        {
          code:'recent',
          icon:'time',
          label:'Recent search',
          name:  userInfo.recent_address || '...'
        },

      ]

    }

    this.data = [];


  }

  componentWillReceiveProps(newProps){

    const userInfo = JSON.stringify(newProps.user.userInfo) !=='{}' ? newProps.user.userInfo : newProps.user.tempInfo;

    this.state.personalItems[2]['name'] = userInfo.recent_address ||  '...' ;
    this.setState({
      userInfo: userInfo
    });

  }

  addressAutoComplete(key){


    let uri = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+key+'&key='+GOOGLE_MAP_KEY;
    fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {

      const locations = responseJson.predictions;
      let data = [];

      locations.map((item)=>{
        data.push({
          code:'search',
          icon:'pin',
          label:'',
          name:item.description
        });
      })

      data.unshift({
          code:'search',
          icon:'pin',
          label:'',
          name:key
      });

      this.data = data ;


      this.setState({
        typeAction:'get',
        onAction:'search',
      })


    })
    .catch((error) => {
      console.error(error);
    });


  }

  _onCloseSearch(){
    this.data = [] ;
    this.setState({
      onAction:'',
    })
  }

  //
  async _onItemPress(data){


    if(data.name !=='...'){


      const userInfo = this.state.userInfo;

      if(JSON.stringify(userInfo)!=='{}'){

        if(data.name.length > 10){

          this.setState({loader:true});
          const msg = await USER.update(userInfo.id,{
              name:userInfo.name,
              recent_address:data.name
          });
          this.setState({loader:false})
          Keyboard.dismiss();

          // go back
          this._whereStateChange({
            onAction:'goBack'
          })

        }

      }else{  alert(JSON.stringify(data)) }



    }


  }

  _whereStateChange(newState){
    switch(newState.onAction){
      case 'goBack':
        this.props.navigation.goBack();
      break;
    }
  }
  _onTextChange(text){

    this.addressAutoComplete(text);
  }



  render() {


    //console.log(this.state.userInfo);


    return (
      <Container>

        <BenStatusBar/>

        <MyHeader
          onBackBtnPress={()=>{  this.props.navigation.goBack()  }}
          onAction={ this.state.onAction } onCloseSearch={ ()=>{  this._onCloseSearch() } }
          onChangeText={(text)=>{ this._onTextChange(text)  }}
        />

        <BenLoader visible={ this.state.loader } />

        <Content>

          <View style={[s.block]}>


              {
                this.data.map((item,index)=>{
                  return(
                    <Item onPress={ (data)=>{ this._onItemPress(data) } } key={index}  data={item} />
                  )
                })
              }
          </View>
          <View style={[s.block]}>
            {
              this.state.personalItems.map((item,index)=>{
                if(item.name!==''){
                  return(
                    <Item onPress={ (data)=>{ this._onItemPress(data) } } key={index}  data={item} />
                  )
                }

              })
            }

          </View>

        </Content>

      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(DeliveryPage);


const s = StyleSheet.create({

  icon:{
    color: COFFEE_COLOR
  },
  txt:{
    fontFamily:'Roboto',
    fontSize: 11,
    color: COFFEE_COLOR
  },
  title:{
    fontFamily:'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    marginLeft: -5
  },
  items:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.5
  },
  block:{
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10
  }
});

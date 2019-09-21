import USER from '../../config/user';
import { GREY_COLOR, COFFEE_COLOR } from '../../config/const';


import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Icon,  Content } from 'native-base';


import BenHeader from '../../components/BenHeader' ;
import BenAvatar from '../../components/BenAvatar';
import ProfileName from './profileName';


export default class AccountPage extends Component{

  constructor(props){
    super(props)

    this.state = {

      typeAction:'',  
      onAction:'',
      tab:'account',

      userInfo: props.userInfo


    }

    this._onSignOut = this._onSignOut.bind(this);
  }

  async _onSignOut(){

    const ret =  await USER.logout();
    if(ret!==false){
      this.props.navigation.navigate('Login')
    }

  }

  componentWillReceiveProps(newProps){
    this.setState({
      userInfo:newProps.userInfo
    });

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

              /> : 
              
              <View style={{
                marginLeft:10,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
              }}>  
                  <Icon style={{fontSize:22, marginRight: 10,}} name="person" /> 
                  <TouchableOpacity onPress={ ()=>{ this.props.navigation.navigate('Login') } } style={{
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
        </BenHeader>

        <Content>

            {
              this.state.userInfo.id !== 0 ?
              <ProfileName userInfo={ this.state.userInfo   } /> :
              <View></View>
            }
          

          <View style={s.holder }>
            <TouchableOpacity onPress={ ()=>{ this.state.userInfo.id !== 0 ? this.props.navigation.navigate('RewardPage') : this.props.navigation.navigate('DealPage') } } style={ s.btnItem }>
              <Icon style={s.icon} name="star" />
              <Text style={s.txt}>
                 King Kong Milk Tea Rewards
              </Text>
            </TouchableOpacity>

            {
              this.state.userInfo.id !== 0 ?
              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('HistoryPage') }}  style={ s.btnItem }>

                <Icon style={s.icon} name="time" />
                <Text style={s.txt}>
                  History
                </Text>
              </TouchableOpacity> :
              <View></View>
            }

            <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('HelpPage') }} style={ s.btnItem }>
              <Icon name="help-buoy" style={s.icon} ></Icon>
              <Text style={s.txt}>
                Help
              </Text>
            </TouchableOpacity>

            {
              this.state.userInfo.id !== 0 ? 
              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SettingDeliveryPage',{
                  userInfo:this.props.userInfo
                }) }} style={ s.btnItem }>

                <Icon name="settings" style={s.icon} ></Icon>
                <Text style={s.txt}>
                  Setting Delivery Location
                </Text>
              </TouchableOpacity> :
              <View></View>

              
            }
            
            {
              this.state.userInfo.id !== 0 ? 
              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('EditProfilePage',{
                  userInfo:this.props.userInfo
                }) }} style={ s.btnItem }>

                <Icon name="person" style={s.icon} ></Icon>
                <Text style={s.txt}>
                  Edit Profile
                </Text>
              </TouchableOpacity>:
              <View></View>
              
            }

            {
              this.state.userInfo.id !== 0 ? 
              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('ChangePassPage',{
                  userInfo:this.props.userInfo
                }) }} style={ s.btnItem }>

                <Icon name="key" style={s.icon} ></Icon>
                <Text style={s.txt}>
                  Change Password
                </Text>
              </TouchableOpacity> : 
              <View></View>
            }

            {
              this.state.userInfo.id !== 0 ?
              <TouchableOpacity onPress={ this._onSignOut } style={ [s.btnItem,s.lastBtnItem] }>

                <Icon name="log-out" style={s.icon} ></Icon>
                <Text style={s.txt}>
                  Log out
                </Text>
              </TouchableOpacity> : 
              <View></View>
              
            }


          </View>
        </Content>

      </Container>

    )
  }
}

const s = StyleSheet.create({

  holderProfile:{
    marginTop: 10,
    backgroundColor: COFFEE_COLOR,
    alignItems: 'center',
  },
  holder:{

    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  icon:{
    fontSize: 24,
    color: COFFEE_COLOR
  },
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 10,
    color:COFFEE_COLOR
  },
  lastBtnItem:{
    borderBottomWidth:0
  },
  btnItem:{
    width: '90%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    height: 50,
    flexDirection:'row'
  }
})

/* @flow */
import { COFFEE_COLOR, GREY_COLOR } from '../../config/const';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { Container, Content, Icon } from 'native-base';
import BenHeader from '../../components/BenHeader';
import BenStatusBar from '../../components/BenStatusBar';
import BackButton from '../../components/BackButton';
import BenBody from '../../components/BenBody'


class SettingDeliveryPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      userInfo:props.userInfo
    }

  }

  componentWillReceiveProps(newProps){
    
    this.setState({
      userInfo:newProps.userInfo
    });

  }
  _listenStore(){

    /*this.unsubscribe = this.store.subscribe(()=>{
      const userInfo = this.store.getState().user.userInfo;

      this.setState({
        userInfo:userInfo
      });

    })*/
  }

  componentDidMount(){
    //this._listenStore();
  }
  componentWillUnmount(){

    //this.unsubscribe();

  }
  render() {

    const userInfo = this.state.userInfo;


    return (
      <Container>
        <BenStatusBar/>
        <BenHeader>
            <BackButton onPress={()=>{  this.props.navigation.goBack() }} />
            <View>
                <Text style={ s.title }> Setting Delivery Location </Text>
            </View>
            <View></View>
        </BenHeader>
        <Content style={{backgroundColor: GREY_COLOR}}>
           <BenBody>
              <View style={{
                marginTop: 10,
                backgroundColor: '#fff',
                borderRadius: 6,
                padding:15

              }}>

                <TouchableOpacity onPress={ ()=>{ this.props.navigation.navigate('MapPage',{for:'home_address'}) } } style={ s.btnItem }>
                  <Icon style={s.icon} name="home" />
                  <View style={{
                    paddingLeft:10,
                    paddingRight: 10,
                    }}>
                    <Text style={s.label}>
                      Your Home Address
                    </Text>
                    <Text style={s.txt}> { userInfo.home_address || '...' } </Text>

                  </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={ ()=>{ this.props.navigation.navigate('MapPage',{for:'work_address'}) } } style={ [s.btnItem,s.lastBtnItem] }>
                  <Icon style={s.icon} name="planet" />
                  <View style={{
                    paddingLeft:10,
                    paddingRight: 10,
                    }}>
                    <Text style={s.label}>
                      Office place Address
                    </Text>
                    <Text style={s.txt}>
                    { userInfo.work_address || '...' }
                    </Text>

                  </View>
                </TouchableOpacity>

              </View>
           </BenBody>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    userInfo:state.user.userInfo
  }
}

export default connect(mapStateToProps)(SettingDeliveryPage);


const s = StyleSheet.create({
  icon:{
    fontSize: 28,
    color: COFFEE_COLOR
  },
  label:{
    fontSize:11,
    fontFamily:'Roboto'
  },
  title:{
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  txt:{
    fontSize: 16,
    fontFamily: 'Roboto',
    color:COFFEE_COLOR
  },
  lastBtnItem:{
    borderBottomWidth:0
  },
  btnItem:{
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    height: 60,
    flexDirection:'row'
  }
});

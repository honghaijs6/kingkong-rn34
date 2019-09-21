/* @flow */
import { GREY_COLOR, TIMEOUT } from '../../config/const';
import Api from '../../model/api';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,

} from 'react-native';

import { connect } from 'react-redux';

import { Container, Content } from 'native-base';

import BenStatusBar from '../../components/BenStatusBar';
import BenHeader from '../../components/BenHeader';
import BackButton from '../../components/BackButton';
import BenBody from '../../components/BenBody' ;

import BenLoader from '../../components/BenLoader';
import NoData from '../../components/NoData';

import OrderItem from './OrderItem';

class HistoryPage extends Component {

  constructor(props){

    super(props)

    this.state = {
      loader:false,
      data:[]
    }

    this.userInfo = props.userInfo;
    this._setup();


  }

  _setup(){
    this.Api = new Api('orders');

    this.Api.set('method',{
      name:'listAll',
      params:'all?creator_id='+this.userInfo.id
    });

  }



  componentDidMount(){

    this.setState({loader:true});
    //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT); 


    this.Api.fetch((res)=>{

      res = res.data ;

      if(res.name==='success'){
        this.setState({
          loader:false,
          data:res.rows
        });
      }

    });


  }


  render() {
    return (
      <Container>
        <BenStatusBar/>
        <BenHeader type="flex-start">
          <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
          <View>
            <Text style={s.title}> History of orders </Text>
          </View>
          <View></View>
        </BenHeader>
        <BenLoader visible={this.state.loader} />
        <Content style={s.bg}>
            <BenBody>
                {
                  this.state.data.map((item)=>{
                    return(
                      <OrderItem
                        onPress={()=>{
                          this.props.navigation.navigate('HistoryPageView',{
                            data:item
                          })
                        }}
                        key={item.id} data={item} />
                    )
                  })
                }
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

export default connect(mapStateToProps)(HistoryPage);

const s = StyleSheet.create({
  bg:{
    backgroundColor:GREY_COLOR
  },
  title: {
    fontFamily: 'Roboto',
    fontSize:18
  },
});

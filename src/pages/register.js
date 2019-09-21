/* MODEL */
import USER from '../config/user';

/* hook */
import {detectForm} from '../hook/before/';
import { validateEmail, validatePassword, confirmPassword } from '../hook/ultil/validate';

import React, { Component } from 'react';

import { View, StyleSheet, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container,Content,Item,Icon ,Text,Input, Button  } from 'native-base';


import Toast from 'react-native-easy-toast';
import BenLoader from '../components/BenLoader';


class Register extends Component {


  constructor(props){
  
    super(props);

    this.state = {
      loader:false,
      typeAction:'',
      onAction:'',
      status:'',


    }

    this.data = {
      name:'',
      email:'',
      password:'',
      repassword:''
    }


    this._onSubmit = this._onSubmit.bind(this);

  }

  _onChangeText(json){

     Object.assign(this.data,json);

     this.setState({
       onAction:'typing'
     })

  }

  _onProsess(){

    this._whereStateChange({typeAction:'post'});
  }
  _onFree(){
    this._whereStateChange({typeAction:''})
  }


  async _onSubmit(){


    this._onProsess();
    if(detectForm(['name','email','password','repassword'], this.data )===''){

          let msg = '' ;

          if(!validateEmail(this.data.email)){
            msg = 'Please enter your correct email format';
          }else if(!validatePassword(this.data.password)){
            msg = 'please enter your at least 6 digit for your password';
          }else if(!confirmPassword(this.data.password,this.data.repassword)){
            msg = 'Your password  unmatch';
          }else{

            msg = await USER.register(this.data) ;

            if(msg==='ok'){

              //USER.checkLoginStatus();

              const res = await USER.authenticate(this.data.email,this.data.password);
              if(res.userInfo !== undefined){
                USER.checkLoginStatus();
              }


            }else{
              this.refs.toast.show(msg,3000);
              this._onFree();
            }

          }

          if(msg!==''){
            this.refs.toast.show(msg,3000);
            this._onFree();
          }






    }else{

      this.refs.toast.show("Please type your correct info!",1000);
      this._onFree();

    }
  }

  /* WHERE */

  _whereStateChange(newState){
    if(newState.typeAction==='post'){
        this.setState({loader:true});
        //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT);

    }else{
      this.setState({loader:false})
    }
  }

  componentWillReceiveProps(newProps){
    const userInfo = newProps.user;
      
    if(userInfo.isLoggedIn !==false){
      this.props.navigation.navigate('Home') ; 
    }
  }

  render() {


        const disabledBtn = this.state.typeAction === '' ? false : true;

        return (

            <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}>

                <Container
                style={{

                    flex:1,
                    backgroundColor:'rgba(255,255,255,0.6)',


                }}>

                <BenLoader visible={ this.state.loader } />

                <View style={{paddingTop:14}}></View>
                <View style={s.header} >
                    <View style={{ width:'35%',}}>
                        <TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }} style={ s.btn}>
                            <Icon style={[s.text,{marginLeft:10}]} name='arrow-back' />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width:'65%'}}>
                        <Text style={[s.text,s.title]}> Register Account </Text>
                    </View>
                </View>
                <Content>

                    <View style={{
                        width:'80%',
                        marginTop:'15%',
                        alignSelf:'center',
                        justifyContent:'space-between'
                    }}>

                        <View style={{
                            justifyContent:'space-between',
                            height:180
                        }}>

                            <Item style={ s.item}>
                                <Icon style={s.text} name='person' />
                                <Input autoCapitalize='none' value={ this.data.name } onChangeText={(text)=>{ this._onChangeText({name:text}) }} placeholderTextColor="rgba(0,0,0,0.6)" style={s.text} placeholder='Full name'/>
                            </Item>

                            <Item style={ s.item}>
                                <Icon style={s.text} name='mail' />
                                <Input autoCapitalize='none' value={this.data.email} placeholderTextColor="rgba(0,0,0,0.6)" onChangeText={(text)=>{ this._onChangeText({email:text}) }} style={s.text} placeholder='E-mail'/>

                            </Item>

                            <Item style={ s.item}>
                                <Icon style={s.text} name='lock' />
                                <Input autoCapitalize='none' value={ this.data.password } secureTextEntry={true} onChangeText={(text)=>{ this._onChangeText({password:text}) }} placeholderTextColor="rgba(0,0,0,0.6)" style={s.text}  placeholder='Password'/>
                            </Item>

                            <Item style={ s.item}>
                                <Icon style={s.text} name='lock' />
                                <Input autoCapitalize='none' value={ this.data.repassword } secureTextEntry={true} onChangeText={(text)=>{ this._onChangeText({repassword:text}) }} placeholderTextColor="rgba(0,0,0,0.6)" style={s.text}  placeholder='Retype password'/>
                            </Item>



                        </View>

                        <View style={{
                            marginTop:'15%',
                            justifyContent:'space-between',
                            height:120
                        }}>
                            <Button disabled={ disabledBtn } onPress={ this._onSubmit } full style={s.button}>
                                <Text style={{color:'#fff'}} > Register </Text>
                            </Button>



                        </View>


                    </View>

                </Content>
                <Toast position='top'
                positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}

                 ref="toast"/>
            </Container>

            </ImageBackground>



        );
    }
}



const s = StyleSheet.create({


    header:{
        flexDirection:'row',
        height:50,
        borderBottomWidth:0.3,
        alignItems:'center',
        borderBottomColor:'rgba(87,60,35,0.3)',

        fontFamily: 'Roboto',
    },
    title:{
      fontSize: 18
    },
    text:{ fontFamily:'Roboto',color:'rgba(87,60,35,0.9)'},
    button:{
        backgroundColor:'rgba(87,60,35,0.7))',
        borderRadius:30,
        height:50
    },
    input:{

    },
    item:{
       borderWidth:0.5,
       borderBottomColor:'rgba(87,60,35,0.3)'

    },

});


export default Register;

import { COFFEE_COLOR } from '../../config/const';
/* MODEL */
import USER from '../../config/user';

/* hook */
import {detectForm} from '../../hook/before/';
import {  validatePassword, confirmPassword } from '../../hook/ultil/validate';



import React, { Component } from 'react';
import { View, StyleSheet, Keyboard  } from 'react-native';

import { Container,Content,Item,Icon ,Text,Input, Button  } from 'native-base';
import { connect } from 'react-redux';

import Toast from 'react-native-easy-toast';
import BenLoader from '../../components/BenLoader';


/* MODEL */
import BenHeader from '../../components/BenHeader';
import BenStatusBar from '../../components/BenStatusBar';
import BackButton  from '../../components/BackButton';

class ChangePassPage extends Component {


  constructor(props){

    super(props);

    this.state = {
 
      loader:false,
      typeAction:'',
      onAction:'',
      status:'',

      userInfo: props.user.userInfo // connected redux before
    }

    this.data = {
      curent:'',
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

    Keyboard.dismiss();

    if(detectForm(['curent','password','repassword'], this.data )===''){

       this.setState({loader:true});

       // PROGRESS AUTHENTICATE
       let resMsg = await USER.authentication(this.state.userInfo.email,this.data.curent);
       this.setState({loader:false});

       if(resMsg==='success'){

        resMsg = '';

        if(!validatePassword(this.data.password)){
          resMsg = 'please enter your at least 6 digit for your password';
        }else if(!confirmPassword(this.data.password,this.data.repassword)){
          resMsg = 'Your password  unmatch';
        }else{

          this.setState({loader:true});

          const resetMsg =  await USER.update(this.state.userInfo.id,{
            name:this.state.userInfo.name,
            password:this.data.password
          });

          this.setState({loader:false});

          this.refs.toast.show(resetMsg,1000);


        }

        resMsg === '' ? null : this.refs.toast.show(resMsg,1000);
        this.setState({loader:false});




       }else{  this.refs.toast.show("your current password incorrect",1000); }

       //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT)


    }else{
      this.refs.toast.show("Please type your correct info!",1000);
    }


  }

  /* WHERE */

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState))
  }

  render() {


        const disabledBtn = this.state.typeAction === '' ? false : true;

        return (

          <Container>

            <BenStatusBar  />

            <BenHeader type="flex-start">
              <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
              <Text style={s.title}> Change Password </Text>
            </BenHeader>

            <BenLoader visible={ this.state.loader } />

            <Content>

                <View style={{
                    width:'80%',
                    alignSelf:'center',
                    justifyContent:'space-between'
                }}>


                    <View style={{
                        marginTop:'10%',
                        justifyContent:'space-between',
                        height:120
                    }}>

                        <Item style={ s.item}>
                            <Icon style={s.icon} name='lock' />
                            <Input autoCapitalize='none' secureTextEntry={true} onChangeText={(text)=>{ this._onChangeText({curent:text}) }}  placeholderTextColor="rgba(0,0,0,0.3)"  style={s.text} placeholder='Current'/>

                        </Item>

                        <Item style={ s.item}>
                            <Icon style={s.icon} name='lock' />
                            <Input autoCapitalize='none'  secureTextEntry={true} onChangeText={(text)=>{ this._onChangeText({password:text}) }}  placeholderTextColor="rgba(0,0,0,0.3)" style={s.text}  placeholder='New'/>
                        </Item>

                        <Item style={ s.item}>
                            <Icon style={s.icon} name='lock' />
                            <Input autoCapitalize='none' secureTextEntry={true} onChangeText={(text)=>{ this._onChangeText({repassword:text}) }} placeholderTextColor="rgba(0,0,0,0.3)" style={s.text}  placeholder='Re-type new'/>
                        </Item>

                    </View>

                    <View style={{marginTop:81}}>
                      <Button disabled={ disabledBtn } onPress={ this._onSubmit } full style={s.button}>
                          <Text style={{color:'#fff'}} > Confirm reset password </Text>
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



        );
    }
}



const s = StyleSheet.create({

    icon:{ fontSize:20,color:COFFEE_COLOR },
    title:{
      fontSize: 18
    },
    text:{ fontFamily:'Roboto',color:COFFEE_COLOR, fontSize:16},
    button:{
        backgroundColor:COFFEE_COLOR,
        borderRadius:30,
        height:50
    },
    item:{
       borderWidth:0.5,
       borderBottomColor:COFFEE_COLOR,
       marginBottom:10

    },

});

function mapStateToProps(state){
  return {
    user:state.user
  }
}


export default connect(mapStateToProps)(ChangePassPage);

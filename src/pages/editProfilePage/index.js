import { storage } from '../../config/firebase';
import { COFFEE_COLOR } from '../../config/const';
import USER from '../../config/user';


import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, Image, TouchableOpacity, ImageEditor  } from 'react-native';

import { Container,Content,Item,Label ,Text,Input, Button  } from 'native-base';
import Toast from 'react-native-easy-toast';


import DatePicker from 'react-native-datepicker';
import BenHeader from '../../components/BenHeader';


import BenStatusBar from '../../components/BenStatusBar';
import BackButton  from '../../components/BackButton';

/* hook */
import {detectForm} from '../../hook/before/';
import BenLoader from '../../components/BenLoader';
import { validateEmail } from '../../hook/ultil/validate';


class EditProfilePage extends Component {


  constructor(props){

    super(props);

    this.state = {
      loader:false,
      typeAction:'',
      onAction:'',
      status:'',

      image: props.user.userInfo.photoURL ,


    }

    this.data = props.user.userInfo


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
    if(detectForm(['name','email','phone'], this.data )===''){

          let msg = '' ;

          if(!validateEmail(this.data.email)){
            msg = 'Please enter your correct email format';
          }else{

             this.setState({loader:true});
             //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT)

             const resMsg =  await USER.update(this.data.id,{
               name:this.data.name,
               phone:this.data.phone,
               birthday:this.data.birthday

             });

             this.refs.toast.show(resMsg,3000);
             this.setState({loader:false});


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
    this.setState(Object.assign(this.state,newState))
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

  };



  async _pickImage(){

    const photoName = this.data.id;

    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('got here');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 200, height: 200 },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });


    this.setState({loader:true});
    //setTimeout(()=>{ this.setState({loader:false}) },TIMEOUT)

    const resURL = await this._uploadImage(resizedUri, photoName) ;

    await USER.update(this.data.id,{
      name:this.data.name,
      photoURL:resURL
    });

    this.setState({loader:false})

    this.setState({ image: resizedUri });

  };

  _uploadImage = async (uri, imageName) => {
    //const response = await fetch(uri);
    //const blob = await response.blob();

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });


    var ref = storage.ref().child("images/" + imageName);

    const snapshot = await ref.put(blob);

    blob.close();
    return await snapshot.ref.getDownloadURL();



  }

  render() {


        const disabledBtn = this.state.typeAction === '' ? false : true;

        let userInfo = this.data ;
        userInfo.birthday = userInfo.birthday || '2019-02-23';

        return (

          <Container>

            <BenStatusBar  />

            <BenHeader type="flex-start">
              <BackButton onPress={()=>{ this.props.navigation.goBack() }} />
              <Text style={s.title}> Edit Profile </Text>
            </BenHeader>

            <BenLoader visible={ this.state.loader } />

            <Content>

                <View style={{
                    width:'80%',
                    marginTop:'5%',
                    alignSelf:'center',
                    justifyContent:'space-between'
                }}>

                    <View style={{
                        justifyContent:'space-between',
                    }}>

                        <View style={{alignItems:'center'}}>

                            <View style={{alignItems:'center',width:100,height:100}}>

                              <Image source={{uri:this.state.image}}
                              style={{height: 100, width: 100, borderRadius:50, borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.2)'}}
                              />
                              <TouchableOpacity
                                onPress={()=>{this._pickImage()}}
                              style={{
                                backgroundColor:'#333',
                                width:30, height:30,
                                borderRadius:15,
                                borderWidth:1,
                                borderColor:'#fff',
                                position:'absolute',
                                right:0,
                                bottom:0,
                                justifyContent:'center',
                                alignItems:'center'
                              }}>
                                  <Text style={{color:'#fff'}}> + </Text>
                              </TouchableOpacity>

                            </View>

                        </View>


                        <Item stackedLabel style={ s.item}>


                            <Label style={s.label}>  Full name</Label>
                            <Input
                                defaultValue={ userInfo.name }
                                onChangeText={(text)=>{ this._onChangeText({name:text}) }}
                                placeholderTextColor="rgba(0,0,0,0.6)" style={s.text}  placeholder='Full name'/>
                        </Item>

                        <Item stackedLabel style={ s.item}>
                            <Label style={s.label}> E-mail  </Label>
                            <Input
                              disabled
                              defaultValue={ userInfo.email }
                              placeholderTextColor="rgba(0,0,0,0.6)"
                              onChangeText={(text)=>{ this._onChangeText({email:text}) }} style={s.text} placeholder='E-mail'/>

                        </Item>

                        <Item stackedLabel style={ s.item}>
                            <Label style={s.label}>  Phone number </Label>
                            <Input
                              keyboardType='numeric'
                              defaultValue={ userInfo.phone }
                              placeholderTextColor="rgba(0,0,0,0.6)"
                              onChangeText={(text)=>{ this._onChangeText({phone:text}) }} style={s.text} placeholder='Phone number'/>

                        </Item>

                        <Item style={ s.item}>

                            <Text style={s.label} > Your Birthday :  </Text>

                            <DatePicker
                              style={{width:100, paddingVertical: 5}}
                              date={ userInfo.birthday }
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"

                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              showIcon={false}
                              hideText={false}
                              allowFontScaling={true}
                              customStyles={{

                                dateInput: {
                                  marginLeft: 0,
                                  borderWidth:0,


                                }
                                // ... You can check the source to find the other keys.

                              }}
                              onDateChange={ (date)=>{  this._onChangeText({birthday:date}) } }
                            />

                        </Item>





                    </View>

                    <View style={{
                        marginTop:'15%',
                        justifyContent:'space-between',
                        height:120
                    }}>
                        <Button disabled={ disabledBtn } onPress={ this._onSubmit } full style={s.button}>
                            <Text style={{color:'#fff'}} > Update </Text>
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

    title:{
      fontSize: 18
    },
    icon:{
      fontSize: 14,
      color:COFFEE_COLOR
    },
    label:{
      marginLeft: -7,
      fontFamily: 'Roboto',
      color: COFFEE_COLOR,
    },
    text:{ fontFamily:'Roboto', marginLeft: -5},
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

export default connect(mapStateToProps)(EditProfilePage);

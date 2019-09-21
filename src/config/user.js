
import { AVATAR_URL } from '../config/const';
import axios from 'react-native-axios';
import socket from './socket';
import store from '../redux/store';
import notification from '../config/notification';
import {AsyncStorage} from 'react-native';

// MUST BE UPDATE THIS FROM CLOUDE 
import { MAX_REDEEM } from './const';

const API_ENDPOINT = socket.server.base();

const USER = {


    _whereStateChange(newState){
        store.dispatch(newState);
    },


    async register(data){
        return new Promise((resole,reject)=>{

            const url = API_ENDPOINT+'/users';
            axios.post(url,data).then((res)=>{
                res = res.data ;
              
                if(res.name==='ok'){

                    AsyncStorage.setItem('userInfo',JSON.stringify(res.data)).then(()=>{

                        AsyncStorage.setItem('authenticateInfo',JSON.stringify({
                            email:data.email,
                            password:data.password
                        })).then(()=>{

                          resole(res.name);

                        });

                   });




                }else{
                    resole(res.message);
                }

            })
        });
    },



    // JUST USING FOR USER TABLE
    async update(id,data){

        return new Promise((resole,reject)=>{


            if(parseInt(id)!==0){

              const url = API_ENDPOINT+'/users?id='+id;
              axios.put(url,data).then((res)=>{
                  res = res.data ;
                  if(res.name==='success'){
                      let userInfo = store.getState().user.userInfo;
                      Object.assign(userInfo,data);


                      AsyncStorage.setItem('userInfo',JSON.stringify(userInfo)).then(()=>{

                          // REFESH REDUX
                          this._whereStateChange({
                              type:'LOGIN',
                              isLoggedIn:true,
                              userInfo:userInfo
                          });

                          resole('Update success')



                      })

                  }else{
                      resole(res.message);
                  }


              });
            }else{

              let tempInfo = store.getState().user.tempInfo; 
              Object.assign(tempInfo,data);

              this._whereStateChange({
                  type:'TEMP',
                  tempInfo:tempInfo
              });

              resole('Update success');
              
            }

            


        })
    },

    async logout(){
        return new Promise((resole,reject)=>{

          socket.emit('logout',(message,data)=>{


            AsyncStorage.clear(()=>{

                // RESET REDUX USER
                this._whereStateChange({
                    type:'LOGIN',
                    isLoggedIn:false,
                    userInfo:{}
                });

                // RESET REDUX SHOPPING CART
                

                resole(true);
            })


          })


  
        })
    },


    _isAvailableRedeem(userInfo){
      
      if(parseInt(userInfo.point) >= MAX_REDEEM){
        
        this._whereStateChange({
          type:'REDEEM',
          redeem:1
        });
      }
    },

    async getInfo(ID){

      return new Promise((resole,reject)=>{
        const uri = API_ENDPOINT+'/users/getInfo/'+ID;

        
        axios.get(uri)
              .then((res) => {

                
                const userInfo = res.data ;
                this._whereStateChange({
                  type:'LOGIN',
                  isLoggedIn:true ,
                  userInfo:userInfo
                });
                
                resole(res.data);

                
                
              },
              (error) => {
                  reject(error);

              });
      })
    },

    _getInfo(ID){

      
      const uri = API_ENDPOINT+'/users/getInfo/'+ID;
      axios.get(uri)
            .then((res) => {

              const userInfo = res.data ;

              this._whereStateChange({
                type:'LOGIN',
                isLoggedIn:true ,
                userInfo:userInfo
              });

              this._isAvailableRedeem(userInfo);


            },
            (error) => {
                console.log(error)

              }  
            );
      
      
    },
    async checkLoginStatus(){

      // GET EXPO TOKEN


        return new Promise((resole,reject)=>{

            AsyncStorage.getItem('userInfo').then((data)=>{

                const info = JSON.parse(data) || {} ;
                
                
                if(info.id !== undefined){
                  

                  // SILENT GET USER INFO
                  this._getInfo(info.id);

                  notification.getExpoToken((expoToken)=>{

                    if(info.expo_token===undefined || info.expo_token === null ){
                       this.update(info.id,{
                         name:info.name,
                         expo_token:expoToken
                       });
                    }

                  });
                }



                // SILENT LOGIN SERVER
                if(data!==null){
                    AsyncStorage.getItem('authenticateInfo').then((info2)=>{

                        if(info2!==null){

                          info2 = JSON.parse(info2);
                          socket.emit('authenticate', {

                              "strategy":"local",
                              "email": info2.email,
                              "password": info2.password

                              }, (message, data)=> {

                                if(data!==undefined){
                                  //alert(JSON.stringify(data))
                                  //alert('silent logined') ;
                                  resole('logedin')
                                }else{
                                  //alert(info2.email+'-'+info2.password)
                                  //alert('silent failt')
                                  resole('fail')
                                }

                          });
                        }


                    });
                }


                // END SILENT

            });

        })
    },

    async authentication(email,password){

        return new Promise((resole,reject)=>{
            socket.emit('authenticate', {

                "strategy":"local",
                "email": email,
                "password": password

                }, (message, data)=> {

                  if(data!==undefined){

                    resole('success')

                  }else{
                    resole('NotAuthenticated')

                  }

            });
        })
    },

    async authenticate(email,password){

        return new Promise((resole,reject)=>{

            socket.emit('authenticate', {

                "strategy":"local",
                "email": email,
                "password": password

                }, (message, data)=> {

                  if(data!==undefined){

                    AsyncStorage.setItem('token',data.accessToken);


                    // GET USER INFO ADD SAVE LOCALSTOREAGE
                    const url = API_ENDPOINT+'/users?email='+email;
                    axios.get(url).then((res)=>{

                         const data = res.data;
                         if(data.name==='success'){
                           AsyncStorage.setItem('userInfo',JSON.stringify(data.rows[0])).then(()=>{

                                resole({
                                    message:message,
                                    data:data,
                                    userInfo:data.rows[0]
                                });

                           });

                           AsyncStorage.setItem('authenticateInfo',JSON.stringify({
                               email:email,
                               password:password
                           }));



                         }


                    })

                  }else{
                    resole({
                        message,data
                    })
                  }

            });

        })
    }
}

export default USER;

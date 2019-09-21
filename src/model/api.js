/* MODEL NÀY CÓ THỂ KẾT NỐI VỚI REDUX - MOBX để luu cache database dùng lại*/
/*
MODEL : MAKE RESFUL API

    TRIGGER AFFTER DONE WITH DATABASE
    - SAVE PRIVATE DATA
    - SAVE GLOBAL DATA
          on POST
          on PUT
          on DELETE

    -> TRIGGER FOR MAIN DATACHANGE
    -> TRIGGER ON ACTION GET ERROR
*/

//import Socket from './socket';

import { TIMEOUT } from '../config/const';

import {AsyncStorage} from 'react-native';

// DATABASE
import server from '../config/server';
import axios from 'react-native-axios';

class Api {

  constructor(model){


    this.model = model; // string

    this.data = {};
    this.state = {
      typeAction:'',
      onAction:'',
      status:'',
      res:{}
    }

    /*database*/
    this.db = {
      type:'GET',
      url:'',
      base:server.base() + '/'+ this.model+'?',
      config:'',
      paginate:server.paginate,
      total:0
    };

    this.setup();


  }

  setup(){

    // database : config header ajax with token : do POST - PUT ...
    this.configDB();

  }

  configDB(){
    const _this = this ;
    let  url = this.db.base +   Object.keys(this.db.paginate).map((key)=>{
        return key +'='+ this.db.paginate[key]
    }).join('&');

    /* RECONFIG DB QUERY */
    if(typeof this.db.method !== 'undefined'){

      const base  = this.db.base.replace('?','');

      const dot = this.db.method.params.indexOf('?') >-1 ? '&' : '?' ;

      url = base +'/'+ this.db.method.name+'/'+this.db.method.params+dot+ Object.keys(this.db.paginate).map((key)=>{
          return key +'='+ this.db.paginate[key]
      }).join('&');

    }

    this.db.url = url;

    AsyncStorage.getItem('token').then((token)=>{
      this.db.config = {
        timeout: TIMEOUT,
        headers:{
          "Content-Type": "application/json",
          "Authorization": token,
          "cache-control": "no-cache"
        }
      }

    });


  }

  resetConfigDB(name,value){
    this.db[name] = value;
    this.configDB();


  }

  /* WHEN */
  /* start listen to socket server -> save LocalData -> send to reducers
    tren cung 1 may tinh se ko cap nhat socket realtime
  */

  /********WHEN *********** */
  onError(err){

    /*const data = err.response.data ;
    const msg = data.errors[0];
    this.showErr(msg);*/

    console.log(err);

  }

  showErr(msg){
    if(typeof msg === 'object'){
      msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;
    }

    let el = document.querySelector("#form-err");

    if(el !== null){
      el.innerHTML = msg;
      setTimeout(()=>{
        el.innerHTML = 'status';
      },2000)
    }else{

      console.log(msg);
    }

  }



  axios(method,data={},onSuccess){

    switch (method) {
      case 'post':
          this.post(data,onSuccess);
      break;
      case 'put':

          const id = data.id;
          this.put(id,data,onSuccess);
      break;

    }

  }

  /* [id1,id2,id3] */
  deleteMulti(list=[]){



    if(list.length>0){

      const id = list[0].id;
      this.delete(id,(res)=>{
        if(res.name==='success'){
          let newlist = list.filter((item) => { return parseInt(item.id) !== parseInt(id) })
          this.deleteMulti(newlist);
        }
      })
    }

  }

  delete(id,onSuccess){

    this.db.type = 'DELETE';
    const url = server.base() + '/' + this.model+'/'+id ;


    //preLoad('delete');

    axios.delete(url,this.db.config)
          .then((res)=>{
            //preLoad('stop');
            //this.listenDataChange(res); // pass RES DATA to redux xử lý
            onSuccess(res.data);

          },(error)=>{
            this.onError(error)

    })

  }

  // DO AJAX AND CALLBACK RETURN DATA RESPONESE
  post(data,onSuccess){

    this.db.type = 'POST';
    this.status = data ;

    const url = server.base()+ '/' + this.model;

    //preLoad('post');
    axios.post(url,data,this.db.config)
          .then((res)=>{

            //preLoad('stop');
            //this.listenDataChange(res) // CAP NHAT REDUX STORE
            onSuccess(res.data) // callback for auto notification


          },(error)=>{

          this.onError(error);

    });

  }

  // DO AJAX AND CALLBACK RETURN DATA RESPONESE
  put(id,data,onSuccess){

    this.db.type = 'PUT';
    this.status = data ;

    const url = server.base() + '/' + this.model + '?id='+id;

    axios.put(url,data,this.db.config)
          .then((res)=>{

            //preLoad('stop');
            //this.listenDataChange(res);
            onSuccess(res.data)
          },(error)=>{

            this.onError(error)

    })

  }


  goto(p=0,onSuccess){

    const {url, config, paginate, total } = this.db ;

    let offset = 0 ;
    offset = parseInt(paginate.max) * (p);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:p
    }));

    this.fetch((res)=>{

      //this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{

      this.onError(err);

    });

  }

  pre(onSuccess){

    const {url, config, paginate,total} = this.db ;
    let next = paginate.p - 1;

    next = next < 0 ? 0 : next ;

    let offset = 0 ;
    let page = next ;
    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));

    offset = parseInt(paginate.max) * (page);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{
      //this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{

      this.onError(err);

    });

  }

  next(onSuccess){

    const {url, config, paginate, total } = this.db ;
    let next = paginate.p + 1;

    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));
    next = next < pages ? next : pages - 1 ;

    let offset = 0 ;
    let page = next ;

    offset = parseInt(paginate.max) * (page);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{
      //this.listenDataChange(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });


  }

  call(url,onSuccess){

    this.db.type = 'GET';
    const {config} = this.db ;

    axios.get(url,config)
          .then((res) => {
            //this.restResp(res); // KHÔNG LUU localStorage
            onSuccess(res)

          },
          (error) => {
              var status = error.response.status;
              this.onError(error)

            }
          );
  }



  getInfo(id,onSuccess){
    this.db.type = 'GET';
    const { config} = this.db ;

    const url = server.base() + '/'+ this.model+'/getInfo/'+id;

    axios.get(url,config)
            .then((res) => {

              const data = res.data ;
              onSuccess(data)

            },
            (error) => {
                var status = error.response.status;
                this.onError(error)

              }
            );


    onSuccess(url);

  }

  fetch(onSuccess){

      this.db.type = 'GET';
      const {url, config} = this.db ;

      axios.get(url,config)
            .then((res) => {
              //this.restResp(res); // KHÔNG LUU localStorage
              this.data = res.data ;
              onSuccess(res);

            },
            (error) => {
                var status = error.response.status;
                this.onError(error)

              }
            );
  }

  /* END WHEN*/

  set(name,value){
    this.resetConfigDB(name,value);
  }


  getData(name){
    name = name || this.model;
    return this.data[name];
  }

}

export default Api

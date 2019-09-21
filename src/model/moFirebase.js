

import store from '../redux/store';
import { database, config} from "../config/firebase";


class moFire {

  constructor(model){

    this.localData = {
      db:{
        paginate:config.paginate,
        total:0
      }
    }
    this.model = model ;
    this.state = {}
    this.data = []


    this._setup();
  }

  _setup(){

    this.db = database.ref().child(this.model);


  }

  generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }




  create(json, onSuccess){

    json.uid = this.generateUUID();

    this.db.child(json.uid).update({...json})
        .then(() => {
            onSuccess(json);
            this._onSuccess('set',json);
        })
        .catch((error) => this._onError(error) );

  }

  update(uid,json,onSuccess){
    this.db.child(uid).update({...json})
        .then(() => {
            onSuccess(json);
            this._onSuccess('change',json)
        })
        .catch((error) => this._onError(error) );
  }

  goto(p,onSuccess){

  }
  next(onSuccess){

  }
  pre(onSuccess){

  }


  deleteMulti(){

  }
  delete(uid,onSuccess){


     this.db.child(uid).remove()
     .then( ()=> {

         this._onSuccess('remove',{
           uid:uid
         });

         onSuccess('success');

      })
      .catch(function(error) {
        onSuccess(error);
      });
  }

  countAll(onSuccess){
    this.db.once("value",(snapshot)=>{
      onSuccess(snapshot.numChildren());
    })
  }

  countAllWithField(field,value,onSuccess){

    const query = this.db
                    .orderByChild(field)
                    .equalTo(value)

    query.once("value",(snapshot)=>{
      onSuccess(snapshot.numChildren());
    })
  }



  _sortOrder(key,order='asc'){
    return function(a, b) {
       if(!a.hasOwnProperty(key) ||
          !b.hasOwnProperty(key)) {
         return 0;
       }

       const varA = (typeof a[key] === 'string') ?
         a[key].toUpperCase() : a[key];
       const varB = (typeof b[key] === 'string') ?
         b[key].toUpperCase() : b[key];

       let comparison = 0;
       if (varA > varB) {
         comparison = 1;
       } else if (varA < varB) {
         comparison = -1;
       }
       return (
         (order == 'desc') ?
         (comparison * -1) : comparison
       );
    };
  }

  find(field,value,onSuccess){
    this.data = [] ;

    this.countAllWithField(field,value,(total)=>{

        this.localData.db.total = total;
        this.db.total = total; 

        const query = this.db
                        .orderByChild(field)
                        .startAt(`%${value}%`)
                        .endAt(value+"\uf8ff")
                        .limitToLast(config.paginate.max);
                        
                        

        query.once("value",(snapshot)=>{

          snapshot.forEach( (childSnapshot)=> {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            this.data.push(childData);

          });

          this.data.sort(this._sortOrder('sort'));
          //this.data = [] ;
          onSuccess(this.data);
          
          this._onSuccess('value',this.data);


        });
    });
    
  }

  fetch(field,value,onSuccess){

    this.data = [] ;

    this.countAllWithField(field,value,(total)=>{

        this.localData.db.total = total;

        this.db.total = total; // USE IT FOR AG-GRID FOOTER

        const query = this.db
                        .orderByChild(field)
                        .equalTo(value)
                        .limitToLast(config.paginate.max);

        query.once("value",(snapshot)=>{

          snapshot.forEach( (childSnapshot)=> {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            this.data.push(childData);

          });

          this.data.sort(this._sortOrder('sort'));
          //this.data = [] ;
          onSuccess(this.data);
          this._onSuccess('value',this.data);


        });



    });
  }

  read(onSuccess){

    this.data = [] ;

    this.countAll((total)=>{

        this.localData.db.total = total;
        const query = this.db
                        .orderByChild("createdAt")
                        .limitToLast(config.paginate.max);

        query.once("value",(snapshot)=>{

          snapshot.forEach( (childSnapshot)=> {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            this.data.push(childData);

          });


          this.data.sort(this._sortOrder('sort'));

          onSuccess(this.data);
          this._onSuccess('value',this.data);

        });



    });

  }

  _onSuccess(type,data){

    switch (type) {
      case 'value':

        /*store.dispatch({
          type: type +'-'+this.model,
          list:data
        });*/

      break;

      case 'set':

        this.data.unshift(data);

        this.localData.db.total = this.data.length;

        store.dispatch({
          type: type +'-'+this.model,
          list:this.data
        });

      break ;
      case 'change':

        /*UPDATE DATA*/
        let myData = this.data ;

        myData.map((item,index)=>{
          if(data.uid===item.uid){
            myData[index] = data ;
          }
        });

        store.dispatch({
          type:type+'-'+this.model,
          list:myData
        });


      break ;

      case 'remove':
         const uid = data.uid ;

         this.data.forEach((item,index)=>{
           if(item.uid===uid){
             this.data.splice(index, 1);
           }
         })

         store.dispatch({
           type:type+'-'+this.model,
           list:this.data
         });



      break ;

      default:

      break ;

    }
  }

  _onError(error){
    console.log(error);
  }




}

export default moFire;

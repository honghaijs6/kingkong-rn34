import {auth, database, provider} from "../config/firebase";


import { AVATAR_URL } from '../config/const';
import store from '../redux/store';
import {myTime} from '../hook/ultil/myTime';



export const benAuth = {

  localStorage:{

  },



  isLoged(){
    // DETECT localStorage ;

  },



  _whereStateChange(newState){

    store.dispatch(newState);
  },



  toTimestamp(strDate){
    const datum = Date.parse(strDate);
    return datum/1000;
  },

  resetPassword(data){
    return new Promise((resolve, reject) => {
        const {email} = data;
        auth.sendPasswordResetEmail(email)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
  },
  updateInfo(data,onSuccess,onError){
    const userRef = database.ref().child('users');

    userRef.child(data.uid).update({...data})
        .then(() => {
            onSuccess(data);

            this._whereStateChange({
              type:'LOGIN',
              isLoggedIn:true,
              userInfo:data
            });

        })
        .catch((error) => { onError(error); });
  },

  register(data,onSuccess,onError) {


    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((resp) => {


            data.uid = resp.user.uid;

            data.createdAt = myTime.getUnixTime();
            data.updatedAt = data.createdAt;
            data.photoURL = AVATAR_URL;
            data.point = 0 ;
            data.type = 0 ; /* 0 :  customer - staff - admin*/
            data.status = 1 ; /*  0 : 1 =? available */
            data.level = 0 ; /* new - gold - diamond */
            data.gender = 1 ;
            data.is_admin = 0 ;
            data.salary_set = 0 ;
            data.salary_balance = 0 ;
            data.address = ''; // cuurent address
            data.home_address = '';
            data.work_address = '';
            data.recent_address = '';
            data.phone = '';
            data.is_remote_working = 0 ;


            const userRef = database.ref().child('users');

            userRef.child(data.uid).update({...data})
                .then(() => {
                    onSuccess(data);

                    this._whereStateChange({
                      type:'LOGIN',
                      isLoggedIn:true,
                      userInfo:data
                    });

                })
                .catch((error) => { onError(error); });
        })
        .catch((error) => { onError(error); } );
  },

  doLogin(data,onSuccess,onError){

    const {email, password} = data;

    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => {
            //Get the user object from the realtime database
            let {user} = resp;



            database.ref('users').child(user.uid).once('value')
                .then((snapshot) => {

                    const exists = (snapshot.val() !== null);

                    //if the user exist in the DB, replace the user variable with the returned snapshot

                    if (exists) user = snapshot.val();

                    //if (exists) dispatch({type: t.LOGGED_IN, user});

                    this._whereStateChange({
                      type:'LOGIN',
                      isLoggedIn:true,
                      userInfo:snapshot.val()
                    });

                    onSuccess({exists, user});
                })
                .catch((error) => { onError(error)  });
        })
        .catch((error) => {  onError(error) }  );

  },

  doSignOut(onSuccess,onError){
    auth.signOut()
        .then(() =>  {


          this._whereStateChange({
            type:'LOGIN',
            isLoggedIn:false
          })

          onSuccess(true)
        } )
        .catch((error) => onError(error));
  },

  checkLoginStatus(callback) {



    auth.onAuthStateChanged((user) => {
        let isLoggedIn = (user !== null);


        if (isLoggedIn) {

            //Get the user object from the realtime database
            database.ref('users').child(user.uid).once('value')
                .then((snapshot) => {

                    const exists = (snapshot.val() !== null);

                    //if the user exist in the DB, replace the user variable with the returned snapshot
                    if (exists) user = snapshot.val();
                    //if (exists) dispatch({type: t.LOGGED_IN, user});

                    /*if(snapshot.val()===null){

                      this.doSignOut((data)=>{

                      },(err)=>{
                        console.log(err);
                      })
                    }*/

                    this._whereStateChange({
                      type:'LOGIN',
                      isLoggedIn:true,
                      userInfo:snapshot.val()
                    })

                    callback(exists, isLoggedIn);
                })
                .catch((error) => {
                    //unable to get user
                    //dispatch({type: t.LOGGED_OUT});
                    callback(false, false);
                });
        } else {
            //dispatch({type: t.LOGGED_OUT});
            callback(false, isLoggedIn)
        }
    });
  },

  signInWithFacebook(fbToken,) {
    return new Promise((resolve, reject) => {
        const credential = provider.credential(fbToken);
        auth.signInWithCredential(credential)
            .then((user) => {
                //Get the user object from the realtime database
                database.ref('users').child(user.uid).once('value')
                    .then((snapshot) => {

                        const exists = (snapshot.val() !== null);

                        //if the user exist in the DB, replace the user variable with the returned snapshot
                        if (exists) user = snapshot.val();

                        //if (exists) dispatch({type: t.LOGGED_IN, user});

                        resolve({exists, user});
                    })
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
  }



}

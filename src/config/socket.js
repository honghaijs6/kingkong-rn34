
window.navigator.userAgent = "react-native";
import server from './server';
import io from 'socket.io-client';


import {AsyncStorage, YellowBox } from 'react-native';


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
  pingTimeout: 30000,
 pingInterval: 30000
};
const socket = io(server.host,connectionConfig);

 

socket.on('connect',()=>{

  // authenticated again ;
  AsyncStorage.getItem('authenticateInfo').then((info2)=>{

      info2 = JSON.parse(info2);
      
      if(info2!==null){
        socket.emit('authenticate', {

            "strategy":"local",
            "email": info2.email,
            "password": info2.password

            }, (message, data)=> {
              
              if(data!==undefined){

                console.log('authenticated login ')
        
              }else{
                //alert(info2.email+'-'+info2.password)
                console.log('silent failt')
              }

         });
      }
      
  });
});  

socket.on( 'disconnect', function () {
  console.log( 'disconnected from server' );
});

/* END NOTIFICATION */

 





Object.assign(socket,{
    server:server,
});

export default socket ;

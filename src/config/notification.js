import {  Notifications,Constants } from 'expo';
//import * as Permissions from 'expo' ; 
 
import Permissions from 'expo-permissions';




const notification = {

    getExpoToken(onSuccess){
        // Remote notifications do not work in simulators, only on device
        if (!Constants.isDevice) {
            return;
        }

        Permissions.askAsync(Permissions.NOTIFICATIONS).then((res)=>{
           let { status }  = res ;

           if (status !== 'granted') {
               return;
           }

           Notifications.getExpoPushTokenAsync().then((token)=>{
             onSuccess(token)
           })

        })


        //let value = await Notifications.getExpoPushTokenAsync();


        //console.log('Our token', value);
        /// Send this to a server







    },

    getiOSNotificationPermission:async function(){
        const { status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        if (status !== 'granted') {
           await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    },

    listenForNotifications:function(){
        Notifications.addListener(notification => {

            console.log(notification);
            switch(notification.origin){
                case 'received':

                break ;
            }

        });
    },

    sendLocalNotification:function(json){
        const localnotification = {
            title: json.title,
            body: json.body,
            android: {
              sound: true,
            },
            ios: {
              sound: true,
            },
        };

        let afterOneSecond = Date.now();
        afterOneSecond += 1000;

        const schedulingOptions = { time: afterOneSecond };
        Notifications.scheduleLocalNotificationAsync(
            localnotification,
            schedulingOptions
        );
    }
}

notification.getiOSNotificationPermission();
notification.listenForNotifications();


export default notification;

import { Alert } from 'react-native' ;

const initState = {
    name:'socket',
    res:{},
    appState:'active',
    internet:true
}

export default function(state=initState,action){

    switch(action.type){


        case 'appstate-change':

            return {
                ...state,
                type:action.type,
                appState:action.appState
            }

        break ;

        case 'reset-socket':

          const data = action.res;
          switch(data.model){
            case 'orders':
              const ORD_STATUS = [
                  'your order in process of pending',
                  'Your order in the  process of delivery',
                  'Your order has been completed, thank you so much,  wish you have a good day'
              ];

              if(data.data.status > 0){
                Alert.alert(
                  'Order Processing',
                  ORD_STATUS[data.data.status]
                );
              }

            break ;
          }

          return {
           ...state,
           type:action.type,
           res:action.res
          }

       break ;

       default:

       return state;

    }
}

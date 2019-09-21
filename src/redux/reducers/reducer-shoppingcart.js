
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/


const MODE = 'orders';
const NAME = 'Shopping Cart';

const iniState = {
  mode:MODE,
  name:NAME,
  state:{},
  list:[],
}

export default function(state = iniState ,action = {}){
  switch(action.type){

    case 'reset-'+MODE:

     return {
       ...state,
       list:action.list
     }

   break ;



    default:

    return state;

  }
};

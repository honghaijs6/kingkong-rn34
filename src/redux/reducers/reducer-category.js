

const MODE = 'categories';
const NAME = 'Category';

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

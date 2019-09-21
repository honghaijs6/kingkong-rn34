
/*
MENU THƯC UỐNG
{
  id:0,
  code:"ABC",
  type:"",  	1: don hang san pham - 2: don hang dich vu
  status:1, 	[open-confirn-pickup-finish]
  creator_id,
  company_id,
  customer_id,
  list_orders,
  payment_id,
  marketing_code,
  store_id:'',
  ip_address:'',
  is_customer_order:'',
  is_mobile:1,
  date_created,
  date_modified
}
*/


const MODE = 'products';
const NAME = 'products';

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

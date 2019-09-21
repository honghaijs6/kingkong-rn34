import { combineReducers } from 'redux';
import reducerUser from './reducer-user';
import reducerShoppingCart from './reducer-shoppingcart';
import reducerCate from './reducer-category';
import reducerProduct from './reducer-product';
import reducerOrder from './reducer-order';
import reducerSocket from './reducer-socket';
import reducerStorageFavory from './reducer-favory';




const allReducers = combineReducers({

  user:reducerUser,
  shoppingcart:reducerShoppingCart,
  category:reducerCate,
  product:reducerProduct,
  order:reducerOrder,
  socketData:reducerSocket,
  favories:reducerStorageFavory

});

export default allReducers;

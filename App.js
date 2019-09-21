
import store from './src/redux/store';
import socket from './src/config/socket';
import { Provider } from 'react-redux';

import React from 'react';
import {AppState, StyleSheet, Text, View } from 'react-native';
import {  AppLoading } from 'expo';
import * as Font from 'expo-font'; 
import { Ionicons } from '@expo/vector-icons';


import { createStackNavigator, createAppContainer } from "react-navigation";



/* main pages*/
import Login from './src/pages/login';
import Register from './src/pages/register';
import Shop from './src/pages/shop';

/* sub pages */
/* FeedTab Link */
import FeedView from './src/pages/feedview';
/*MissionTab Link*/
/* storeTab Link*/
/*  OrderTabs linkin */
import DeliveryPage from './src/pages/delivery';
import MenuPage from './src/pages/menu';
import ProItemPage from './src/pages/productItem';
import CartPage from './src/pages/cart' ;
import CheckOutPage from './src/pages/checkout';
import CollectStarPage from './src/pages/collectStarPage';
import CouponPage from './src/pages/couponPage';
import Scanner from './src/pages/scanner';
import DealPage from './src/pages/dealPage';



/*AccountTab Link*/
import RewardPage from './src/pages/rewardPage';
import HistoryPage from './src/pages/historyPage';
import HistoryPageView from './src/pages/historyView';

import HelpPage from './src/pages/helpPage';
import GuidePage from './src/pages/guidePage';
import EditProfilePage from './src/pages/editProfilePage';
import ChangePassPage from './src/pages/changePassPage';


import SettingDeliveryPage from './src/pages/settingDeliveryPage';
import MapPage from './src/pages/mapPage';



const RootStack = createStackNavigator(
  {
    Login:Login,
    Register:Register,
    Home: Shop,
    FeedView:FeedView,
    

    MenuPage:MenuPage,
    ProItem:ProItemPage,
    CartPage:CartPage,
    CheckOutPage:CheckOutPage,
    DeliveryPage:DeliveryPage,
    CollectStarPage:CollectStarPage,
    CouponPage:CouponPage,
    Scanner:Scanner,
    DealPage:DealPage,

    RewardPage:RewardPage,
    HistoryPage:HistoryPage,
    HistoryPageView:HistoryPageView,
    HelpPage:HelpPage,
    GuidePage:GuidePage,
    SettingDeliveryPage:SettingDeliveryPage,
    MapPage:MapPage,
    EditProfilePage:EditProfilePage,
    ChangePassPage:ChangePassPage

  },
  {
    initialRouteName: "Home",
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

export default class App extends React.Component {

  constructor(){
    super();

    this.state = {

        isReady:false,
        onAction:'',
        socketRes:null
    }

    this._listenSocket();



  }

  _listenSocket(){

    // FEEDS
    socket.on('feeds created',(res)=>{

      store.dispatch({
        type:'reset-socket',
        res:res
      });

    });

    socket.on('feeds updated',(res)=>{

      console.log('socket init');

      store.dispatch({
        type:'reset-socket',
        res:res
      });

    });

    // ORDERS
    /*socket.on('orders created',(res)=>{
      store.dispatch({
        type:'reset-socket',
        res:res
      });
    });*/

    socket.on('orders updated',(res)=>{

      store.dispatch({
        type:'reset-socket',
        res:res
      });

    });

  }

  componentWillUnmount(){


    AppState.removeEventListener('change', this._handleAppStateChange);




  }

  async componentWillMount(){
    await this.loadFonts();

  }


  async loadFonts() {

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  async componentDidMount(){

    // APP STATE CHANGE
    AppState.addEventListener('change', this._handleAppStateChange);

  }


  _handleAppStateChange(newState){

    store.dispatch({
      type:'appstate-change',
      appState:newState
    });

  }

  render() {

    const AppContainer =  createAppContainer(RootStack) ;


    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>

        <AppContainer />

      </Provider>

    );
  }
}

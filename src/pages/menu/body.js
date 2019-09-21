/* @flow weak */
import { COFFEE_COLOR } from '../../config/const';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {  Tab, Tabs, TabHeading } from 'native-base';



import BodyDrinks from './drinks';
import BodyFoods from './foods';
import BodyFavories from './favories';


const MenuBody = (props) => (  


    <Tabs textStyle={{color:'#000'}} tabBarUnderlineStyle={{ backgroundColor: COFFEE_COLOR,height:1, }}>
        <Tab heading={
          <TabHeading style={{ backgroundColor:'#fefefe'}}>
            <Text style={{color:'#555'}}>Drinks</Text>  
        </TabHeading>
        }>
            <BodyDrinks cateInfo={props.cateInfo} loader={props.loader} onPressItem={(data)=>{ props.onPressItem(data) }} data={ props.data } />
        </Tab>
        {/*<Tab heading="Foods">
            <BodyFoods/>
        </Tab>*/}
        <Tab heading={
          <TabHeading style={{ backgroundColor:'#fefefe'}}>
              <Text style={{color:'#555'}}>Favories</Text>
          </TabHeading>
        }>
            <BodyFavories onPressItem={(data)=>{ props.onPressItem(data) }} />
        </Tab>
    </Tabs>


);

export default MenuBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* @flow weak */

import React from 'react';
import {
  View,
} from 'react-native';

const BenBody = (props) => (
  <View style={{
    alignItems:'center',
    paddingTop:10,
    paddingBottom:20
  }}>

      <View style={[{width: props.width || '95%'},props.style]}>

          { props.children }


      </View>

  </View>
);

export default BenBody;

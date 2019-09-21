/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal 
} from 'react-native';

export default class PopupModal extends Component {
  render() {
    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          >
            <View style={ styles.container} >
              <View style={[styles.body,{...this.props.style}]}>
                { this.props.children }
              </View>
            </View>

      </Modal>
    );
  }
}

PopupModal.defaultProps = {
  visible:false,
  onClose:()=>{},
  onUpgrade:()=>{}
}
const styles = StyleSheet.create({

  text:{
    fontSize: 13,

  },
  body:{
    padding: 20,
    borderRadius: 12,
    width:'90%',
    height:'55%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:'auto',
    marginBottom: 'auto',
    backgroundColor: '#fff',

  },
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

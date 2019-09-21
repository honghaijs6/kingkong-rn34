
import { MAX_REDEEM } from '../../config/const';

import styles from '../../style/styles';


import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image 
} from 'react-native';
 
import PopupModal from '../../components/PopupModal';
const iconGif = require('../../../assets/redeem_icon.png')

export default class RedeemModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  _isAvailableFree(){
      return this.props.userInfo.point >= MAX_REDEEM ? true : false;
  }
  render() {

    const _isAvailableFree = this._isAvailableFree();

    const msg = _isAvailableFree ? 'Woohoo!!  Now, You had have enough points to get 01 free' : `
        Your point  not enough to get 01 free 
    ` ; 

    return (
      <PopupModal visible={ this.props.visible }>
        <View style={{ alignItems:'center'}}>
            
            <View style={{ alignItems:'center', width:'100%'}}>
                <Image 
                    source={ iconGif }
                    style={{
                        height:170,
                        width:170
                    }}
                />
                <Text style={[styles.green,{ fontFamily:'Roboto', fontSize:14, alignSelf:'center'}]}>
                    { msg }
                </Text>
            </View>
            {/* footer bottom */}

            {
                _isAvailableFree ? 
                <View style={{ width:'100%',alignItems:'center'}}>
                    <TouchableOpacity onPress={ ()=>{ this.props.onAccept() }} style={[styles.btnOK, styles.green,s.p, {width:'100%',marginTop:20}]}>
                        <Text style={[styles.white]}> Accept </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{ this.props.onClose() }} style={[styles.btnNoThank,s.p]}>
                        <Text style={[styles.green]}>  No Thanks </Text>
                    </TouchableOpacity>
                </View>:
                <TouchableOpacity onPress={()=>{ this.props.onClose() }} style={[styles.btnNoThank,s.p]}>
                    <Text style={[styles.green, styles.textUnderline]}>  Close </Text>
                </TouchableOpacity>
            }
            
        </View>
      </PopupModal>
    );
  }
}

RedeemModal.defaultProps = {
    onAccept:()=>{},
    onClose:()=>{}
}


const s = StyleSheet.create({
    p:{
        marginVertical:10
    }
})
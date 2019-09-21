/* @flow */
import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({


  textUnderline:{ textDecorationLine: 'underline'},
  font18:{ fontSize:18},
  boxShadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  white:{ color:'#fff'},
  green:{
    color:'#3b853f'
  },
  btnOK:{
    height:40,
    backgroundColor:'#3b853f',
    borderRadius:18,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20
  },
  btnNoThank:{
    height:36,
    color:'#3b853f'
    
  },
  notiHolder:{
    position:'absolute',
    backgroundColor:'#000',
    width:15,
    height:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
    right:'24%',
    backgroundColor:'#DD4B39'
  },
});

export default styles;

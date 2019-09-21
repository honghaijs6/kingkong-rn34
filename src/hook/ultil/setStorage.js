import { STORAGE_FAVORIES } from '../../config/const';
import { AsyncStorage } from 'react-native';
import getStorage from './getStorage';


// PUSH ITEM TO ARRAY
const setStorage = async (name,json,dispatch=null) =>{
    let ret = {
        name:'success',
        message:'',
        data:{}
    };

    const res = await getStorage(name);

    let data = [];
    if(JSON.stringify(res.data) !=='{}'){
        data = res.data;
    };
    data.push(json);
    try{
       await AsyncStorage.setItem(name,JSON.stringify(data));
       // save redux 
       if(dispatch!==null){
           
           dispatch({
               type:'set-'+STORAGE_FAVORIES,
               list:data
           });
       }    
    
    }catch(err){
        Object.assign(ret,{
            name:'error',
            message:err
        }) 
    }
    
    return ret;
}

export default setStorage;


import {STORAGE_FAVORIES} from '../../config/const'
import { AsyncStorage } from 'react-native';
import getStorage from './getStorage';


const removeItemStorage = async ({uid},dispatch=null)=>{

    let ret = {
        name:'success',
        message:'',
        data:{}
    }
    const res = await getStorage(STORAGE_FAVORIES) ;
    
    if(JSON.stringify(res.data) !== '{}'){
        const data = res.data.filter((item)=>{ return item.uid !== uid });
        Object.assign(ret,data);

        await AsyncStorage.setItem(STORAGE_FAVORIES,JSON.stringify(data));  

        if(dispatch!==null){
            
            dispatch({
                type:'set-'+STORAGE_FAVORIES,
                list:data
            });
        }
 
    }

    return ret;

}

 export default removeItemStorage;
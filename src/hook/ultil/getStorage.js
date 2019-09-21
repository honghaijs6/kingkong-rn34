
import { AsyncStorage } from 'react-native';


const getStorage =  (name)=>{
    
    let ret = {
        name:'success',
        message:'',
        data:{}
    }

    return new Promise((resolve,rejects)=>{
        
        AsyncStorage.getItem(name).then((data)=>{
            if(data !== null){
                resolve(Object.assign(ret,{
                    data:JSON.parse(data)
                }))
            }else{
                resolve(Object.assign(ret,{
                    message:'null'
                }));
            }
        }).catch((err)=>{
            rejects(Object.assign(ret,{
                name:'error',
                message:err
    
            }));
        })
    })
    
}

export default getStorage
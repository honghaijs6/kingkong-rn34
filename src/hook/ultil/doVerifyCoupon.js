
import server from '../../config/server';
import axios from 'react-native-axios';



const doVerifyCoupon = (code=null)=>{
    let ret = {
        name:'error',
        message:'',
        data:{}
    }

    return new Promise((resolve,reject)=>{
        
        if(code!==null){
            const url = server.base()+'/coupons/isAvailable/'+code;
            
            axios.get(url)  
                .then((res) => {
                    
                    Object.assign(ret,res.data);
                    resolve(ret);
                },
                (error) => {

                    console.log(error);

                }
            );

        }else{
            Object.assign(ret,{message:'Missing code parameter'});
            resolve(ret);
        }
        

    })
}

export default doVerifyCoupon;
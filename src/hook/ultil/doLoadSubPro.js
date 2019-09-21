
import server from '../../config/server';
import axios from 'react-native-axios';



export default doLoadSubProByCate = (cateId=null)=>{

    return new Promise((resolve, reject)=>{

        const url = server.base()+'/products?type=1&categories='+cateId
        
        axios.get(url)
            .then((res) => {
              const data = res.data ;
              resolve(data);
              
            },
            (error) => {
                reject(error);
              
              }
            );



    })
}
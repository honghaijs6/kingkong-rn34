
import server from '../../config/server';
import axios from 'react-native-axios';



export default doLoadSubProByGroup = (strGroup=null)=>{

    return new Promise((resolve, reject)=>{

        const url = server.base()+'/products/listAll/in?in='+strGroup
        
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
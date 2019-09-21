// RETURN TRUE - FALSE

import getStorage from './getStorage';
const MODE = 'STORAGE_FAVORIES';

const isSaveProduct = async ({uid})=>{
    let ret = false ;
    const res = await getStorage(MODE)

    if(JSON.stringify(res.data) !=='{}'){
        res.data.map((item)=>{
            if(item.uid === uid){
                ret = true ;
            }
        })
    }

    return ret;
}

export default isSaveProduct;
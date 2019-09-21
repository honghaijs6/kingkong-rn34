
/* detech form
  RETURN STRING MSG
*/

export default function(fields=[],data={}){

  let ret = '' ;

  if(fields.length>0){

    fields = fields.reverse();


    Object.keys(data).map((item)=>{
      fields.map((item2)=>{
        if(data[item2] === '' ||  data[item2] === 0){
          ret = 'vui lòng kiểm tra thông tin ' ;

        }

      });
    });
  }

  return ret ;
}

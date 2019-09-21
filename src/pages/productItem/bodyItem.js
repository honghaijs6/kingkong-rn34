

import { GREY_COLOR, COFFEE_COLOR, RED_COLOR } from '../../config/const' ;

// HOOKS
import doLoadSubProByCate from '../../hook/ultil/doLoadSubPro';
import doLoadSubProByGroup from '../../hook/ultil/doLoadSubProByGroup';


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity

} from 'react-native';
import { Icon } from 'native-base';

//import console = require('console');


const SelectList = (props)=>{
    
    return(
        props.data.map((item)=>{

            const nameMarked = item.isSelect ? 'checkmark-circle' : 'checkmark-circle-outline';
            const colorMarked = item.isSelect ? { color:COFFEE_COLOR } : { color :'#333'};

            return(
                <TouchableOpacity key={ item.id } onPress={()=>{ props.onSelected(item) }} style={s.btnSelect}>

                    
                    <View style={s.rowItem}>
                        <View style={{ flexDirection:'row', alignItems:'center'}}>
                            <Icon style={[s.icon, colorMarked]} name={ nameMarked } />
                            <Text style={[s.txt, colorMarked]}> { item.name } </Text>
                        </View>

                        {
                            item.price_m !== undefined ? 
                            <View style={{ textAlign:'right'}}>
                                <Text style={[s.txt,{ fontSize:16, color:'red', textAlign:'right'}]}> { item.price_l} $</Text>
                            </View>:null

                        }
                        
                
                    </View>
                    
                </TouchableOpacity>
            )
        })
    )
}

const MultiSelect = (props)=>{

    return(
        props.data.map((item)=>{
            
            const nameMarked = item.isSelect ? 'checkmark-circle' : 'checkmark-circle-outline';
            const colorMarked = item.isSelect ? { color:COFFEE_COLOR } : { color :'#333'};

            const price = parseFloat(item.price_l) > 0 ?   item.price_l+'$' : '';
            return(
                <TouchableOpacity key={ item.id } onPress={()=>{ props.onSelected(item) }} style={s.btnSelect}>

                    
                    <View style={s.rowItem}>
                        <View style={{ flexDirection:'row', alignItems:'center'}}>
                            <Icon style={[s.icon, colorMarked]} name={ nameMarked } />
                            <Text style={[s.txt, colorMarked]}> { item.name } </Text>
                        </View>
                        <View style={{ textAlign:'right'}}>
                            <Text style={[s.txt,{ fontSize:16, color:'red', textAlign:'right'}]}> { price } </Text>
                        </View>

                
                    </View>
                    
                </TouchableOpacity>
            )
        })
    );


}

export default class bodyItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        types:[
            { id:'cold', name:'Cold', isSelect:true },
            { id:'hot', name:'Hot', isSelect:false },
        ],

        sugars:[
            {  id:'0', name:'No sugar', isSelect:true },
            {  id:'-30', name:'Off 30% of sugar',isSelect:false },
            {  id:'-50', name:'Off 50% of sugar',isSelect:false },
            {  id:'-70', name:'Off 70% of sugar',isSelect:false },
            {  id:'30', name:'Add more 70% of sugar',isSelect:false }
        ],

        ices:[
            {  id:'0', name:'No Ice', isSelect:true },
            {  id:'-30', name:'Off 30% of ice', isSelect:false },
            {  id:'-50', name:'Off 50% of ice', isSelect:false },
            {  id:'-70', name:'Off 70% of ice', isSelect:false }

        ],

        products:[], // SAN PHAM KEM THEO,
        formatProduct:{} // after fortmat and group by group_name
    };
  }


  _onToggleMultiSelect(json){

    const arr = this.state.products ;

    if(json.IS_MULTI==1){
        arr.map((item)=>{
            if(item.id == json.id){
                item.isSelect = !item.isSelect;
            }
        });
    }else{

        arr.map((item)=>{   

            if(item.group_name===json.group_name){

                item.isSelect = false ;
                if(item.id == json.id){
                    item.isSelect = !item.isSelect;
                }
                
                
            }else{
                if(item.id == json.id){
                    item.isSelect = !item.isSelect;
                }
            }

            
        });
    
    }
    
    this.setState({ products:arr});

    this._whereStateChange();



  }


  _onToggleSelect(field,json){
    
        let arr = this.state[field];
        arr.map((item)=>{
            item.isSelect = false;
            if(item.id === json.id ){
                item.isSelect = !item.isSelect
            }
        });

        this.setState({
            [field]:arr
        });

        
        this._whereStateChange();




  }


  _formatProductByGroup(products){

    let result = products.reduce(function (r, a) {
        r[a.group_name] = r[a.group_name] || [];
        r[a.group_name].push(a);
        return r;
    }, Object.create(null));

    
    this.setState({
        formatProduct:result
    });
    


  }
  async componentWillReceiveProps(newProps){
  
    if(this.state.products.length === 0){

        const { cateInfo } = newProps;
        const categoriesId = newProps.info.categories; 
        
        const res =  await doLoadSubProByGroup(cateInfo.groups); //await doLoadSubProByCate(categoriesId);
        this._formatProductByGroup(res.rows) ; 

        
        if(res.rows !== undefined){
            this.setState({
                products:res.rows
            });
        }
        
        

        // GET PRODUCT INFO AND DEFAUT BONUS 
        setTimeout(()=>{
            

            if(newProps.info.bonus !== undefined){

                //console.log(newProps.info.bonus);


                const { bonus } = newProps.info;
                let { types, sugars, ices, products } = this.state ;
                
                
                types.map((item)=>{
                    item.isSelect = false
                    if(item.id == bonus.type){
                        item.isSelect = true ;
                    }
                });

                sugars.map((item)=>{
                    item.isSelect = false;
                    if(item.id == bonus.sugar){
                        item.isSelect = true
                    }
                });

                ices.map((item)=>{
                    item.isSelect = false;
                    if(item.id == bonus.ice){
                        item.isSelect = true
                    }
                });

                products.map((item)=>{
                    if(bonus.subpro){
                        if(bonus.subpro.length >0 ){
                            bonus.subpro.map((item2)=>{
                                if(item2.id == item.id){
                                    item.isSelect = true
                                }
                            })
                        }
                    }
                });



                this.setState({
                    types:types,
                    sugars:sugars,
                    ices:ices,
                    products:products
                });
                
            }
            

        },100)



    }
    
  }

  _whereStateChange(){

    this.props.onOptionChange({
        type: this.state.types.filter((item)=> item.isSelect === true )[0],
        sugar:this.state.sugars.filter((item)=> item.isSelect === true )[0],
        ice:this.state.ices.filter((item)=> item.isSelect === true )[0],
        subpro: this.state.products.filter((item)=> item.isSelect === true )
    });

  }
  render() {
    
    const info = this.props.info;
    

    if(JSON.stringify(info)!=='{}'){

        //const stylePrice_s = info['price_s'].toString() === info['price'].toString() ? {color:COFFEE_COLOR} : { color:'#333' };
        const stylePrice_m = info['price_m'].toString() === info['price'].toString() ? {color:COFFEE_COLOR} : { color:'#333' };
        const photo = this.props.info.photo.replace(/ /g,'%20');
        
        const formatProduct = this.state.formatProduct; 
        
        return(
    
          <View>
              <View style={{
                backgroundColor: '#fff',
                borderBottomWidth: 0.5,
                borderBottomColor: 'rgba(0,0,0,0.2)'
              }}>
    
                 <Image resizeMode="contain" style={{height: 320,width: null}} source={{uri: photo+`&w=320&h=320&buster=${Math.random()}` }} />
    
                 <View style={{
                   backgroundColor: '#fff',
                   padding: 10,
                 }}>
    
                   <Text style={s.h4}> { this.props.info.name } </Text>
                   <Text style={s.txt}> { this.props.info.note || '...' } </Text>
    
                 </View>
              </View>
    
              {/* OPTION NHIET DO 
              <View style={[s.p]}>
                <Text style={[s.optionTitle]}> Type  </Text>
                <SelectList onSelected={(item)=>{ this._onToggleSelect('types',item) }} data={ this.state.types } />
              </View>*/}
              
              {/* OPTION SIZE */}
              <View>
                <Text style={{paddingHorizontal: 10, marginTop: 15,marginBottom:5, fontSize: 18, fontFamily: 'Roboto'}}> Select Size  </Text>
                 
                <TouchableOpacity onPress={()=>{ this.props.onSelectPrice({price:this.props.info.price_m,option:'size M'}) }} style={s.btnSelect}>
                    <View style={s.rowItem}>
                       <View style={{ flexDirection:'row', alignItems:'center'}}>
                         <Icon style={[s.icon,stylePrice_m]} name="checkmark-circle" />
                         <Text style={[s.txt,stylePrice_m]}> Size L </Text>
                       </View>
    
                       <View style={{ textAlign:'right'}}>
                        <Text style={[s.txt,{ fontSize:16, color:'red', textAlign:'right'}]}> { this.props.info.price_m} $</Text>
                       </View>
                    </View>
                </TouchableOpacity>
              </View>
              
             {
                 JSON.stringify(formatProduct) !== '{}' && Object.keys(formatProduct).map((item,index)=>{
                    const data = formatProduct[item]; 
                    return(
                       <View key={index} style={[s.p]}>
                           <Text style={[s.optionTitle]}> { item }  </Text>
                           <MultiSelect onSelected={(item)=>{ this._onToggleMultiSelect(item) }} data={ data } />
                       </View>    
                    )
                 })
                
             }

              {/* OPTION LUONG DUONG */}
              
              
              
              {/* OPTION LUONG DA 
              <View style={[s.p]}>
                <Text style={[s.optionTitle]}> Amount of Ice  </Text>
                <SelectList onSelected={(item)=>{ this._onToggleSelect('ices',item) }} data={ this.state.ices } />
              </View>*/}
              
              {/* OPTION SAN PHAM KEM THEO 
              <View style={[s.p,{ paddingBottom:50}]}>
                <Text style={[s.optionTitle]}> Add more  </Text>
                <MultiSelect 
                    onSelected={(item)=>{ this._onToggleMultiSelect(item) }} 
                    data={ this.state.products } 
                />
              </View>*/}
              
    
    
          </View>
        )
      }
    
      return(
          <View>
          </View>
      )
  }
}



const s = StyleSheet.create({

    p:{
      marginVertical:10
    },
    optionTitle:{
      paddingHorizontal: 10, marginTop: 15,marginBottom:5, fontSize: 18, fontFamily: 'Roboto'
    },
  
    icon:{fontSize:18, marginRight:5},
    btnSelect:{
      backgroundColor: '#fff',
      padding: 15,
      borderTopWidth: 0.5,
      borderTopColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(0,0,0,0.2)',
    },
    rowItem:{
  
       flexDirection:'row',
       justifyContent:'space-between'
    },
    txt:{
      fontFamily: 'Roboto',
      fontSize:15
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: COFFEE_COLOR
    },
  });

  
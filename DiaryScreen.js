import React, { Fragment } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput, Button, ScrollView,AsyncStorage,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DiaryScreen extends React.Component {
  constructor()
  {
    super();
    this.state={
      addDiaryItemSarapan:false,
      addDiaryItemMakanSiang:false,
      addDiaryItemMakanMalam:false,
      data:[],
      textInputKey:'',
      textInputVal:'',
      totalNutrition:0,
      sarapanNutrition:0,
      makansiangNutrition:0,
      makanmalamNutrition:0,
      goal:2230,
      todayDate:new Date(),
      processedDate:new Date(),
      processedDateString:'',
      firstTime:true
    }
  }
  componentDidMount(){
    this.stringDateFunc();
    this.fetchData();
    this.nutritionCount("sarapan");
    this.nutritionCount("makansiang");
    this.nutritionCount("makanmalam");
    this.nutritionCount("total");
  }
  stringDateFunc=async()=>{
    let d=this.state.processedDate
    let processedDateStringVariable=d.getFullYear() + "/"+(d.getMonth()+1)+"/"+d.getDate()
    await this.setState({processedDateString:processedDateStringVariable})
  }
  fetchData= async ()=>{
   let userdata= await AsyncStorage.getItem('user');
   let parsed=await JSON.parse(userdata);
   if (this.state.firstTime){
     let data={
       'Bob':{
         [this.state.processedDateString]:{
           'sarapan':'',
           'makansiang':'',
           'makanmalam':''
         }
       }
     };
     AsyncStorage.setItem('user',JSON.stringify(data));
     this.setState({firstTime:false})
   }
   const newArr = Object.values(parsed);
   await this.setState({data:newArr});
  }
  nutritionCount=async (target)=>{
	  //untuk menghitung nutrisi
    let data = await AsyncStorage.getItem('user');
    let dataJSON= JSON.parse(data);
    let processedData=dataJSON.Bob[this.state.processedDateString];
    let nutrisi=0;
    if (processedData==null){
      return;
    }
    if (target=="sarapan"){
      for (var i in processedData.sarapan){
        nutrisi=nutrisi+processedData.sarapan[i];
      }
      await this.setState({sarapanNutrition:nutrisi});
    }
    else if(target=="makansiang"){
      for (var i in processedData.makansiang){
        nutrisi=nutrisi+processedData.makansiang[i];
      }
      await this.setState({makansiangNutrition:nutrisi});
    }
    else if(target=="makanmalam"){
      for (var i in processedData.makanmalam){
        nutrisi=nutrisi+processedData.makanmalam[i];
      }
      await this.setState({makanmalamNutrition:nutrisi});
    }
    else if(target=="total"){
      for (var i in processedData.sarapan){
        nutrisi=nutrisi+processedData.sarapan[i];
      }
      for (var i in processedData.makansiang){
        nutrisi=nutrisi+processedData.makansiang[i];
      }
      for (var i in processedData.makanmalam){
        nutrisi=nutrisi+processedData.makanmalam[i];
      }
      await this.setState({totalNutrition:nutrisi});
    }
  }

  mergeData= (target,key,val)=>{
    let newdata={
      'Bob':{
        [this.state.processedDateString]:{
          [target]:{
            [key]:val
          }
        }
      }
    }
    try{
      AsyncStorage.mergeItem('user',JSON.stringify(newdata));
      this.fetchData();
      AsyncStorage.getItem('user', (err, result) => {
        console.log(result);
      });
    }
    catch(e){
      alert(e)
    }
  }

  updateNewDateOnData=async(newDate)=>{
    await this.setState({processedDate:newDate});
    await this.stringDateFunc();
    console.log(this.state.processedDate)
    console.log("============================")
    let oldData=await AsyncStorage.getItem('user', (err, result) => {
      console.log(result);
    });
    let oldDataJSON=JSON.parse(oldData);
    if (oldDataJSON.Bob[this.state.processedDateString]==null){
      console.log(this.state.processedDateString)
      oldDataJSON.Bob[this.state.processedDateString]=null;
      console.log(oldDataJSON.Bob);
      try{
        await AsyncStorage.setItem('user',JSON.stringify(oldDataJSON));
        console.log("SUCC");
        this.fetchData();
      }
      catch(e){
        console.log(e);
      }
    }
    await AsyncStorage.getItem('user', (err, result) => {
      console.log(result);
    });
    
  }
  showData=async()=>{
    let data = await AsyncStorage.getItem('user');
    let re=JSON.parse(data);
    let msg='';
    for (var el in re) {
      for (var el2 in re[el]) {
          for (var el3 in re[el][el2]) {
              msg=msg+('\n');
              msg=msg+(el3);
                 for (var el4 in re[el][el2][el3]) {
                  msg=msg+('\n');
                  msg=msg+(el4 + ' : '+ re[el][el2][el3][el4]);
                 }
             }
         }
     }
     alert(msg);
  }
  changeDate= (when)=>{
    var d = this.state.processedDate;
    let newDate=new Date(d);
    newDate.setDate(d.getDate() + when);
    console.log(newDate);
    this.setState({processedDate:newDate});
    this.updateNewDateOnData(newDate);
  }

    render() {
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>E - Gizi</Text>
            </View>

            <ScrollView style={styles.body}>
                <View style={styles.dateBox}>
                    <TouchableOpacity
                    onPress={()=>this.changeDate(-1)}
                    >
                        <Icon style={{color:'black', paddingTop: 5}} name='chevron-left' size={48}/>
                    </TouchableOpacity>

                    <Text style={{fontSize: 24, alignSelf:'center'}}>{this.state.processedDateString}</Text>

                    <TouchableOpacity
                    onPress={()=>this.changeDate(1)}
                    >
                        <Icon style={{color:'black', paddingTop: 5}} name='chevron-right' size={48}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.goalBox}>
                    <Text style={{fontSize: 24, paddingLeft: 30, paddingTop: 5}}>Nutrition Remaining</Text>
                    
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly', paddingTop: 5}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>{this.state.goal}</Text>
                            <Text style={{fontSize: 18}}>Goal</Text>
                        </View>
                        <Text style={{fontSize:24}}>-</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>{this.state.totalNutrition}</Text>
                            <Text style={{fontSize: 18}}>Food</Text>
                        </View>
                        <Text style={{fontSize:24}}>=</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24, color:'#23A036'}}>{this.state.goal-this.state.totalNutrition}</Text>
                            <Text style={{fontSize: 18}}>Remaining</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 200 }}>Sarapan</Text>
                    <Text style={{fontSize: 22, paddingTop: 10}}>{this.state.sarapanNutrition}</Text>        
                </View>
                <View>
                  <View style={{flexDirection: 'row'}}>
                </View>
                </View>
                <TouchableOpacity 
                style={styles.button}
                onPress={()=>this.setState({addDiaryItemSarapan:true})}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 175}}>Makan Siang</Text>
                    <Text style={{fontSize: 22, paddingTop: 10}}>{this.state.makansiangNutrition}</Text>        
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=>this.setState({addDiaryItemMakanSiang:true})}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 170 }}>Makan Malam</Text>
                    <Text style={{fontSize: 22, paddingTop: 10,}}>{this.state.makanmalamNutrition}</Text>        
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=>this.setState({addDiaryItemMakanMalam:true})}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>


            </ScrollView>

            <Modal
            transparent={true}
            visible={this.state.addDiaryItemSarapan}>
              <View style={{backgroundColor:"#000000aa",flex:1}}>
              <View style={{backgroundColor:"white", margin:50,padding:40,borderRadius:10,flex:1}}>
              <Text>Add Food</Text>
              <TextInput
              placeholder="Enter Food"
              onChangeText={(textInputKey)=>this.setState({textInputKey})}
              value={this.state.textInputKey}
              />
              <TextInput
              placeholder="Enter Nutrition Value"
              onChangeText={(textInputVal)=>this.setState({textInputVal})}
              value={this.state.textInputVal}
              />
              <Button
              title="add"
              style={styles.button}
              onPress={()=>{
                let key=this.state.textInputKey;
                let val=parseInt(this.state.textInputVal);
                let target='sarapan';
                this.mergeData(target,key,val);
                this.setState({textInputKey:''});
                this.setState({textInputVal:''});
                this.nutritionCount("sarapan");
                this.nutritionCount("makansiang");
                this.nutritionCount("makanmalam");
                this.nutritionCount("total");
              }}
              />
              
              <Button
              title="Back"
              style={styles.button}
              onPress={()=>this.setState({addDiaryItemSarapan:false})}/>
              </View></View>

            </Modal>

            <Modal
            transparent={true}
            visible={this.state.addDiaryItemMakanSiang}>
              <View style={{backgroundColor:"#000000aa",flex:1}}>
              <View style={{backgroundColor:"white", margin:50,padding:40,borderRadius:10,flex:1}}>
              <Text>Add Food</Text>
              <TextInput
              placeholder="Enter Food"
              onChangeText={(textInputKey)=>this.setState({textInputKey})}
              value={this.state.textInputKey}
              />
              <TextInput
              placeholder="Enter Nutrition Value"
              onChangeText={(textInputVal)=>this.setState({textInputVal})}
              value={this.state.textInputVal}
              />
              <Button
              title="add"
              style={styles.button}
              onPress={()=>{
                let key=this.state.textInputKey;
                let val=parseInt(this.state.textInputVal);
                let target='makansiang'
                this.mergeData(target,key,val);
                this.setState({textInputKey:''});
                this.setState({textInputVal:''});
                this.nutritionCount("sarapan");
                this.nutritionCount("makansiang");
                this.nutritionCount("makanmalam");
                this.nutritionCount("total");
              }}
              />
              
              <Button
              style={styles.button}
              title="Back"
              onPress={()=>this.setState({addDiaryItemMakanSiang:false})}/>
              </View></View>

            </Modal>

            <Modal
            transparent={true}
            visible={this.state.addDiaryItemMakanMalam}>
              <View style={{backgroundColor:"#000000aa",flex:1}}>
              <View style={{backgroundColor:"white", margin:50,padding:40,borderRadius:10,flex:1}}>
              <Text>Add Food</Text>
              <TextInput
              placeholder="Enter Food"
              onChangeText={(textInputKey)=>this.setState({textInputKey})}
              value={this.state.textInputKey}
              />
              <TextInput
              placeholder="Enter Nutrition Value"
              onChangeText={(textInputVal)=>this.setState({textInputVal})}
              value={this.state.textInputVal}
              />
              <Button
              title="add"
              style={styles.button}
              onPress={()=>{
                let key=this.state.textInputKey;
                let val=parseInt(this.state.textInputVal);
                let target='makanmalam';
                this.mergeData(target,key,val);
                this.setState({textInputKey:''});
                this.setState({textInputVal:''});
                this.nutritionCount("sarapan");
                this.nutritionCount("makansiang");
                this.nutritionCount("makanmalam");
                this.nutritionCount("total");
              }}
              />
              
              <Button
              style={styles.button}
              title="Back"
              onPress={()=>this.setState({addDiaryItemMakanMalam:false})}/>
              </View></View>

            </Modal>
            <Button style={styles.button}
            onPress={this.showData}
            title="Click Here for more data"
            />

          <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navigationBarIcon}
                onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon style={{color:'black'}} name='home' size={34} />
                    <Text style={{fontSize:18}}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon}
                onPress={() => this.props.navigation.navigate('Diary')}>
                    <Icon style={{color:'black'}} name='book' size={34} />
                    <Text style={{fontSize:18}}>Diary</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon}
                onPress={() => this.props.navigation.navigate('Profile')}>
                    <Icon style={{color:'black'}} name='account' size={34} />
                    <Text style={{fontSize:18}}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    header: {
        width: 414,
        height: 65,
        backgroundColor: '#FC6E20',
        borderColor: '#E5E5E5',
        borderBottomWidth: 5,
    },
    headerText: {
        fontSize: 48,
        color: '#FFFFFF',
        textAlign:'center',
        fontWeight: 'bold'
    },
    body: {
        flex:1
    },
    dateBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        height: 65,
        borderColor: '#E5E5E5',
        borderBottomWidth: 3        
    },
    goalBox: {
        height: 112,
        borderColor: '#E5E5E5',
        borderBottomWidth: 3,
        flexDirection:'column'
    },
    contentBox: {
        flexDirection: 'row',
        justifyContent:'space-around',
        height: 65,
        borderColor: '#E5E5E5',
        borderBottomWidth: 3,
        borderTopWidth: 3,
    },
    button: {
        alignContent: 'center',
        height: 30,
        width: 225,
        marginLeft: 20,
        paddingLeft: 25,
        backgroundColor: '#FC6E20',
        flexDirection: 'row',
        borderRadius: 30
    },
    navigationBar: {
        height: 80,
        borderTopWidth: 2,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    navigationBarIcon: {
        flexDirection: 'column',
        paddingTop: 10   
    },
    item: {
      width:100,
      height:28,
      left:50,
      fontFamily:"Roboto",
      fontStyle:"normal",
      fontSize:20,
      margin:3
    },
    itemdesc:{
      width:100,
      height:28,
      left:55,
      fontFamily:"Roboto",
      fontStyle:"normal",
      fontSize:15,
      margin:1
    },
    itemNutrition: {
      width:100,
      height:28,
      left:250,
      fontFamily:"Roboto",
      fontStyle:"normal",
      fontSize:20,
      margin:3
    },

})
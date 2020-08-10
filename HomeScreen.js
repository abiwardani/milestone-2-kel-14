import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function bmr (weight, height, age, gender) {
  var bmr_val = 0
  if (gender == "pria") {
      bmr_val = 66 + 13.7*weight + 5*height - 6.8*age
  } else {
    bmr_val = 655 + 9.6*weight + 1.8*height - 4.7*age
  }
  return ~~bmr_val
}

export default class HomeScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
            name: "Bob",
            beratBadan: 68,
            tinggiBadan: 182,
            streak: 3,
            usia: 12,
            intake: 0,
            gender: "pria"
        };
    }
    render() {
      var dailyNeed = bmr(this.state.beratBadan, this.state.tinggiBadan, this.state.usia, this.state.gender);
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>E - Gizi</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.contentBox}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:48}}>Halo, {this.state.name}!</Text>
                        <Image source={{uri:'https://randomuser.me/api/portraits/women/17.jpg'}} style={{width:64, height:64, borderRadius: 50, marginLeft: 50}} />
                    </View>
                    <Text style={{fontSize:24, paddingTop:15}}>Nutrition Remaining</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly', paddingTop: 10}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>{dailyNeed}</Text>
                            <Text style={{fontSize: 18}}>Goal</Text>
                        </View>
                        <Text style={{fontSize:24}}>-</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>{this.state.intake}</Text>
                            <Text style={{fontSize: 18}}>Food</Text>
                        </View>
                        <Text style={{fontSize:24}}>=</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24, color:'#23A036'}}>{dailyNeed-this.state.intake}</Text>
                            <Text style={{fontSize: 18}}>Remaining</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navigationBarIcon} onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon style={{color:'black'}} name='home' size={34} />
                    <Text style={{fontSize:18}}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon} onPress={() => this.props.navigation.navigate('Diary')}>
                    <Icon style={{color:'black'}} name='book' size={34} />
                    <Text style={{fontSize:18}}>Diary</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon} onPress={() => this.props.navigation.navigate('Profile')}>
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
        fontWeight:'bold',
        lineHeight: 50
    },
    body: {
        flex:1,
    },
    contentBox: {
        width: 414,
        height: 235,
        borderColor: '#E5E5E5',
        borderBottomWidth: 5,
        borderRadius: 30,
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 30
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
    }

})
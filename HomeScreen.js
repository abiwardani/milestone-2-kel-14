import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>E - Gizi</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.contentBox}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:48}}>Halo, Bob!</Text>
                        <Image source={{uri:'https://randomuser.me/api/portraits/women/17.jpg'}} style={{width:64, height:64, borderRadius: 50, marginLeft: 50}} />
                    </View>
                    <Text style={{fontSize:24, paddingTop:15}}>Nutrition Remaining</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly', paddingTop: 10}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>2230</Text>
                            <Text style={{fontSize: 18}}>Goal</Text>
                        </View>
                        <Text style={{fontSize:24}}>-</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24}}>0</Text>
                            <Text style={{fontSize: 18}}>Food</Text>
                        </View>
                        <Text style={{fontSize:24}}>=</Text>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{fontSize: 24, color:'#23A036'}}>2230</Text>
                            <Text style={{fontSize: 18}}>Remaining</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navigationBarIcon}>
                    <Icon style={{color:'black'}} name='home' size={34} />
                    <Text style={{fontSize:18}}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon}>
                    <Icon style={{color:'black'}} name='book' size={34} />
                    <Text style={{fontSize:18}}>Diary</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navigationBarIcon}>
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
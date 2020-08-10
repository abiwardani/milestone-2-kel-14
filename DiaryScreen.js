import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DiaryScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>E - Gizi</Text>
            </View>

            <ScrollView style={styles.body}>
                <View style={styles.dateBox}>
                    <TouchableOpacity>
                        <Icon style={{color:'black', paddingTop: 5}} name='chevron-left' size={48}/>
                    </TouchableOpacity>

                    <Text style={{fontSize: 24, alignSelf:'center'}}>Senin, 3 Agustus</Text>

                    <TouchableOpacity>
                        <Icon style={{color:'black', paddingTop: 5}} name='chevron-right' size={48}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.goalBox}>
                    <Text style={{fontSize: 24, paddingLeft: 30, paddingTop: 5}}>Nutrition Remaining</Text>
                    
                    <View style={{flexDirection:'row', justifyContent: 'space-evenly', paddingTop: 5}}>
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

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 200 }}>Sarapan</Text>
                    <Text style={{fontSize: 22, paddingTop: 10}}>0</Text>        
                </View>
                <TouchableOpacity style={styles.button}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 175}}>Makan Siang</Text>
                    <Text style={{fontSize: 22, paddingTop: 10}}>0</Text>        
                </View>
                <TouchableOpacity style={styles.button}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>

                <View style={styles.contentBox}>
                    <Text style={{fontSize:22, paddingTop: 10, paddingRight: 170 }}>Makan Malam</Text>
                    <Text style={{fontSize: 22, paddingTop: 10,}}>0</Text>        
                </View>
                <TouchableOpacity style={styles.button}>
                    <Icon style={{color:'white'}} name='plus' size={24} />
                    <Text style={{fontSize: 18, color:'white'}}>Tambah Makanan</Text>
                </TouchableOpacity>


            </ScrollView>

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
    }

})
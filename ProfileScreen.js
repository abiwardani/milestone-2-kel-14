import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Bob",
      beratBadan: 0,
      tinggiBadan: -13.2,
      streak: 3,
      usia: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>E - Gizi</Text>
        </View>

        <View style={styles.body}>
          <Text style={{ fontSize: 36, paddingLeft: 30 }}>Profile</Text>

          <View style={styles.contentTop}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/17.jpg",
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                marginTop: 30,
                marginLeft: 19,
              }}
            />
            <View styles={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 36, paddingTop: 27, paddingLeft: 20 }}>
                {this.state.name}
              </Text>
              <Text style={{ fontSize: 24, paddingLeft: 20 }}>
                Streak: {this.state.streak} days
              </Text>
            </View>
            <TouchableOpacity>
              <Icon
                style={{ color: "black", marginLeft: 85, marginTop: 10 }}
                name="settings"
                size={36}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentBot}>
            <View style={{ flexDirection: "row" }}>
              <View styles={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    marginTop: 10,
                    marginLeft: 30,
                  }}
                >
                  Data Diri
                </Text>
                <Text style={{ fontSize: 24, marginTop: 3, marginLeft: 45 }}>
                  Berat Badan
                </Text>
                <TextInput
                  onChangeText={(beratBadan) => this.setState({ beratBadan })}
                  style={{ fontSize: 18, marginTop: 3, marginLeft: 65 }}
                />
                <Text style={{ fontSize: 24, marginTop: 3, marginLeft: 45 }}>
                  Tinggi Badan
                </Text>
                <TextInput
                  onChangeText={(tinggiBadan) => this.setState({ tinggiBadan })}
                  style={{ fontSize: 18, marginTop: 3, marginLeft: 65 }}
                />
                <Text style={{ fontSize: 24, marginTop: 3, marginLeft: 45 }}>
                  Usia
                </Text>
                <TextInput
                  onChangeText={(usia) => this.setState({ usia })}
                  style={{ fontSize: 18, marginTop: 3, marginLeft: 65 }}
                />

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    marginTop: 10,
                    marginLeft: 30,
                  }}
                >
                  Goals
                </Text>
                <Text style={{ fontSize: 24, marginTop: 3, marginLeft: 45 }}>
                  Nutrisi Harian
                </Text>
                <Text style={{ fontSize: 18, marginTop: 3, marginLeft: 65 }}>
                  {Math.round(
                    66 +
                      13.7 * this.state.beratBadan +
                      5 * this.state.tinggiBadan -
                      6.8 * this.state.usia
                  )}
                </Text>
              </View>

              <TouchableOpacity>
                <Icon
                  style={{ color: "black", marginTop: 10, marginLeft: 145 }}
                  name="account-edit"
                  size={36}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.navigationBarIcon}>
            <Icon style={{ color: "black" }} name="home" size={34} />
            <Text style={{ fontSize: 18 }}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBarIcon}>
            <Icon style={{ color: "black" }} name="book" size={34} />
            <Text style={{ fontSize: 18 }}>Diary</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBarIcon}>
            <Icon style={{ color: "black" }} name="account" size={34} />
            <Text style={{ fontSize: 18 }}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: 414,
    height: 65,
    backgroundColor: "#FC6E20",
    borderColor: "#E5E5E5",
    borderBottomWidth: 5,
  },
  headerText: {
    fontSize: 48,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    paddingTop: 20,
  },
  contentTop: {
    width: 414,
    height: 150,
    borderColor: "#E5E5E5",
    borderWidth: 5,
    borderRadius: 30,
    flexDirection: "row",
  },
  contentBot: {
    width: 395,
    height: 310,
    borderColor: "#E5E5E5",
    borderWidth: 5,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 30,
  },
  navigationBar: {
    height: 80,
    borderTopWidth: 2,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navigationBarIcon: {
    flexDirection: "column",
    paddingTop: 10,
  },
});

import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LoginService } from "./services/LoginService";
import Styles from "./Styles";
class LoginScreen extends Component {
  state = {
    username: "map@g.c",
    password: "123",
    redirectToHome: false
  };
  handleLogin = () => {
    LoginService(this.state)
      .then(async result => {
        result === true
          ? this.props.navigation.navigate("DefaultHome")
          : alert("Login Error");
      })
      .catch(errorMessage => {
        alert(errorMessage);
      });
  };
  componentDidMount() {
    this.handleLogin();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1.5 }}></View>
        <View style={styles.form}>
          <TextInput
            label="Username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            mode="contained"
            onPress={this.handleLogin}
            style={{ marginTop: 20, ...Styles.BackgroundColor }}
          >
            Login
          </Button>
        </View>
        <View style={{ flex: 1.5 }}></View>
      </View>
    );
  }
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    justifyContent: "space-between"
  }
});

import React, { Component } from "react";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Styles from "./Styles";
import { PostData } from "./services/PostData.js";
import { FetchData } from "./services/FetchData";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  KeyboardAvoidingView
} from "react-native";
import ActiveRequests from "./ActiveRequests";
import ModalLayout from "./ModalLayout";
import ActionButton from "react-native-action-button";
import Spinner from "./Spinner";

export default class HomeTab extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => <Ionicons name="md-home" size={28} color="black" />
  };
  state = {
    BloodGroup: 0,
    Location: "",
    Description: "",
    modalVisible: false,
    RequestDetail: null,
    RequestID: null,
    DetailModal: false,
    ShowSpinner: false
  };

  OpenDetailModel = id => {
    this.ShowSpinner();
    FetchData("Requests/d?id=" + id)
      .then(resp => {
        this.setState({
          RequestDetail: resp.Data,
          RequestID: id,
          DetailModal: true
        });
        this.HideSpinner();
      })
      .catch(errorMessage => {
        this.HideSpinner();
      });
  };
  AcceptConfirmed = () => {
    let data = { RequestID: this.state.RequestID };
    this.ShowSpinner();
    PostData("Accepts", data)
      .then(resp => {
        this.HideSpinner();
        alert(resp.Message);
        this.setState({ DetailModal: false, modalVisible: false });
      })
      .catch(errorMessage => {
        this.HideSpinner();
      });
  };
  sendRequest = () => {
    this.ShowSpinner();
    PostData("requests", this.state)
      .then(resp => {
        this.HideSpinner();
        alert(resp.Message);
        this.setState({
          BloodGroup: 0,
          Location: "",
          Description: ""
        });
      })
      .catch(errorMessage => {
        this.HideSpinner();
        alert(errorMessage);
      });
  };
  render() {
    let requestDetail = <View />;
    if (this.state.RequestDetail) {
      requestDetail = (
        <View>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Request</Text>

          <View
            style={{
              marginTop: 5
            }}
          >
            <View>
              <Text style={{ marginBottom: 10, fontSize: 12 }}>
                {this.state.RequestDetail.Detail}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 12 }}>
                {this.state.RequestDetail.Message
                  ? 'and saying "' + this.state.RequestDetail.Message + '"'
                  : ""}
              </Text>
              <Text>Are you willing to Donate?</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 5
              }}
            >
              <Button
                style={{ marginLeft: 20, backgroundColor: "green" }}
                mode="contained"
                onPress={this.AcceptConfirmed}
              >
                Yes I'm
              </Button>
              <Button
                style={[Styles.BackgroundColor, { marginLeft: 20 }]}
                mode="contained"
                onPress={() => {
                  this.setState({ DetailModal: false });
                }}
              >
                No
              </Button>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={[Styles.title, Styles.BackgroundColor]}>Home</Text>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <Text style={styles.tagLine}>
              Do inform others that You need their Help!
            </Text>
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 17,
                    margin: 10,
                    fontWeight: "bold",
                    marginTop: 12
                  }}
                >
                  Blood Group
                </Text>
                <Picker
                  selectedValue={this.state.BloodGroup}
                  style={{
                    height: 50,
                    width: 150
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ BloodGroup: itemValue });
                  }}
                >
                  <Picker.Item label="Select" value="0" />
                  <Picker.Item label="A+" value="1" />
                  <Picker.Item label="A-" value="2" />
                  <Picker.Item label="B+" value="3" />
                  <Picker.Item label="B-" value="4" />
                  <Picker.Item label="O+" value="5" />
                  <Picker.Item label="O-" value="6" />
                  <Picker.Item label="AB+" value="7" />
                  <Picker.Item label="AB-" value="8" />
                </Picker>
              </View>
              <TextInput
                selectionColor="black"
                label="Location"
                value={this.state.Location}
                onChangeText={Location => this.setState({ Location })}
              />
              <TextInput
                selectionColor="black"
                label="Enter Short Description"
                value={this.state.Description}
                onChangeText={Description => this.setState({ Description })}
              />

              <Button
                mode="contained"
                style={{ marginTop: 20, ...Styles.BackgroundColor }}
                onPress={this.sendRequest}
              >
                Request
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ActionButton
          renderIcon={() => (
            <Ionicons name="md-more" style={styles.actionButtonIcon} />
          )}
          buttonColor="rgba(231,76,60,1)"
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Open Requests"
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Ionicons name="md-heart-half" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {
              this.props.navigation.navigate("Notifications");
            }}
          >
            <Ionicons
              name="md-notifications-off"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
        <View>
          <ModalLayout visible={this.state.modalVisible}>
            <Text style={{ marginBottom: 10, fontSize: 20 }}>
              Active Requests
            </Text>
            <ActiveRequests OpenDetailModel={id => this.OpenDetailModel(id)} />
            {/*  */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 5
              }}
            >
              <Button
                style={[Styles.BackgroundColor, { marginLeft: 20 }]}
                mode="contained"
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                Close
              </Button>
            </View>
          </ModalLayout>
          <ModalLayout visible={this.state.DetailModal}>
            {requestDetail}
          </ModalLayout>
        </View>
        <Spinner visible={this.state.ShowSpinner}></Spinner>
      </View>
    );
  }

  ShowSpinner = () => {
    this.setState({ ShowSpinner: true });
  };
  HideSpinner = () => {
    this.setState({ ShowSpinner: false });
  };
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  container: {
    padding: 20
  },
  tagLine: {
    fontSize: 20,
    margin: 10
  }
});

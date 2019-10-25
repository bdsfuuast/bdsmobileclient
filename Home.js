import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import HomeTab from "./components/HomeTab";
import NotificationsTab from "./components/NotificationsTab";
import HistoryTab from "./components/HistoryTab";
import ProfileTab from "./components/ProfileTab";
import SettingsTab from "./components/SettingsTab";
import Styles from "./components/Styles";

const DrawerNavigator = createDrawerNavigator({
  Home: HomeTab,
  Notifications: NotificationsTab,
  History: HistoryTab,
  Profile: ProfileTab,
  Settings: SettingsTab
});
const StackNavigator = createStackNavigator(
  {
    DefaultHome: DrawerNavigator
  },
  {
    defaultNavigationOptions: data => {
      return {
        title: "Blood Donation",
        headerLeft: (
          <Ionicons
            style={{ marginLeft: 15 }}
            name="md-menu"
            size={32}
            color="white"
            onPress={() => data.navigation.toggleDrawer()}
          />
        ),
        headerStyle: {
          ...Styles.BackgroundColor
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };
    }
  }
);

const HomeContainer = createAppContainer(StackNavigator);

export default class Home extends React.Component {
  render() {
    return <HomeContainer />;
  }
}

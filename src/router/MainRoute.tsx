import { View, Text } from "react-native";
import React from "react";
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import * as Font from "expo-font";
import DashboardScreen from "../screens/Drawer/DashboardScreen";
import { rootStackParamList } from "../types/rootStackParams";
import DrawerRoute from "./DrawerRoute";

const Stack = createStackNavigator<rootStackParamList>();

const MainRoute = () => {
  const headerOption: StackNavigationOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          options={headerOption}
          name="login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={headerOption}
          name="main"
          component={DrawerRoute}
        />

        {/* <Stack.Screen name='splash' component={SplashScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;

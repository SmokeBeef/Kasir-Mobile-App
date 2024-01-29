import { View, Text } from "react-native";
import React, { useState } from "react";
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
import DetailTransactionScreen from "../screens/DetailTransactionScreen";
import PembayaranScreen from "../screens/PembayaranScreen";

const Stack = createStackNavigator<rootStackParamList>();

const MainRoute = () => {
  const [token, setToken] = useState<string | null>('')
  const headerOption: StackNavigationOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: "#fb923c",
          },
          headerBackTitleStyle: {
            color: "white"
          },
          headerTitleStyle: {
            color: "white"
          },
          headerTintColor: "white"
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
        <Stack.Screen
          options={{ cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid, }}

          name="detail"
          component={DetailTransactionScreen}
        />
        <Stack.Screen
          options={{ cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid, }}

          name="pembayaran"
          component={PembayaranScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;

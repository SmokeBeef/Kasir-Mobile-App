import { View, Text, VStack, Pressable, Button } from "@gluestack-ui/themed";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import DashboardScreen from "../screens/Drawer/DashboardScreen";
import { Image } from "@gluestack-ui/themed";
import SettingScreen from "../screens/Drawer/SettingScreen";
import { useIsFocused } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function DrawerRoute() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{}}>
      <Drawer.Screen name="dashboard" component={DashboardScreen} />
      <Drawer.Screen name="setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

//// Drawer Content
function DrawerContent({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps): React.ReactNode {
  const focus = useIsFocused();

  useEffect(() => {}, [focus]);
  return (
    <DrawerContentScrollView>
      <VStack mt={"$12"}>
        <View alignItems="center" gap={"$4"}>
          <Image
            source={{
              uri: "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
            }}
            rounded={"$full"}
            borderWidth={"$1"}
            borderColor="$trueGray200"
            alt="profile picture"
          />
          <Text>Admin</Text>
        </View>

        <View mx={"$4"} mt={"$8"} gap={"$2"}>
          {state.routes.map((route, index) => (
            <Pressable
              key={route.key}
              px={"$4"}
              py={"$2"}
              rounded={"$xl"}
              bg={
                descriptors[route.key].navigation.isFocused()
                  ? "$blue200"
                  : "white"
              }
              onPress={() => navigation.jumpTo(route.name)}
            >
              <Text
                color={
                  descriptors[route.key].navigation.isFocused()
                    ? "$blue500"
                    : "$trueGray500"
                }
                textTransform="capitalize"
              >
                {route.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </VStack>
    </DrawerContentScrollView>
  );
}

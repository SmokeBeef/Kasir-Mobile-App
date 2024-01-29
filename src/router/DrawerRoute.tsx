import { View, Text, VStack, Pressable, Button, InputField } from "@gluestack-ui/themed";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import DashboardScreen from "../screens/Drawer/DashboardScreen";
import { Image } from "@gluestack-ui/themed";
import SettingScreen from "../screens/Drawer/SettingScreen";
import { useIsFocused } from "@react-navigation/native";
import TransactionScrenn from "../screens/Drawer/TransactionScreen";
import { rootStackDrawerList } from "../types";
import { Alert } from "react-native";
import { getItem } from "../utils/storage";

const Drawer = createDrawerNavigator<rootStackDrawerList>();

export default function DrawerRoute() {
  return (
    <Drawer.Navigator drawerContent={DrawerContent} screenOptions={{
      headerStyle: {
        backgroundColor: "#fb923c",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        color: "white",
      },

    }}>
      <Drawer.Screen name="dashboard" component={DashboardScreen} />
      <Drawer.Screen name="transaction" component={TransactionScrenn} />
    </Drawer.Navigator>
  );
}





//// Drawer Content
function DrawerContent({
  descriptors,
  navigation,
  state,
}: DrawerContentComponentProps): React.ReactNode {
  const [photo, setPhoto] = useState<null | string>(null)
  const [name, setName] = useState<null | string>(null)
  const focus = useIsFocused();

  const getUser = async () => {
    const getPhoto = getItem('photo')
    const getName = getItem('name')
    const [photo, name] = await Promise.all([getPhoto, getName])
    setPhoto(photo || null)
    setName(name || null)
  }

  useEffect(() => {
    getUser()
  }, [focus]);
  return (
    <DrawerContentScrollView>
      <VStack mt={"$12"}>
        <View alignItems="center" gap={"$4"}>
          <Image
            source={{
              uri: photo || "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
            }}
            rounded={"$full"}
            borderWidth={"$1"}
            borderColor="$trueGray200"
            alt="profile picture"
          />
          <Text>{name || "nama user"}</Text>
        </View>

        <View mx={"$4"} mt={"$8"} gap={"$2"}>
          {state.routes.map((route) => (
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
          <Pressable
            px={"$4"}
            py={"$2"}
            rounded={"$xl"}
            borderWidth={"$1"}
            borderColor="$red200"
            bg="$red600"
            onPress={() => {
              Alert.alert(
                "Apa kamu yakin?",
                "Apa kamu yakin untuk logout?",
                [
                  {
                    text: "No",

                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: (value) => {

                    },
                  }
                ],
                // {onDismiss: () => {}}
              )

            }}
          >
            <Text
              color="$amber50"
              textTransform="capitalize"
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </VStack>
    </DrawerContentScrollView>
  );
}


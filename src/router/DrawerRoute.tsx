import {
  View,
  Text,
  VStack,
  Pressable,
  Button,
  InputField,
} from "@gluestack-ui/themed";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import DashboardScreen from "../screens/Drawer/DashboardScreen";
import { Image } from "@gluestack-ui/themed";
import SettingScreen from "../screens/Drawer/SettingScreen";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import TransactionScrenn from "../screens/Drawer/TransactionScreen";
import { rootStackDrawerList } from "../types";
import { Alert } from "react-native";
import { getItem } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootStackParamList } from "../types/rootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Icon, MD3Colors } from "react-native-paper";

const Drawer = createDrawerNavigator<rootStackDrawerList>();

export default function DrawerRoute() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fb923c",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
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
  const [photo, setPhoto] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);

  const navigate =
    useNavigation<StackNavigationProp<rootStackParamList, "main">>();
  const focus = useIsFocused();

  const getUser = async () => {
    const getPhoto = getItem("photo");
    const getName = getItem("name");
    const [photo, name] = await Promise.all([getPhoto, getName]);
    setPhoto(photo || null);
    setName(name || null);
  };

  useEffect(() => {
    getUser();
  }, [focus]);

  let [fontsLoaded] = useFonts({
    "RobotoSlab-Bold": require("../../assets/font/static/RobotoSlab-Bold.ttf"),
    Regular: require("../../assets/font/static/RobotoSlab-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <DrawerContentScrollView>
      <VStack mt={"$12"}>
        <View alignItems="center" >
          <Image
            source={{
              uri:
                photo ||
                "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
            }}
            rounded={"$full"}
            borderWidth={"$1"}
            borderColor="$trueGray200"
            alt="profile picture"
            width={90}
            height={90}
          />
          <Text style={{fontWeight:"bold", marginTop:10, fontSize:20, color:"black"}}>{name ? name.toUpperCase() : "NAMA USER"}</Text>
          <Text>Kasir</Text>
        </View>

        <View mx={"$4"} mt={"$8"} gap={"$2"}>
          {state.routes.map((route) => (
            <Pressable
              key={route.key}
              px={"$4"}
              py={"$2"}
              // rounded={"$xl"}
              // bg={
              //   descriptors[route.key].navigation.isFocused()
              //     ? "orange"
              //     : "white"
              // }
              borderLeftWidth={"$4"}
              borderColor={
                descriptors[route.key].navigation.isFocused()
                  ? "orange"
                  : "white"
              }
              onPress={() => navigation.jumpTo(route.name)}
            >
              <Text
                color={
                  descriptors[route.key].navigation.isFocused()
                    ? "black"
                    : "black"
                }
                textTransform="capitalize"
                fontWeight={
                  descriptors[route.key].navigation.isFocused() ? "$bold" : ""
                }
                // fontFamily=
                //{descriptors[route.key].navigation.isFocused()
                //   ? "RobotoSlab-Bold"
                //   : "Regular"}
              >
                {route.name}
              </Text>
            </Pressable>
          ))}
          <Pressable
            mt={"$5"}
            mb={"$5"}
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

                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: (value) => {},
                  },
                ]
                // {onDismiss: () => {}}
              );
            }}
          >
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Icon source="logout" color="white" size={25}  />
  <Text
    color="$amber50"
    textTransform="capitalize"
    onPress={() => {
      Alert.alert("yakin logout?", "kamu akan logout lo!", [
        {
          text: "ya",
          onPress: async () => {
            await AsyncStorage.clear();
            navigate.replace("login");
          },
        },
        {
          text: "batal",
        },
      ]);
    }}
  >
    Logout
  </Text>
</View>

          </Pressable>
        </View>
      </VStack>
    </DrawerContentScrollView>
  );
}

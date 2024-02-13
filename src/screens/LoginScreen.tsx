import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  // Text,
  VStack,
  // View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { rootStackParamList } from "../types/rootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import { loginResponse } from "../types";
import { getItem, setItem } from "../utils/storage";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";

interface form {
  username: string;
  password: string;
}

type loginScreeProp = StackNavigationProp<rootStackParamList, "login">;

export default function LoginScreen() {
  const BASE_API =
    process.env.EXPO_PUBLIC_BASE_API || "https://api-cafe-ukk.vercel.app/v1";
  const [form, setForm] = useState<form>({
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigation<loginScreeProp>();

  const onChange = (data: string, field: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post<loginResponse>(
        `${BASE_API}/auth/login`,
        form
      );
      console.log(response.data.data);

      const name = setItem("name", response.data.data.name);
      const id = setItem("id", response.data.data.id);
      const username = setItem("username", response.data.data.username);
      const photo = setItem("photo", response.data.data.image);
      const token = setItem("token", response.data.data.token);
      const tokenExpires = setItem("expires", response.data.data.expires);
      await Promise.all([token, name, username, photo, id, tokenExpires]);

      // alert(response.data.message);
      setLoading(false);

      navigate.replace("main");
    } catch (error) {
      console.log(error);

      setLoading(false);

      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);

        alert(error.response?.data.message);
      } else {
        alert("error di internal server");
      }
    }
  };

  const checkToken = async () => {
    const token = (await getItem("token")) || null;
    if (token) {
      navigate.replace("main");
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  let [fontsLoaded] = useFonts({
    Latoblack: require("../../assets/font/lato/Lato-Black.ttf"),
    Latoreg: require("../../assets/font/lato/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {/* <VStack flex={1} justifyContent="center" backgroundColor="$orange300" alignItems="center">
      <Box bg="$orange50" p={16} rounded={"$lg"} gap={16}>
        <Text
          size="4xl"
          fontWeight="$semibold"
          textAlign="center"
          color="$black"
          fontFamily="Latoblack"
        >
          Log In
        </Text>
        <Input
          variant="underlined"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          w={300}
        >
          <InputField
            placeholder="username"
            fontWeight="$light"
            w={"$6"}
            color="$black"
            onChangeText={(e) => onChange(e, "username")}
          />
        </Input>
        <Input
          variant="underlined"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          w={300}
        >
          <InputField
            type="password"
            placeholder="password"
            fontWeight="$light"
            color="$black"
            w={"$6"}
            onChangeText={(e) => onChange(e, "password")}
          />
        </Input>

        <Button
          onPress={() => onSubmit()}
          mt={"$4"}
          bg="$orange500"
          $active-bgColor="$orange600"
          disabled={loading}
        >
          <ButtonText alignItems="center">
            {loading ? <ActivityIndicator color={"white"} /> : "Submit"}
          </ButtonText>
        </Button>
      </Box>
    </VStack> */}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent", // Set background to transparent to allow image to show
        }}
      >
        <Image
          source={require("../../assets/fotobg.jpg")}
          style={{
            position: "absolute", // Position the image absolutely to cover the entire ScrollView
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1, // Set zIndex to make sure the image is behind other content
          }}
          resizeMode="cover" // Ensure the image covers the entire ScrollView
        />

        <View
          style={{
            width: "80%",
            height: "90%",
            maxWidth: 400,
            backgroundColor: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            padding: 20,
          }}
        >
          <Image
            source={{
              uri: "https://png.pngtree.com/png-vector/20190331/ourlarge/pngtree-cashier-icon-line-design--business-icon-vector-design-png-image_902141.jpg",
            }}
            style={{
              width: "70%",
              height: 100,
              alignSelf: "center",
              marginTop: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginVertical: 20,
              color: "#4b5563",
              fontFamily: "Latoblack",
            }}
          >
            Welcome back!
          </Text>

          <View style={{}}>
            <TextInput
              style={{
                backgroundColor: "#f3f4f6",
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#d1d5db",
                marginBottom: 10,
                fontFamily: "Latoreg",
              }}
              placeholder="Username"
              onChangeText={(e) => onChange(e, "username")}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f3f4f6",
                // paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#d1d5db",
                marginBottom: 10,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Latoreg",
                }}
                secureTextEntry={!showPassword}
                placeholder="Password"
                onChangeText={(e) => onChange(e, "password")}
              />
              <IconButton
                icon={showPassword ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={{
              backgroundColor: "orange",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 30,
              marginBottom: 60,
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text
                style={{ color: "#fff", fontSize: 16, fontFamily: "Latoblack" }}
              >
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

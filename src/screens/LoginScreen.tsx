import {
  Box,
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { rootStackParamList } from "../types/rootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosError } from "axios";
import { loginResponse } from "../types";
import { getItem, setItem } from "../utils/storage";
import { ActivityIndicator } from "react-native";

interface form {
  username: string;
  password: string;
}

type loginScreeProp = StackNavigationProp<rootStackParamList, "login">;

export default function LoginScreen() {
  const BASE_API = process.env.EXPO_PUBLIC_BASE_API || "https://api-cafe-ukk.vercel.app/v1";
  const [form, setForm] = useState<form>({
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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

      alert(response.data.message);
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
    const token = await getItem('token') || null
    if (token) {
      navigate.replace('main')
    }
  }
  useEffect(() => {
    checkToken()
  }, [])

  return (
    <VStack flex={1} justifyContent="center" backgroundColor="$orange300" alignItems="center">
      <Box bg="$orange50" p={16} rounded={"$lg"} gap={16}>
        <Text
          size="4xl"
          fontWeight="$semibold"
          textAlign="center"
          color="$black"
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
    </VStack>
  );
}

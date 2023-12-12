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
import React, { useState } from "react";
import { rootStackParamList } from "../types/rootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";

interface form {
  username: string;
  password: string;
}

type loginScreeProp = StackNavigationProp<rootStackParamList, "login">;

export default function LoginScreen() {
  const [form, setForm] = useState<form>({
    password: "",
    username: "",
  });

  const navigate = useNavigation<loginScreeProp>();

  const onChange = (data: string, field: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const onClick = () => {
    if (form.username !== "admin" && form.password !== "admin") {
      alert("password atau username tidak sesuai");
    } else {
      navigate.navigate("main");
    }
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Box bg="$darkBlue900" p={16} rounded={"$lg"} gap={16}>
        <Text
          size="4xl"
          fontWeight="$semibold"
          textAlign="center"
          color="$white"
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
            color="$white"
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
            color="$white"
            w={"$6"}
            onChangeText={(e) => onChange(e, "password")}
          />
        </Input>

        <Button
          onPress={() => onClick()}
          mt={"$4"}
          bg="$blue700"
          $active-bgColor="$blue800"
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </Box>
    </VStack>
  );
}

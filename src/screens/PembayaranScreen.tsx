import {
  View,
  Text,
  InputField,
  Input,
  VStack,
  FormControl,
  Box,
  ScrollView,
  Button,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  HStack,
  Heading,
} from "@gluestack-ui/themed";
import { Icon } from "react-native-paper";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  rootStackDrawerList,
  rootStackParamList,
} from "../types/rootStackParams";
import { cart } from "../types";
import { getItem } from "../utils/storage";
import { currency } from "../utils/currency";
import axios, { AxiosError } from "axios";
import { pemesananCreateResponse } from "../types/response";
import { ActivityIndicator } from "react-native";
import { axiosInterceptor } from "../utils/axiosInterceptor";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { cartState } from "../store/cartStore";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

interface form {
  customer_name: string;
  total_payment: string;
}

export default function Pembayaran() {
  const navigate = useNavigation<NavigationProp<rootStackDrawerList>>();
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API || "http://localhost:4000";
  const route = useRoute<RouteProp<{ data: { data: cart } }>>();
  const [token, setToken] = useState("");

  const [form, setForm] = useState<form>({
    customer_name: "",
    total_payment: "",
  });

  const [kasir, setKasir] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const setCart = useSetRecoilState(cartState);

  const getKasir = async () => {
    const getToken = getItem("token");

    const getName = getItem("name");
    const [username, token] = await Promise.all([getName, getToken]);

    if (username) setKasir(username);

    if (token) setToken(token);
  };

  const onChange = (text: string, column: "name" | "payment") => {
    if (column === "name") {
      setForm({ ...form, customer_name: text });
    } else if (column === "payment") {
      setForm({ ...form, total_payment: text });
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    const detailPemesanan = route.params.data.items.map((val) => {
      return {
        menu_id: val.id,
        qty: val.total,
      };
    });
    const payload = {
      ...form,
      total_payment: +form.total_payment,
      detailPemesanan: detailPemesanan,
    };

    try {
      console.log(token);
      const url = BASE_URL + "/pemesanan";
      console.log(url);

      const response = await axiosInterceptor.post<pemesananCreateResponse>(
        url,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowAlertDialog(true);
      setLoading(false);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        console.log(error.message);
        alert(error.response?.data.message);
      }

      setLoading(false);
      // alert('error')
    } finally {
      setCart({ items: [], totalPrice: 0 });
      setLoading(false);
    }
  };

  useEffect(() => {
    getKasir();
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
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false);
          navigate.navigate("dashboard");
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="$0">
            <HStack space="sm" alignItems="center">
              <Icon source="check-circle-outline" color="green" size={25} />
              <Heading size="lg">Transaction success</Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" fontFamily="Latoreg">
              Congratulations, your order has been placed!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth="$0">
            <Button
              bgColor="orange"
              // variant="outline"
              size="sm"
              action="primary"
              mr="$3"
              onPress={() => {
                setShowAlertDialog(false);

                navigate.navigate("dashboard");
              }}
            >
              <ButtonText>Okay</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ScrollView>
        <VStack
          flex={1}
          bgColor="$orange50"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            p={"$4"}
            my={"$4"}
            bg="$white"
            borderWidth={"$1"}
            borderColor="$trueGray200"
            w={"$96"}
            mx={4}
            gap={"$4"}
          >
            <Text fontFamily="Latoblack" textAlign="center" fontSize={20}>
              Payment
            </Text>
            <VStack>
              <Text fontFamily="Latoreg" mb={"$1"}>
              Cashier name
              </Text>
              <Input isReadOnly variant="outline">
                <InputField placeholder="username" value={kasir} />
              </Input>
            </VStack>
            <VStack>
              <Text fontFamily="Latoreg" mb={"$1"}>
              Customer name
              </Text>
              <Input>
                <InputField
                  onChangeText={(val) => onChange(val, "name")}
                  placeholder="Enter the customer name"
                />
              </Input>
            </VStack>
            <VStack>
              <Text fontFamily="Latoreg" mb={"$1"}>
                Nominal cash
              </Text>
              <Input aria-label="numeric">
                <InputField
                  onChangeText={(val) => onChange(val, "payment")}
                  keyboardType="numeric"
                  placeholder="Enter the nominal"
                />
              </Input>
            </VStack>
            <VStack>
              <Text fontFamily="Latoreg" mb={"$1"}>
                Final Total 
              </Text>
              <Input isReadOnly aria-label="numeric">
                <InputField
                  keyboardType="numeric"
                  placeholder="nama pelanggan"
                  value={currency.format(route.params.data.totalPrice)}
                />
              </Input>
            </VStack>

            <Button
              onPress={() => onSubmit()}
              $active-bg="$orange600"
              mt={"$4"}
              bgColor="$orange400"
            >
              <ButtonText>
                {loading ? <ActivityIndicator color={"white"} /> : "Bayar"}
              </ButtonText>
            </Button>
          </Box>
        </VStack>
      </ScrollView>
      
    </>
  );
}

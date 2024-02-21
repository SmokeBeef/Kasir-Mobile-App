import { View, Text, VStack, Box, HStack, Divider } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { rootStackParamList } from "../types/rootStackParams";
import { PemesananById, pemesananByIdResponse } from "../types/response";
import { getItem } from "../utils/storage";
import { axiosInterceptor } from "../utils/axiosInterceptor";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ActivityIndicator } from "react-native";
import { dateFormarter } from "../utils/dateFormat";
import { currency } from "../utils/currency";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native";

const DetailTransactionScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: number } }>>();
  const BASE_API =
    process.env.EXPO_PUBLIC_BASE_API || "https://api-cafe-ukk.vercel.app/v1";
  const isFocused = useIsFocused();
  const [data, setData] = useState<PemesananById>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const token = (await getItem("token")) || null;
      const id = route.params.id;
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInterceptor.get<pemesananByIdResponse>(
        `${BASE_API}/pemesanan/${id}`,
        config
      );
      if (response.data.success) {
        setData(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
      alert("internal error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  let [fontsLoaded] = useFonts({
    Latoblack: require("../../assets/font/lato/Lato-Black.ttf"),
    Latoreg: require("../../assets/font/lato/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={{backgroundColor:"#ffedd5" }}>
      <VStack bgColor="$orange100" pt={"$4"} flex={1} alignItems="center" pb={10} >
        {loading ? (
          <ActivityIndicator color={"black"} size={"large"} />
        ) : data ? (
          <Box
            p={"$4"}
            bgColor="$white"
            w={"$96"}
            borderRadius={"$md"}
            borderWidth={"$1"}
            borderColor="$trueGray300"
            
          >
            <Text size="3xl" mb={"$4"} fontFamily="Latoblack">
              Detail Transaction
            </Text>
            <HStack>
              <Text flex={1} fontFamily="Latoreg">No Transaction : </Text>
              <Text flex={1} fontFamily="Latoreg">{data.id}</Text>
            </HStack>
            <HStack>
              <Text flex={1} fontFamily="Latoreg">Date : </Text>
              <Text flex={1} fontFamily="Latoreg">{dateFormarter(data.created_at)}</Text>
            </HStack>
            <HStack>
              <Text flex={1} fontFamily="Latoreg">Customer Name: </Text>
              <Text flex={1} fontFamily="Latoreg">{data.customer_name}</Text>
            </HStack>
            <HStack>
              <Text flex={1} fontFamily="Latoreg">Cashier Name : </Text>
              <Text flex={1} fontFamily="Latoreg">{data.user_name}</Text>
            </HStack>
            <Text my={"$4"} fontFamily="Latoreg">List Order :</Text>
            <HStack pb={5}>
              <Text flex={1} fontFamily="Latoreg">Menu </Text>
              <Text flex={1} fontFamily="Latoreg">qty</Text>
              <Text flex={1} fontFamily="Latoreg">Total Price</Text>
            </HStack>
            {/* <Divider my={"$2"} /> */}
            <VStack gap={"$2"}>
              {data.detailPemesanan.map((val) => (
                <HStack>
                  <Text flex={1} fontFamily="Latoreg">{val.menu_name}</Text>
                  <Text flex={1} fontFamily="Latoreg">{val.qty}</Text>
                  <Text flex={1} fontFamily="Latoreg">{currency.format(val.total)}</Text>
                </HStack>
              ))}
            </VStack>
            <Divider my={"$4"} />
            <VStack gap={"$2"}>
              <HStack>
                <Text flex={1} fontFamily="Latoreg">Total</Text>
                <Text flex={1}></Text>
                <Text flex={1} fontFamily="Latoblack">{currency.format(data.total)}</Text>
              </HStack>
              <HStack>
                <Text flex={1} fontFamily="Latoreg">Payment</Text>
                <Text flex={1}></Text>
                <Text flex={1} fontFamily="Latoreg">{currency.format(data.total_payment)}</Text>
              </HStack>
              <Divider />
              <HStack>
                <Text flex={1} fontFamily="Latoreg">Change Money</Text>
                <Text flex={1}></Text>
                <Text flex={1} fontFamily="Latoreg">
                  {currency.format(data.total_payment - data.total)}
                </Text>
              </HStack>
            </VStack>
          </Box>
        ) : (
          <Text>Data not found</Text>
        )}
      </VStack>
    </ScrollView>
  );
};

export default DetailTransactionScreen;

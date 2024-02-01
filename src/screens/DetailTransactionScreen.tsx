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

const DetailTransactionScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: number } }>>();
  const BASE_API = process.env.EXPO_PUBLIC_BASE_API || "https://api-cafe-ukk.vercel.app/v1";
  const isFocused = useIsFocused()
  const [data, setData] = useState<PemesananById>()
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    try {
      setLoading(true)
      const token = await getItem('token') || null;
      const id = route.params.id
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axiosInterceptor.get<pemesananByIdResponse>(`${BASE_API}/pemesanan/${id}`, config)
      if (response.data.success) {
        setData(response.data.data)
        console.log(response.data.data);

      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
      alert("internal error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [isFocused])

  return (
    <VStack bgColor="$orange100" pt={"$4"} flex={1} alignItems="center">
      {loading ? <ActivityIndicator color={"black"} size={"large"} /> :
        data ?
          <Box p={"$4"} bgColor="$white" w={"$96"} borderRadius={"$md"} borderWidth={"$1"} borderColor="$trueGray300">
            <Text size="3xl" mb={"$4"}>Detail Pemesanan</Text>
            <HStack >
              <Text flex={1}>Nomor Pesanan : </Text>
              <Text flex={1}>{data.id}</Text>
            </HStack>
            <HStack >
              <Text flex={1}>Tgl Pemesanan : </Text>
              <Text flex={1}>{dateFormarter(data.created_at)}</Text>
            </HStack>
            <HStack >
              <Text flex={1}>Nama Customer : </Text>
              <Text flex={1}>{data.customer_name}</Text>
            </HStack>
            <HStack >
              <Text flex={1}>Nama Kasir : </Text>
              <Text flex={1}>{data.user_name}</Text>
            </HStack>
            <Text my={"$4"}>Pesanan</Text>
            <HStack>
              <Text flex={1}>nama menu </Text>
              <Text flex={1}>qty</Text>
              <Text flex={1}>total harga</Text>
            </HStack>
            <Divider my={"$2"} />
            <VStack gap={"$2"}>
              {data.detailPemesanan.map(val => (
                <HStack>
                  <Text flex={1}>{val.menu_name}</Text>
                  <Text flex={1}>{val.qty}</Text>
                  <Text flex={1}>{currency.format(val.total)}</Text>
                </HStack>
              ))}
            </VStack>
            <Divider my={"$4"} />
            <VStack gap={"$2"}>

              <HStack>
                <Text flex={1}>Total</Text>
                <Text flex={1}></Text>
                <Text flex={1}>{currency.format(data.total)}</Text>
              </HStack>
              <HStack>
                <Text flex={1}>Bayar Tunai</Text>
                <Text flex={1}></Text>
                <Text flex={1}>{currency.format(data.total_payment)}</Text>
              </HStack>
              <Divider />
              <HStack>
                <Text flex={1}>Kembalian</Text>
                <Text flex={1}></Text>
                <Text flex={1}>{currency.format(data.total_payment - data.total)}</Text>
              </HStack>
            </VStack>

          </Box>

          : <Text>Data not found</Text>}
    </VStack>
  );
};

export default DetailTransactionScreen;

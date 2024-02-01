import {
  View,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  ButtonText,
  InputField,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { dataTransaksi, dataWillAdd } from "../../data/item";
import { dataTransaction } from "../../types/transaction";
import { ActivityIndicator, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { pemesananDetail, pemesananGetAllResponse, transaksi } from "../../types/response";
import { dateFormarter } from "../../utils/dateFormat";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { rootStackParamList } from "../../types/rootStackParams";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getItem } from "../../utils/storage";
import { useGestureHandlerRef } from "@react-navigation/stack";
import { currency } from '../../utils/currency';
import { axiosInterceptor } from "../../utils/axiosInterceptor";

export default function TransactionScreen() {

  const focus = useIsFocused()

  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API || "https://kasir-backend-nestjs-production.up.railway.app"

  const navigate = useNavigation<NavigationProp<rootStackParamList>>()
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<pemesananDetail[]>([])
  const [nextVisible, setNextVisible] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1);
  const [token, setToken] = useState<string | null>(null)

  const onReachBottom = () => {

    if (nextVisible && !loading) {
      getData()
    }


  };

  const getFirstData = async () => {

    console.log('get token');

    const getToken = await getItem('token') || null
    console.log("get token " + getToken);

    setToken(getToken)

    setPage(1)
    setLoading(true)

    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${getToken}`
        }
      }
      const query = `?page=1`
      const url = BASE_URL + '/pemesanan' + query;
      const response = await axiosInterceptor.get<pemesananGetAllResponse>(url, config)


      if (response.data.success) {
        setData(response.data.data)
        setNextVisible(response.data.pagination.nextVisible)
        setPage(2)
      }

    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status === 401){
          
        }
      }
      console.log('ini error ', error);

      alert('error');
    } finally {
      setLoading(false)
    }

  }


  const getData = async () => {

    setLoading(true)

    const query = `?page=${page}`
    const url = BASE_URL + '/pemesanan' + query;

    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get<pemesananGetAllResponse>(url, config)


      if (response.data.success) {
        console.log('ini success ', response.data);
        console.log("page ", page);
        console.log("nest page is visible or no :", response.data.pagination.nextVisible);


        setData([...data, ...response.data.data])
        setNextVisible(response.data.pagination.nextVisible)
        setPage(page + 1)
      }

    } catch (error) {
      console.log('ini error ', error);

      alert('error');
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getFirstData()
  }, [])




  const RenderItem = ({ item, index }: ListRenderItemInfo<pemesananDetail>) => {
    return (
      <View bgColor="white" style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16, paddingVertical: 8, paddingHorizontal: 12 }} >

        <Text flex={0.3}>{index + 1}</Text>
        <Text flex={1}>{item.id}</Text>
        <Text flex={1}>{item.customer_name}</Text>
        <Text flex={1}>{currency.format(item.total)}</Text>
        <Text flex={1}>{dateFormarter(item.created_at)}</Text>
        <Button
          variant="link"
          onPress={() => navigate.navigate("detail", { id: item.id })}
          flex={0.3}
        >
          <ButtonText textAlign="left">
            Detail
          </ButtonText>
        </Button>
      </View>

    )
  }

  return (
    <VStack flex={1} bgColor="$orange100">
      {/* <HStack w={"$full"}>
        <Text bgColor="$orange400" color="$white" w={"$full"} >Transaction List</Text>
      </HStack> */}
      <HStack bgColor="$orange500" mx={"$4"} px={"$4"} py={"$2"} justifyContent="space-between">
        <Text flex={0.3} color="$white">No</Text>
        <Text flex={1} color="$white">No Transaksi</Text>
        <Text flex={1} color="$white">Customer Name</Text>
        <Text flex={1} color="$white">Total</Text>
        <Text flex={1} color="$white">Date Transaction</Text>
        <Text flex={0.3} color="$white" >Action</Text>
      </HStack>
      <FlashList
        data={data}
        refreshing={refreshing}
        onRefresh={async () => {
          await getFirstData(); 
          setRefreshing(false)
        }}
        estimatedItemSize={56}
        renderItem={RenderItem}
        onEndReached={onReachBottom}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={10}
        ItemSeparatorComponent={() => <View mx={"$4"}><Divider /></View>}
        ListFooterComponent={() => loading ? <ActivityIndicator color={"black"} size={"large"} /> : nextVisible ? null : <Text flex={1} textAlign="center">No More Data</Text>}
      />
    </VStack>
  );
}



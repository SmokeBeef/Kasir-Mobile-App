import { View, Text, InputField, Input, VStack, FormControl, Box, ScrollView, Button, ButtonText } from '@gluestack-ui/themed'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { rootStackDrawerList, rootStackParamList } from '../types/rootStackParams'
import { cart } from '../types'
import { getItem } from '../utils/storage'
import { currency } from '../utils/currency'
import axios, { AxiosError } from 'axios'
import { pemesananCreateResponse } from '../types/response'
import { ActivityIndicator } from 'react-native'
import { axiosInterceptor } from '../utils/axiosInterceptor'

interface form {
  customer_name: string,
  total_payment: string
}

export default function Pembayaran() {
  const navigate = useNavigation<NavigationProp<rootStackDrawerList>>()
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API || 'http://localhost:4000';
  const route = useRoute<RouteProp<{ data: { data: cart } }>>()
  const [token, setToken] = useState('')

  const [form, setForm] = useState<form>({ customer_name: '', total_payment: '' })

  const [kasir, setKasir] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const getKasir = async () => {
    const getToken = getItem('token');
    console.log(route.params.data);

    const getName = getItem("name");
    const [username, token] = await Promise.all([getName, getToken])

    if (username)
      setKasir(username)

    if (token)
      setToken(token)
  }
  const onChange = (text: string, column: 'name' | 'payment') => {
    if (column === "name") {
      setForm({ ...form, customer_name: text })
    }
    else if (column === "payment") {
      setForm({ ...form, total_payment: text })
    }
  }

  const onSubmit = async () => {
    setLoading(true)

    const detailPemesanan = route.params.data.items.map(val => {
      return {
        menu_id: val.id,
        qty: val.total
      }
    })
    const payload = {
      ...form,
      total_payment: +form.total_payment,
      detailPemesanan: detailPemesanan
    }

    try {
      console.log(token);
      const url = BASE_URL + "/pemesanan"
      console.log(url);
      
      const response = await axiosInterceptor.post<pemesananCreateResponse>(url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(response.data.message)

      setLoading(false)
      navigate.goBack()

    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        console.log(error.message);
        alert(error.response?.data.message)
      }

      setLoading(false)
      // alert('error')
    }
  }

  useEffect(() => {
    getKasir()
  }, [])

  return (
    <ScrollView >
      <VStack flex={1} bgColor='$orange50' justifyContent='center' alignItems='center'>

        <Box p={"$4"} my={"$4"} bg='$white' borderWidth={"$1"} borderColor='$trueGray200' w={"$96"} mx={4} gap={"$4"}>
          <Text>Pembayaran</Text>
          <VStack>
            <Text>Nama Kasir</Text>
            <Input isReadOnly variant='outline'>
              <InputField placeholder='username' value={kasir} />
            </Input>
          </VStack>
          <VStack>
            <Text>Nama Pelanggan</Text>
            <Input>
              <InputField onChangeText={(val) => onChange(val, 'name')} placeholder='nama pelanggan' />
            </Input>
          </VStack>
          <VStack>
            <Text>Nominal Tunai</Text>
            <Input aria-label='numeric' >
              <InputField onChangeText={(val) => onChange(val, 'payment')} keyboardType='numeric' placeholder='nama pelanggan' />
            </Input>
          </VStack>
          <VStack>
            <Text>Total Belanja</Text>
            <Input isReadOnly aria-label='numeric' >
              <InputField keyboardType='numeric' placeholder='nama pelanggan' value={currency.format(route.params.data.totalPrice)} />
            </Input>
          </VStack>

          <Button onPress={() => onSubmit()} $active-bg='$orange600' mt={"$4"} bgColor='$orange400'>
            <ButtonText>
              {loading ? <ActivityIndicator color={'white'} /> : "Bayar"}
            </ButtonText>
          </Button>
        </Box>
      </VStack>
    </ScrollView>
  )
}
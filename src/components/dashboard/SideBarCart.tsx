import React, { useState } from "react";
import {
  VStack,
  Text,
  Button,
  ButtonText,
  View,
  ButtonGroup,
  Divider,
} from "@gluestack-ui/themed";
import { Alert, Dimensions, FlatList } from "react-native";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/cartStore";
import { ScrollView } from "@gluestack-ui/themed";
import { currency } from "../../utils/currency";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rootStackParamList } from "../../types/rootStackParams";

export default function SideBarCart() {
  const navigate = useNavigation<NavigationProp<rootStackParamList>>()
  
  const [showModal, setShowModal] = useState<boolean>(false)
  const { items, totalPrice } = useRecoilValue(cartState);

  const onPay = () => {
    Alert.alert('Pembayaran', 'pembayaran dengan tunai', [
      {
        text: "Batal",

      },
      {
        text: "Bayar",
        onPress: () => navigate.navigate('pembayaran', { data: { items, totalPrice } })
      },

    ],
      {
        cancelable: true
      }
    )
  }

  const price = currency.format(totalPrice);

  return (
    <VStack
      w={"$80"}
      bgColor="$white"
      // h={dimension.height - 32 - 80}
      p={"$4"}
      rounded={"$md"}
      m={16}
    >
      <VStack flex={1} overflow="hidden">
        <View
          borderBottomColor="$backgroundDark800"
          pb={4}
          flexDirection="row"
          justifyContent="space-between"
        >

          <Text flex={1}>Nama</Text>
          <Text flex={1}>Qty</Text>
          <Text flex={1}>Total</Text>

        </View>
        <FlatList
          data={items}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <View
              py={"$2"}
              key={item.id}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text flex={1}>{item.name}</Text>
              <Text flex={1}>{item.total}</Text>
              <Text flex={1}>{item.price * item.total}</Text>
            </View>
          )} />

      </VStack>
      <View>
        <Text>Total : {price}</Text>
        <Button $active-bg="$orange500" bgColor="$orange" onPress={onPay}>
          <ButtonText>
            Save
          </ButtonText>
        </Button>
        {/* <Pop showModal={showModal} setShowModal={setShowModal} /> */}
      </View>
    </VStack>
  );
}

import React from "react";
import {
  VStack,
  Text,
  Button,
  ButtonText,
  View,
  ButtonGroup,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { useRecoilValue } from "recoil";
import { cartState } from "../../store/cartStore";
import { ScrollView } from "@gluestack-ui/themed";
import { currency } from "../../utils/currency";

export default function SideBarCart() {
  const { items, totalPrice } = useRecoilValue(cartState);

  const price = currency.format(totalPrice);

  const dimension = Dimensions.get("window");
  return (
    <VStack
      w={"$80"}
      bgColor="$blue300"
      minHeight={dimension.height - 32 - 80}
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
          <View>
            <Text>Nama</Text>
          </View>
          <View w="50%" flexDirection="row" justifyContent="space-between">
            <Text>Qty</Text>
            <Text>Total</Text>
          </View>
        </View>
        <ScrollView>
          {items?.map((item) => (
            <View
              key={item.id}
              flexDirection="row"
              justifyContent="space-between"
            >
              <View>
                <Text>{item.name}</Text>
              </View>
              <View w="50%" flexDirection="row" justifyContent="space-between">
                <Text>{item.total}</Text>
                <Text>{item.price * item.total}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </VStack>
      <View>
        <Text>Total : {price}</Text>
          <Button
            mt={16}
            bg="$blue700"
            $active-bgColor="$blue800"
            onPress={() => alert("halo")}
            w={"100%"}
          >
            <ButtonText>Save</ButtonText>
          </Button>
      </View>
    </VStack>
  );
}

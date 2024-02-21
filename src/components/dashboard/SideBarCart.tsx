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
import {
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
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Icon } from "react-native-paper";

export default function SideBarCart() {
  const navigate = useNavigation<NavigationProp<rootStackParamList>>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const { items, totalPrice } = useRecoilValue(cartState);

  const onPay = () => {
    Alert.alert(
      "Pembayaran",
      "pembayaran dengan tunai",
      [
        {
          text: "Batal",
        },
        {
          text: "Bayar",
          onPress: () =>
            navigate.navigate("pembayaran", { data: { items, totalPrice } }),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const price = currency.format(totalPrice);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  let [fontsLoaded] = useFonts({
    Latoblack: require("../../../assets/font/lato/Lato-Black.ttf"),
    Latoreg: require("../../../assets/font/lato/Lato-Regular.ttf"),
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
        }}
        size="sm"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="$0">
            <HStack space="sm" alignItems="center">
              {/* <Icon as={AlertTriangleIcon} color="$error700" /> */}
              <Icon source="cash-multiple" color="green" size={30} />
              <Heading size="lg">Continue to payment?</Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontFamily="Latoreg">Pay using cash</Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth="$0">
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                }}
              >
                <Text>Close</Text>
              </Button>
              <Button
                action="primary"
                onPress={() => {
                  navigate.navigate("pembayaran", {
                    data: { items, totalPrice },
                  });
                  setShowAlertDialog(false);
                }}
                bgColor="orange"
              >
                <ButtonText>Bayar</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
            <Text fontFamily="Latoreg" flex={1}>
              Menu
            </Text>
            <Text fontFamily="Latoreg" flex={1}>
              Qty
            </Text>
            <Text fontFamily="Latoreg" flex={1}>
              Total
            </Text>
          </View>
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => {
              const total = currency.format(item.price * item.total); // contoh penggunaan variabel total, sesuaikan dengan kebutuhan Anda
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 2,
                  }}
                  key={item.id}
                  mb={10}
                  mt={10}
                >
                  <Text fontFamily="Latoreg" flex={1}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                  <Text fontFamily="Latoreg" flex={1}>
                    {item.total}
                  </Text>
                  <Text fontFamily="Latoreg" flex={1}>
                    {total}
                  </Text>
                </View>
              );
            }}
          />
        </VStack>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            pt={10}
            pb={15}
            borderTopWidth={2}
            borderColor="orange"
          >
            <Text color="black" fontFamily="Latoblack">
              Final Total :
            </Text>
            <Text fontFamily="Latoreg">{price}</Text>
          </View>

          <Button
            $active-bg="$orange500"
            bgColor="$orange"
            onPress={() => setShowAlertDialog(true)}
          >
            <ButtonText>Save</ButtonText>
          </Button>
          {/* <Pop showModal={showModal} setShowModal={setShowModal} /> */}
        </View>
      </VStack>
    </>
  );
}

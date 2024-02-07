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
} from '@gluestack-ui/themed';


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
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)

  return (
    <>
          <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
        size="sm"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="$0">
            <HStack space="sm" alignItems="center">
              {/* <Icon as={AlertTriangleIcon} color="$error700" /> */}
              <Heading size="lg">Lanjut ke Pembayaran</Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              Pembayaran menggunakan Tunai
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth="$0">
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText fontSizes="$md">Close</ButtonText>
              </Button>
              <Button
                action="primary"
                onPress={() =>{navigate.navigate("pembayaran", { data: { items, totalPrice } })
                setShowAlertDialog(false)
              }
                  
                }
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
          <Text flex={1}>Nama</Text>
          <Text flex={1}>Qty</Text>
          <Text flex={1}>Total</Text>
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
                <Text flex={1}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <Text flex={1}>{item.total}</Text>
                <Text flex={1}>{total}</Text>
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
          <Text color="black" fontWeight="bold">
            Final Total :
          </Text>
          <Text>{price}</Text>
        </View>

        <Button $active-bg="$orange500" bgColor="$orange" onPress={() => setShowAlertDialog(true)}
        >
          <ButtonText>Save</ButtonText>
        </Button>
        {/* <Pop showModal={showModal} setShowModal={setShowModal} /> */}
      </View>
    </VStack>
    </>
    
  );
}

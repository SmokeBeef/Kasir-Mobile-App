import {
  View,
  Text,
  VStack,
  Image,
  Box,
  Button,
  ButtonText,
  ButtonGroup,
  Heading,
} from "@gluestack-ui/themed";
import React from "react";
import { item } from "../../types/data";
import { currency } from "../../utils/currency";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../store/cartStore";
import { cartItem, menu } from "../../types";
import { useFonts  } from "expo-font";
import AppLoading from "expo-app-loading";

interface props {
  data: menu;
}

const Card = ({ data }: props) => {
  const setCart = useSetRecoilState(cartState);
  const { items } = useRecoilValue(cartState);
  const findItem = items.find((item) => item.id === data.id); // buat nyari data di cart recoil apakah ada yang sama dengan data yang pengen ditambah
  // console.log(" item",items);
  // console.log("find item",findItem);

  let longPressTimeOut: NodeJS.Timeout;

  let [fontsLoaded] = useFonts({
    'PTSerifReg' : require('../../../assets/font/PTSerif-Regular.ttf'),
    'PTSerif-Bold' : require('../../../assets/font/PTSerif-Bold.ttf')

  })

  if (!fontsLoaded){
    return <AppLoading/>
  }

  const addItem = () => {
    setCart((cart) => {
      const items = cart.items;
      const findItem = cart.items.find((item) => item.id === data.id); // buat nyari data di cart recoil apakah ada yang sama dengan data yang pengen ditambah
      // console.log(findItem);

      if (!findItem) {
        // kalau semisal gaada menu yang sama kaya di penyimpanan,maka dia akan nambahin baru
        const newItem = {
          id: data.id,
          name: data.name,
          price: data.price,
          total: 1,
        };
        const totalPrice = cart.totalPrice + data.price;
        return { totalPrice, items: [...items, newItem] };
      }

      const updateItem = items.map(
        (
          item // ini kalau semisal ternyata menunya sudah ada di penyimpanan recoilnya maka tinggal nambahin jumlah aja
        ) => (item.id === data.id ? { ...item, total: item.total + 1 } : item)
      );
      const totalPrice = cart.totalPrice + findItem.price;

      return { totalPrice, items: updateItem };
    });
  };

  const decreaseItem = () => {
    setCart((cart) => {
      const items = cart.items;
      const findItem = cart.items.find((item) => item.id === data.id);

      let updateItem: cartItem[] = items;
      let totalPrice = cart.totalPrice;

      if (findItem && findItem.total > 1) {
        updateItem = items.map((item) =>
          item.id === data.id ? { ...item, total: item.total - 1 } : item
        );
        totalPrice -= data.price;
      } else if (findItem && findItem.total === 1) {
        updateItem = items.filter((item) => item.id !== data.id); // disini dia ngefilter kalau semisal datanya ga sama kaya data yang dimasukin/yg pengen dihapus,dia akan masuk ke penyimpanan
        totalPrice -= data.price;
      }

      return { totalPrice, items: updateItem };
    });
  };

  const handleLongPress = (condition: "add" | "delete") => {
    if (condition === "add")
      longPressTimeOut = setInterval(() => {
        addItem();
      }, 100);
    else
      longPressTimeOut = setInterval(() => {
        decreaseItem();
      }, 100);
  };

  const handleLongPressEnd = () => {
    clearInterval(longPressTimeOut);
  };

  return (
    <Box
      hardShadow="1"
      maxWidth="$48"
      minWidth={"$48"}
      // borderColor="$borderLight200"
      borderRadius="$lg"
      // borderWidth="$1"
      overflow="hidden"
      bgColor="$white"
      ml={15}
      mt={5}
      sx={{
        _dark: {
          bg: "$backgroundDark900",
          borderColor: "$borderDark800",
        },
      }}
    >
      <Box>
        <Image
          h={150}
          w="100%"
          source={{
            uri: data.image,
          }}
          alt="image"
        />
      </Box>
      <VStack px="$6" pt="$4" pb="$6">
        <Text
          sx={{
            _dark: { color: "$textLight200" },
            color: "black", // Atur warna teks menjadi hitam
          }}
          size="md"
          fontFamily="PTSerif-Bold"
        >
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </Text>
        <Text
          my="$0.5"
          sx={{
            _dark: { color: "$textLight200" },
          }}
          fontSize="$sm"
        >
          {data.description}
        </Text>
        <Text
          mb="$1.5"
          sx={{
            _dark: { color: "$textLight200" },
            fontWeight: "bold",
            color: "black",
          }}
          fontSize="$xs"
        >
          {currency.format(data.price)}
        </Text>


        {items && findItem ? (
          <ButtonGroup justifyContent="space-between">
            <Button
              onLongPress={() => handleLongPress("delete")}
              onPressOut={handleLongPressEnd}
              onPress={decreaseItem}
              bgColor="white"
              borderWidth="$2"
              borderColor="orange"
              borderRadius={10}
           
            >
              <ButtonText color="orange">-</ButtonText>
            </Button>

            <Text mt={5}>{findItem.total}</Text>

            <Button
              onLongPress={() => handleLongPress("add")}
              onPressOut={handleLongPressEnd}
              onPress={addItem}
              bgColor="white"
              borderWidth="$2"
              borderColor="orange"
              borderRadius={10}
              
            >
              <ButtonText color="orange">+</ButtonText>
            </Button>
          </ButtonGroup>
        ) : (
          <Button onPress={addItem} bgColor="orange" active-bg="#FFA500">
            <ButtonText>Add</ButtonText>
          </Button>
        )}

        {/* <ButtonGroup justifyContent="space-between">
          <Button
            onLongPress={() => handleLongPress("delete")}
            onPressOut={handleLongPressEnd}
            onPress={decreaseItem}
            bgColor="$orange"
            $active-bg="$orange500"
          >
            <ButtonText>-</ButtonText>
          </Button>

          <Button
            onLongPress={() => handleLongPress("add")}
            onPressOut={handleLongPressEnd}
            onPress={addItem}
            bgColor="orange"
            $active-bg="$orange500"
          >
            <ButtonText>+</ButtonText>
          </Button>
        </ButtonGroup> */}
      </VStack>
    </Box>
  );
};

export default Card;

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
import { useSetRecoilState } from "recoil";
import { cartState } from "../../store/cartStore";
import { cartItem } from "../../types";

interface props {
  data: item;
}

const Card = ({ data }: props) => {
  const setCart = useSetRecoilState(cartState);
  let longPressTimeOut : NodeJS.Timeout;

  const addItem = () => {
    setCart((cart) => {
      const items = cart.items;
      const findItem = cart.items.find((item) => item.id === data.id);
      console.log(findItem);

      if (!findItem) {
        const newItem = {
          id: data.id,
          name: data.name,
          price: data.price,
          total: 1,
        };
        const totalPrice = cart.totalPrice + data.price;
        return { totalPrice, items: [...items, newItem] };
      }

      const updateItem = items.map((item) =>
        item.id === data.id ? { ...item, total: item.total + 1 } : item
      );
      const totalPrice = cart.totalPrice + findItem.price;

      return { totalPrice, items: updateItem };
    });
  };

  const decreaseItem = () => {
    setCart((cart) => {
      const items = cart.items;
      const findItem = cart.items.find((item) => item.id === data.id);
      console.log(findItem);

      let updateItem: cartItem[] = items;
      let totalPrice = cart.totalPrice;
      
      if (findItem && findItem.total > 1) {

        updateItem = items.map((item) =>
          item.id === data.id ? { ...item, total: item.total - 1 } : item
        );
        totalPrice -= data.price;

      } else if (findItem && findItem.total === 1) {

        updateItem = items.filter((item) => item.id !== data.id);
        totalPrice -= data.price;
      
      }

      return { totalPrice, items: updateItem };
    });
  };


  const handleLongPress = () => {
    longPressTimeOut = setInterval(() => {
      addItem();
    }, 100); // Ganti angka 100 dengan interval yang diinginkan (dalam milidetik)
  };

  const handleLongPressEnd = () => {
    clearInterval(longPressTimeOut);
  };

  return (
    <Box
      maxWidth="$64"
      minWidth={"$48"}
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      overflow="hidden"
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
            uri: data.img,
          }}
          alt="image"
        />
      </Box>
      <VStack px="$6" pt="$4" pb="$6">
        <Heading
          sx={{
            _dark: { color: "$textLight200" },
          }}
          size="sm"
        >
          {data.name}
        </Heading>
        <Text
          my="$1.5"
          sx={{
            _dark: { color: "$textLight200" },
          }}
          fontSize="$xs"
        >
          {currency.format(data.price)}
        </Text>
        <ButtonGroup justifyContent="space-between">
          <Button onLongPress={(e) => {
            const interval = setInterval(() => {
              
            })
          }} onPress={decreaseItem} bgColor="$red600" $active-bg="$red800">
            <ButtonText>-</ButtonText>
          </Button>

          <Button onLongPress={handleLongPress} onPressOut={handleLongPressEnd}  onPress={addItem}>
            <ButtonText>+</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};
// additional item

export default Card;

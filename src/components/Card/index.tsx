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
import { cartItem, menu } from "../../types";

interface props {
  data: menu;
}

const Card = ({ data }: props) => {
  const setCart = useSetRecoilState(cartState);
  let longPressTimeOut: NodeJS.Timeout;

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
      maxWidth="$48"
      minWidth={"$48"}
      borderColor="$borderLight200"
      borderRadius="$lg"
      borderWidth="$1"
      overflow="hidden"
      bgColor="$white"
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
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default Card;

import { View, Text } from "react-native";
import React from "react";
import { FlatList, HStack, VStack } from "@gluestack-ui/themed";
import Card from "../Card";
import { itemData } from "../../data/item";
import { item } from "../../types/data";

export default function Dashboard() {
  return (
    <VStack p={16}>
      <HStack flexWrap="wrap" gap={"$4"}>
        {itemData.map((item, index) => {
          return item.isAvaible && <Card key={index} data={item} />;
        })}
      </HStack>
    </VStack>
  );
}

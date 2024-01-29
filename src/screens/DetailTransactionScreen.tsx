import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { rootStackParamList } from "../types/rootStackParams";

const DetailTransactionScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: number } }>>();
  return (
    <View>
      <Text>{route.params?.id} DetailTransactionScreen</Text>
    </View>
  );
};

export default DetailTransactionScreen;

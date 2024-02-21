import { View, Text } from "@gluestack-ui/themed";
// import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function SplashScreen() {


  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}

    >
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}

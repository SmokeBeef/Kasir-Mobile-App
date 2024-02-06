import { ActivityIndicator, RefreshControl, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import Card from "../Card";
import { menu, menuResponse } from "../../types";
import { getItem } from "../../utils/storage";
import { FlashList } from "@shopify/flash-list";
import { axiosInterceptor } from "../../utils/axiosInterceptor";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false)
  const [menu, setMenu] = useState<menu[]>([]);

  const BASE_API = process.env.EXPO_PUBLIC_BASE_API || "https://localhost:4000";

  const getMenu = async () => {
    try {
      setLoading(true)
      const token = await getItem("token");
      console.log(token);

      const response = await axiosInterceptor.get<menuResponse>(`${BASE_API}/menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);

      setMenu(response.data.data);
    } catch (error) {
      alert("error");
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <ScrollView 
    refreshControl={<RefreshControl refreshing={loading} onRefresh={getMenu} />}
    w={"auto"} p={"$4"} gap={"$4"}  >
      <HStack flexWrap="wrap" gap={"$4"} mb={30}>

        {menu.map((value, index) =>
          <Card key={value.id} data={value} />
        )}

      </HStack>
    </ScrollView>

  );
}

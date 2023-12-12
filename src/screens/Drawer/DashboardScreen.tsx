import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView, VStack } from "@gluestack-ui/themed";
import SideBarCart from "../../components/dashboard/SideBarCart";
import Dashboard from "../../components/dashboard";
import { cart, item } from "../../types";
import { RecoilRoot } from "recoil";

export default function DashboardScreen() {
  return (
    <RecoilRoot >
      <VStack w={"$full"} flexDirection="row" justifyContent="space-between">
        <ScrollView>
          <Dashboard />
        </ScrollView>
        <SideBarCart />
      </VStack>
    </RecoilRoot>
  );
}

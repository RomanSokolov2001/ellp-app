import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import DiscountsScreen from "./DiscountsScreen";
import ViewDiscountScreen from "./ViewDiscountScreen";

const discountsStack = createNativeStackNavigator();

export default function DiscountsStackScreen() {
  return (
    <discountsStack.Navigator>
      <discountsStack.Screen
        name="Discounts"
        component={DiscountsScreen}
        options={{ headerShown: false  }}
      />
      <discountsStack.Screen
        name="ViewDiscount"
        component={ViewDiscountScreen}
      />
    </discountsStack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import DiscountsScreen from "./DiscountsScreen";
import ViewContentScreen from "../preview/viewContentScreen";

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
        name="ViewContentScreen"
        component={ViewContentScreen}
      />
    </discountsStack.Navigator>
  );
}

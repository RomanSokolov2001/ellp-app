import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscountsScreen from "../screens/discounts/DiscountsScreen";
import FavouriteDiscounts from "../screens/profile/FavouriteDiscounts";
import RootStackParamList from "../types/Navigation";
import JoinUs from "../screens/profile/JoinUs";
import ViewContentScreen from "../screens/preview/viewContentScreen";

const discountsStack = createNativeStackNavigator<RootStackParamList>();

export default function DiscountsStackScreen() {
  return (
    <discountsStack.Navigator>
      <discountsStack.Screen
        name="DiscountsScreen"
        component={DiscountsScreen}
        options={{ headerShown: false }}
      />
      <discountsStack.Screen
        name="ViewContentScreen"
        component={ViewContentScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <discountsStack.Screen
        name="FavouriteDiscounts"
        component={FavouriteDiscounts}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <discountsStack.Screen
        name="JoinUs"
        component={JoinUs}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </discountsStack.Navigator>
  );
}

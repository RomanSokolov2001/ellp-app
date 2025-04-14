import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../screens/events/EventsScreen";
import RootStackParamList from "../types/Navigation";
import ViewContentScreen from "../screens/preview/viewContentScreen";

const eventsStack = createNativeStackNavigator<RootStackParamList>();

export default function DiscountsStackScreen() {
  return (
    <eventsStack.Navigator>
      <eventsStack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerShown: false }}
      />
      <eventsStack.Screen
        name="ViewContentScreen"
        component={ViewContentScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
    </eventsStack.Navigator>
  );
}

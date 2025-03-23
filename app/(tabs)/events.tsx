import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../screens/events/EventsScreen";
import ViewEventScreen from "../screens/events/ViewEventScreen";
import RootStackParamList from "../types/Navigation";

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
        name="ViewEventScreen"
        component={ViewEventScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
    </eventsStack.Navigator>
  );
}

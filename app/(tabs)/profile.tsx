import JoinUs from "@/app/screens/profile/JoinUs";
import Membership from "@/app/screens/profile/Membership";
import Profile from "@/app/screens/profile/Profile";
import PaymentScreen from "../screens/profile/PaymentScreen";
import InfoPage from "../screens/profile/InfoPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileSettings from "../screens/profile/ProfileSettings";
import FavouriteDiscounts from "../screens/profile/FavouriteDiscounts";
import RootStackParamList from "../types/Navigation";

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <ProfileStack.Screen
        name="Membership"
        component={Membership}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ProfileStack.Screen
        name="JoinUs"
        component={JoinUs}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ProfileStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ProfileStack.Screen
        name="FavouriteDiscounts"
        component={FavouriteDiscounts} // Ensure this component exists
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ProfileStack.Screen
        name="InfoPage"
        component={InfoPage}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </ProfileStack.Navigator>
  );
}

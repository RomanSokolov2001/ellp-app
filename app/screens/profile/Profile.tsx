import { View, Text, Image, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import SmallButtonComponent from "@/components/SmallButtonComponent";
import MediumButtonComponent from "@/components/MediumButtonComponent";
import MenuItem from "@/components/MenuItem";
import { useRouter } from "expo-router";
import CustomAlert from "@/components/CustomAlert";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";
import { RootState } from "@/app/redux/store";
import RootStackParamList from "@/app/types/Navigation";
import { setUser } from "@/app/redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const Profile = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.userSlice.user); // Fetch user data from Redux
  const dispatch = useDispatch();
  const router = useRouter();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = () => {
    setAlertVisible(true);
  };

  const handleConfirmLogout = async () => {
    // Clear the user from Redux store
    dispatch(setUser(null));
    // Optionally clear any local storage or async storage items related to the user
    try {
      // Clear any other local storage items you might have related to the user (e.g., onboarding, token)
      await AsyncStorage.removeItem("@viewedOnboarding");
      await AsyncStorage.removeItem("@user");
      console.log("Logged Out and Data Cleared");
      router.replace("/(auth)/sign-in"); // Redirect to sign-in screen
    } catch (error) {
      console.log("Error during logout:", error);
    }
    setAlertVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <View style={styles.profileImageContainer}>
          {false ? (
            <Image
              source={{ uri: '' }} // Assuming profileImage is a URI or base64 string
              style={styles.profileImage}
            />
          ) : (
            <Ionicons name="person" size={50} />
          )}
        </View>

        <View style={{ alignItems: "center", margin: 20 }}>
          <Text style={styles.username}>{`${userData?.firstName} ${userData?.lastName}` || "Unknown User"}</Text>
          <Text style={styles.email}>{userData?.email || "Unknown Email"}</Text>
        </View>

        <MediumButtonComponent
          title="View Membership"
          onPress={() => navigation.navigate("Membership")}
        />
      </View>

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={<Ionicons name="settings" size={24} color={colors.secondary} />}
        text="Settings"
        onPress={() => navigation.navigate("ProfileSettings")}
      />
      <MenuItem
        icon={<Ionicons name="heart" size={24} color={colors.secondary} />}
        text="Favorites"
        onPress={() => navigation.navigate("FavouriteDiscounts")}
      />

      <View style={{ height: 1, backgroundColor: colors.grey_background }} />

      <MenuItem
        icon={<Ionicons name="information" size={24} color={colors.secondary} />}
        text="Information"
        onPress={() => navigation.navigate("InfoPage")}
      />

      <View>
        <MenuItem
          icon={<Ionicons name="log-out" size={24} color={colors.secondary} />}
          text="Logout"
          textColor={colors.red_text}
          onPress={handleLogout}
          showArrow={false}
        />
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onAction={handleConfirmLogout}
          title="Logout"
          message="Are you sure you want to logout?"
          actionText="Logout"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.fitness_tab,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 40,
  },
  username: {
    fontFamily: "Lexend-Medium",
    fontSize: 20,
  },
  email: {
    fontFamily: "Lexend-Light",
    color: colors.text,
    fontSize: 16,
  },
});

export default Profile;

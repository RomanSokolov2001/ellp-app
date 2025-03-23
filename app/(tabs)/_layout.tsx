import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import colors from "@/assets/colors/colors";

const { width } = Dimensions.get("window");

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    "Lexend-Thin": require("../../assets/fonts/Lexend-Thin.ttf"),
    "Lexend-ExtraLight": require("../../assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("../../assets/fonts/Lexend-Light.ttf"),
    "Lexend-Regular": require("../../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Medium": require("../../assets/fonts/Lexend-Medium.ttf"),
    "Lexend-SemiBold": require("../../assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Bold": require("../../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("../../assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-Black": require("../../assets/fonts/Lexend-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}
              <Ionicons
                name="calendar-clear-outline"
                size={32}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 12,
              }}
            >
              Events
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="discounts"
        options={{
          title: "Discounts",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}

              <FontAwesome6
                name="percentage"
                size={30}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 13,
              }}
            >
              Discounts
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }: any) => (
            <View style={focused ? styles.shadowEffect : null}>
              {focused && <View style={styles.activeBar} />}
              <Octicons
                name="person"
                size={32}
                color={focused ? colors.black : colors.btm_nav_unselected}
              />
            </View>
          ),
          tabBarLabel: ({ focused }: any) => (
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                color: focused ? colors.black : colors.btm_nav_unselected,
                fontSize: 12,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

// const styles = StyleSheet.create({
//   shadowEffect: {
//     shadowColor: colors.secondary,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 50,
//     elevation: 10,
//     backgroundColor: "rgba(0, 122, 255, 0.17)",
//     borderRadius: 50,
//     padding: 1,
//   },
//   activeBar: {
//     position: "absolute",
//     top: -8,
//     left: -3,
//     width: "120%",
//     height: 8,
//     backgroundColor: colors.fitness_tab,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//   },
// });

const styles = StyleSheet.create({
  shadowEffect: {
    ...Platform.select({
      ios: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 50, // Reduce radius for mobile consistency
      },
      android: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      web: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 50,
      },
    }),
    backgroundColor: "rgba(0, 122, 255, 0.17)",
    borderRadius: 20,
    padding: 1,
  },
  activeBar: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: -8,
        left: "50%", // Start in the center
        transform: [{ translateX: -15 }], // Offset to center the active bar
        width: 30, // Fixed width for consistency across tabs
        height: 8,
        backgroundColor: colors.fitness_tab,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      android: {
        position: "absolute",
        top: -8,
        left: -3, // Start in the center
        width: 30, // Fixed width for consistency across tabs
        height: 8,
        backgroundColor: colors.fitness_tab,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    }),
  },
});

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function TabLayout() {
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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}

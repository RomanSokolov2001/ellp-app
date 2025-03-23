import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import colors from "@/assets/colors/colors";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

interface OnboardingItemProps {
  item: {
    image: any;
    title: string;
    description: string;
    id: string;
  };
}

const OnboardingItem = ({ item }: OnboardingItemProps): JSX.Element => {
  const { width, height } = useWindowDimensions();

  const [loaded, error] = useFonts({
    "Lexend-Light": require("../../assets/fonts/Lexend-Light.ttf"),
    "Lexend-SemiBold": require("../../assets/fonts/Lexend-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return (
      <View
        style={{
          width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.black} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      className="flex items-center"
      style={{
        width,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 30,
      }}
    >
      <Image
        source={item.image}
        className="rounded-lg"
        style={{ width: "100%", height: height * 0.45 }}
        resizeMode="cover"
      />
      <View
        style={{ alignItems: "center", marginTop: 20, maxWidth: width * 0.9 }}
      >
        <Text
          style={{
            fontFamily: "Lexend-SemiBold",
            color: colors.black,
            fontSize: 24,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "Lexend-Light",
            color: colors.black,
            fontSize: 16,
            textAlign: "center",
            paddingHorizontal: 10,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

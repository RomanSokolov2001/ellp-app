import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const logo = require("../../assets/images/ellp-logo.png");

const LogoPage = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInOut = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    fadeInOut();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity }]}
        resizeMode="contain"
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.65,
    height: height * 0.25,
  },
});

export default LogoPage;

import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: colors.primary,
    fontFamily: "Lexend-SemiBold",
  },
});

export default LoadingScreen;

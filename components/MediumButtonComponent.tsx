import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import colors from "@/assets/colors/colors";

interface SmallButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const SmallButton: React.FC<SmallButtonProps> = ({ title, onPress, style }) => {
  const progressRef = useRef(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.6}
      ref={progressRef}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.tertiary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Lexend-Light",
  },
});

export default SmallButton;

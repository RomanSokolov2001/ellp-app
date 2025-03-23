import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import colors from "@/assets/colors/colors";

interface SkipButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const SkipButton: React.FC<SkipButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 18,
    fontFamily: "Lexend-Regular",
  },
});

export default SkipButton;

import React, { useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from "react-native";
import colors from "@/assets/colors/colors";

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const { width, height } = Dimensions.get("window");

const LargeButton: React.FC<LargeButtonProps> = ({ title, onPress, style }) => {
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width * 0.8,
    height: Math.max(height * 0.075, 50),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Lexend-Medium",
  },
});

export default LargeButton;

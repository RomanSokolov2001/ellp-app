import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "@/assets/colors/colors";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  textColor?: string;
  showArrow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  onPress,
  textColor = colors.text,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      {showArrow && (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 18,
            backgroundColor: colors.grey_background_transparent,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <FontAwesome5 name="arrow-right" size={16} color={colors.black} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grey_background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: "Lexend-Light",
  },
});

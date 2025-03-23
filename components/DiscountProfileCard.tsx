import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/assets/colors/colors";
import images from "@/utils/imageMapping";

type DiscountFavouriteCardProps = {
  imageUrl: string;
  location: string;
  title: string;
  discount: string;
  category?: string;
  onPress: () => void;
};

const DiscountProfileCard: React.FC<DiscountFavouriteCardProps> = ({
  imageUrl,
  location,
  title,
  discount,
  onPress,
}) => {
  const resolvedImage = images[imageUrl];

  return (
    <View style={styles.card}>
      <Image source={resolvedImage} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.discountRow}>
          <FontAwesome
            name="percent"
            size={16}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.discountText}>{discount}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>See more details</Text>
        </TouchableOpacity>
      </View>
      <FontAwesome
        name="heart"
        size={24}
        color="black"
        style={styles.heartIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 120,
    height: "100%",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 16,
  },
  location: {
    fontSize: 10,
    color: colors.btm_nav_unselected,
    fontFamily: "Lexend-Regular",
  },
  title: {
    fontSize: 18,
    fontFamily: "Lexend-Regular",
    color: colors.text,
    marginVertical: 4,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    paddingRight: 6,
  },
  discountText: {
    fontSize: 14,
    color: colors.btm_nav_unselected,
    fontFamily: "Lexend-Regular",
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Lexend-Medium",
    fontSize: 14,
  },
  heartIcon: {
    marginLeft: 8,
    marginBottom: 80,
  },
});

export default DiscountProfileCard;

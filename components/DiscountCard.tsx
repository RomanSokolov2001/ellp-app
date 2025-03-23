import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/assets/colors/colors";
import images from "@/utils/imageMapping";

type DiscountCardProps = {
  imageUrl: string;
  location: string;
  title: string;
  discount: string;
  category?: string;
  onPress: () => void;
  onToggleFavorite: (isFavorite: boolean) => void;
  isFavorite?: boolean;
};

const DiscountCard: React.FC<DiscountCardProps> = ({
  imageUrl,
  location,
  title,
  discount,
  onPress,
  onToggleFavorite,
  isFavorite,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onToggleFavorite(newFavoriteState);
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const resolvedImage = images[imageUrl];

  return (
    <View style={styles.card}>
      {/* Image Background */}
      <ImageBackground
        source={resolvedImage}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />

      {/* Content below the image */}
      <View style={styles.content}>
        {/* Location and Heart Icon */}
        <View style={styles.header}>
          <Text style={styles.location}>{location}</Text>
          <TouchableOpacity onPress={() => toggleFavorite()}>
            <FontAwesome
              name={favorite ? "heart" : "heart-o"}
              size={20}
              color={favorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Title and Discount */}
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

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 120,
    width: "100%",
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    width: "80%",
    color: colors.btm_nav_unselected,
    fontFamily: "Lexend-Regular",
  },
  title: {
    fontSize: 18,
    fontFamily: "Lexend-Regular",
    color: "#333",
    marginBottom: 4,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 4,
  },
  discountText: {
    fontSize: 14,
    color: colors.btm_nav_unselected,
    marginRight: 12,
    marginLeft: 4,
    fontFamily: "Lexend-Regular",
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 2,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Lexend-Medium",
    fontSize: 14,
  },
});

export default DiscountCard;

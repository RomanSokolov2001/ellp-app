import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@/assets/colors/colors";

type EventCardProps = {
  imageUrl: string;
  date: string;
  location: string;
  title: string;
  description: string;
  onPress: () => void;
};

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  date,
  location,
  title,
  description,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      ></ImageBackground>
      <View style={styles.content}>
        <Text style={styles.date}>
          {date}, {location}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View Event</Text>
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
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  date: {
    fontSize: 14,
    color: colors.btm_nav_unselected,
    marginBottom: 6,
    fontFamily: "Lexend-Regular",
  },
  title: {
    fontSize: 20,
    fontFamily: "Lexend-Regular",
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Regular",
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Lexend-Medium",
    fontSize: 16,
  },
});

export default EventCard;

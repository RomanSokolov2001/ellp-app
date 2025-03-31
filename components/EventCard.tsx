import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image
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
  title,
  description,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
      >
        <View style={styles.content}>
            <Text style={styles.date}>
              Posted: {date}
            </Text>

            <Text style={styles.title}>{title}</Text>
            
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>View event</Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 350,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
  },
  image:{
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    padding: 16,
    backgroundColor: "#ffff",
  },
  date: {
    fontSize: 12,
    color: colors.btm_nav_unselected,
    marginBottom: 4,
    fontFamily: "Lexend-Regular",
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    fontFamily: "Lexend-Regular",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignSelf: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Lexend-Medium",
    fontSize: 14,
  },
});

export default EventCard;

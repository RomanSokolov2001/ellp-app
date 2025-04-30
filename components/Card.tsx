import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import colors from "@/assets/colors/colors";

type CardProps = {
  imageUrl: string;
  title: string;
  date?: string;
  inStock?: boolean;
  onPress: () => void;
};

export default function Card(props:CardProps){
  return (
    <View style={styles.card}>
        {/* thumbnail */}
        <Image
          source={{ uri: props.imageUrl }}
          style={styles.image}
        />

        {/* Sold out indicator */}
        {!props.inStock && (
          <View style={styles.sold}>
          <Text style={styles.soldText}>Sold Out</Text>
        </View>
        )}
  
        {/* card footer */} 
        <View style={styles.cardFooter}>
          {props.date && props.date !== "/" && (
            <Text style={styles.date}>
            {props.date}
            </Text>
          )}

          <Text style={styles.title}>{require('he').decode(props.title)}</Text>
          
          <TouchableOpacity style={styles.button} onPress={props.onPress}>
              <Text style={styles.buttonText}>View event</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 400,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  image:{
    width: "100%",
    flex: 1,
    objectFit: "cover",
  },
  cardFooter: {
    padding: 16,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
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
  sold: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  soldText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
});
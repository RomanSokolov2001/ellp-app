import RootStackParamList from "@/app/types/Navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";
import colors from "@/assets/colors/colors";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

type ViewEventScreenProps = StackScreenProps<
  RootStackParamList,
  "ViewEventScreen"
>;

export default function ViewEventScreen({
  route,
  navigation,
}: ViewEventScreenProps) {
  const { event } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  const openWebPage = () => {
    if (event.webPageUrl)
      Linking.openURL(event.webPageUrl).catch((err) =>
        console.error("Failed to open given URL:", err)
      );
  };

  // Get the image height based on the screen width
  const screenWidth = Dimensions.get("window").width;
  const [imageHeight, setImageHeight] = useState(200);

  useEffect(() => {
    if (event.imageUrl) {
      Image.getSize(
        event.imageUrl,
        (width, height) => {
          const ratio = height / width;
          setImageHeight(screenWidth * ratio);
        },
        (error) => {
          console.error("Image load error:", error);
        }
      );
    }
  }, [event.imageUrl]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Image */}
      <View>
        <Image
          source={{ uri: event.imageUrl }}
          style={{ width: "100%", height: imageHeight }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{event.title}</Text>

      {/* Sold out badge */}
      {!event.stock && (
        <View style={styles.sold}>
          <Text style={styles.soldText}>Sold Out</Text>
        </View>
      )}

      <Text style={styles.description}>{event.description}</Text>

      {/* Event Date */}
      {event.date && (
        <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="event" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.date}</Text>
        </View>
      </View>
      )}

      {/* Location */}
      {event.location && (
        <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="place" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.location}</Text>
        </View>
      </View>
      )}

      {/* Price */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="euro" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.price} euros</Text>
          {/* <Text style={styles.infoText}>
            {event.priceMembers} euros for members
          </Text> */}
        </View>
      </View>

      {/* Webpage Info */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="info" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>
            Buy the tickets on our <Text style={styles.linkText} onPress={openWebPage}>webpage</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: "Lexend-SemiBold",
    marginBottom: 16,
    color: colors.text,
  },
  description: {
    fontSize: 16,
    fontFamily: "Lexend-Light",
    marginBottom: 16,
    color: colors.text,
  },
  rowInfoContainer: {
    flexDirection: "row",
    margin: 6,
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey_background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoColumnContainer: {
    width: "100%",
    display: "flex",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Lexend-ExtraLight",
  },
  infoTextMain: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  linkText: {
    color: colors.primary,
    fontFamily: "Lexend-SemiBold",
  },
  sold: {
    position: "absolute",
    top: 16,
    right: 16,
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

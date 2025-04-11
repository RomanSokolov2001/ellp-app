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
      {/* header */}
      <View style={styles.previewHeader}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.category}>{event.category}</Text>
        
        {/* Sold out badge */}
        {!event.stock && (
          <View style={styles.sold}>
            <Text style={styles.soldText}>Sold Out</Text>
          </View>
        )}
      </View>

      {/* Event Image */}
      <View>
        <Image
          source={{ uri: event.imageUrl }}
          style={ [styles.imagePreview, {height: imageHeight}] }
        />
      </View>

      <View style={styles.infoContainer}>
        {/* Event Date */}
        {event.date && (
        <View style={styles.singleInfo}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="event" size={28} color={colors.secondary} />
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextMain}>{event.date}</Text>
          </View>
        </View>
        )}

        {/* Location */}
        {event.location && (
          <View style={styles.singleInfo}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="place" size={28} color={colors.secondary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextMain}>{event.location}</Text>
          </View>
        </View>
        )}

        {/* Price */}
        <View style={styles.singleInfo}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="euro" size={28} color={colors.secondary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextMain}>{event.price} euros</Text>
            {/* <Text style={styles.infoText}>
              {event.priceMembers} euros for members
            </Text> */}
          </View>
        </View>

        {/* Webpage Info */}
        <View style={styles.singleInfo}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="info" size={28} color={colors.secondary} />
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextMain}>
              Buy the tickets on our <Text style={styles.link} onPress={openWebPage}>webpage</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{event.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
    backgroundColor: colors.white,
  },
  previewHeader: {
    alignItems: "center",
    gap: 8,
  },
  sold: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  soldText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  title: {
    textAlign: "center",
    fontFamily: "Lexend-SemiBold",
    fontSize: 26,
  },
  category: {
    fontSize: 16,
    fontFamily: "Lexend-SemiBold",
    color: colors.primary,
  },
  imagePreview:{
    width: "100%",
    borderRadius: 16,
  },
  infoContainer:{
    gap: 8,
  },
  singleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey_background,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Lexend-ExtraLight",
  },
  infoTextMain: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  link: {
    color: colors.primary,
    fontFamily: "Lexend-SemiBold",
  },
  description: {
    fontSize: 16,
    fontFamily: "Lexend-Light",
    marginBottom: 16,
    color: colors.text,
  }
});

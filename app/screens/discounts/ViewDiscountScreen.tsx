import { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/assets/colors/colors";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ViewDiscountScreen">;

const ViewDiscountScreen = ({ route, navigation }: Props) => {
  const { discount } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  // Get the image height based on the screen width
  const screenWidth = Dimensions.get("window").width;
  const [imageHeight, setImageHeight] = useState(200);
  useEffect(() => {
      if (discount.imageUrl) {
        Image.getSize(
          discount.imageUrl,
          (width, height) => {
            const ratio = height / width;
            setImageHeight(screenWidth * ratio);
          },
          (error) => {
            console.error("Image load error:", error);
          }
        );
      }
  }, [discount.imageUrl]);

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.previewHeader}>
          <Text style={styles.title}>{discount.title}</Text>
          <Text style={styles.category}>{discount.industry}</Text>
        </View>

        {/* Logo of the collaborator */}
        <View>
          <Image
            source={{ uri: discount.imageUrl }}
            style={ [styles.imagePreview, {height: imageHeight}] }
          />
        </View>

        <TouchableOpacity
        onPress={() => {
          const locationQuery = encodeURIComponent(discount.location);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
          Linking.openURL(mapsUrl).catch((err) =>
            console.error("Failed to open maps URL:", err)
          );
        }}
        >
          <View style={styles.singleInfo}>
            <View style={styles.iconCircle}>
              <MaterialIcons
                name="location-on"
                size={28}
                color={colors.secondary}
              />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTextMain, { color: colors.primary }]}>
                {discount.location}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.singleInfo}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="percent" size={28} color={colors.secondary} />
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextMain}>{discount.discount}</Text>
            <Text style={styles.infoText}>*With the ELLP Membership</Text>
          </View>
        </View>

        {/* Membership reminder */}
        <View style={styles.extraInfoContainer}>
          <Text style={{ textAlign: "left", fontSize: 15 }}>
            Don't have a membership card yet? Sign up today and start enjoying these exclusive benefits at our partner location!
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("JoinUs")}>
            <Text style={styles.link}>Join us here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewDiscountScreen;

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
  },
  extraInfoContainer: {
    marginTop: 10,
    marginBottom: 20,
  }
});

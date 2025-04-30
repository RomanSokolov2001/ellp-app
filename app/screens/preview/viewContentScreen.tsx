import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useLayoutEffect, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import colors from "@/assets/colors/colors";
import { EventData } from "../events/EventsScreen";

type ViewContentRouteProp = RouteProp<RootStackParamList, "ViewContentScreen">;

const ViewContentScreen = () => {
  const route = useRoute<ViewContentRouteProp>();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ title: "" });
  }, [navigation]);

  const { data } = route.params;

  //render flags
  const isEvent = data instanceof EventData;
  const isDiscount = !isEvent;

  // Calculate image height
  const screenWidth = Dimensions.get("window").width;
  const [imageHeight, setImageHeight] = useState(200);
  useEffect(() => {
    if (data.imageUrl) {
      Image.getSize(
        data.imageUrl,
        (width, height) => {
          const ratio = height / width;
          setImageHeight(screenWidth * ratio);
        },
        (error) => {
          console.error("Image load error:", error);
        }
      );
    }
  }, [data.imageUrl]);

  // Open the webpage URL in the default browser
  const openWebPage = () => {
    if (isEvent && data.imageUrl) {
      Linking.openURL(data.productUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  // Open Google Maps with the location
  const openMap = (loc : string) => {
    if (data.location) {
      const locationQuery = encodeURIComponent(loc);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
      Linking.openURL(mapsUrl).catch((err) =>
        console.error("Failed to open maps URL:", err)
      );
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.previewHeader}>
          <Text style={styles.title}>{require("he").decode(data.title)}</Text>
          <Text style={styles.category}>
            {isEvent ? require("he").decode(data.category) : require("he").decode(data.industry.name)}
          </Text>

          {isEvent && !data.inStock && (
            <View style={styles.sold}>
              <Text style={styles.soldText}>Sold Out</Text>
            </View>
          )}
        </View>

        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: data.imageUrl }}
            style={ [styles.imagePreview, { height: imageHeight }] }
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          {/* Event Date */}
          {isEvent && data.date && (
            <View style={styles.singleInfo}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="event"
                  size={28}
                  color={colors.secondary}
                />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextMain}>{data.date}</Text>
              </View>
            </View>
          )}

          {/* Location */}
          {data.location && (
            <View style={styles.singleInfo}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="place"
                  size={28}
                  color={colors.secondary}
                />
              </View>

              <View style={styles.infoTextContainer}>
                {data.location.map((loc:string, i:number) => (
                  <TouchableOpacity
                  onPress={()=>{openMap(loc)}}
                  key={loc}>
                    <Text style={[styles.infoTextMain, styles.linkText, { marginBottom: i < data.location.length - 1 ? 8 : 0 }]}>
                      {loc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Price or Discount */}
          {isEvent && data.price && (
            <View style={styles.singleInfo}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="euro"
                  size={28}
                  color={colors.secondary}
                />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextMain}>{data.price} euros</Text>
              </View>
            </View>
          )}

          {isDiscount && data.discount && (
            <View style={styles.singleInfo}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="percent"
                  size={28}
                  color={colors.secondary}
                />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextMain}>{data.discount}</Text>
                <Text style={styles.infoText}>*With the ELLP Membership</Text>
              </View>
            </View>
          )}

          {/* Web page */}
          {isEvent && data.imageUrl && (
            <View style={styles.singleInfo}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="info"
                  size={28}
                  color={colors.secondary}
                />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTextMain}>
                  Buy the tickets on our{" "}
                  <Text style={styles.link} onPress={openWebPage}>
                    webpage
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Description */}
        {isEvent && data.description && (
          <Text style={styles.description}>{data.description}</Text>
        )}

        {/* Extra info for discounts */}
        {isDiscount && (
          <View style={styles.extraInfoContainer}>
            <Text style={{ textAlign: "left", fontSize: 15 }}>
              Don't have a membership card yet? Sign up today and start enjoying
              these exclusive benefits at our partner location!
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("JoinUs")}>
              <Text style={styles.link}>Join us here!</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ViewContentScreen;

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
  imageWrapper: {
    borderRadius: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: colors.white, // to ensure the background is white for PNGs
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 16,
  },  
  infoContainer: {
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
  linkText: {
    color: colors.primary,
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
  },
});

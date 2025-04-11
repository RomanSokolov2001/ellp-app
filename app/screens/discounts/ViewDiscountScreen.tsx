import { useLayoutEffect } from "react";
import {
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/assets/colors/colors";
import RootStackParamList from "@/app/types/Navigation";
import images from "@/utils/imageMapping";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ViewDiscountScreen">;

const ViewDiscountScreen = ({ route, navigation }: Props) => {
  const { discount } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
    });
  }, [navigation]);

  const handleOpenMaps = () => {
    Linking.openURL(discount.mapsUrl).catch((err) =>
      console.error("Failed to open maps URL:", err)
    );
  };

  const resolvedImage = images[discount.imageUrl];

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View style={styles.container}>
        {/* Logo of the collaborator */}
        <ImageBackground
          source={resolvedImage}
          style={styles.discountLogo}
          imageStyle={{ borderRadius: 30, resizeMode: "cover" }}
        />

        <Text style={styles.title}>{discount.title}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{discount.category}</Text>
        </View>
        <View style={styles.rowInfoContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="location-on"
              size={28}
              color={colors.secondary}
            />
          </View>
          <View style={styles.infoColumnContainer}>
            <Text style={styles.infoTextMain}>{discount.locationCity}</Text>
            <Text style={styles.infoText}>
              {discount.locationStreet}, {discount.locationPostalCode}
            </Text>
          </View>
        </View>
        <View style={styles.rowInfoContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="percent" size={28} color={colors.secondary} />
          </View>
          <View style={styles.infoColumnContainer}>
            <Text style={styles.infoTextMain}>{discount.discount}</Text>
            <Text style={styles.infoText}>With the ELLP Membership</Text>
          </View>
        </View>

        {/* Map */}
        <TouchableOpacity onPress={handleOpenMaps}>
          <View style={styles.rowInfoContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="map" size={28} color={colors.secondary} />
            </View>
            <View style={styles.infoColumnContainer}>
              <Text style={styles.infoTextMain}>Check where it is!</Text>
              <Text style={styles.infoText}>Open in Maps</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Event Description */}
        <View 
          style={{
            marginTop: 30,
          }}>
          <Text style={styles.infoText}>
            {discount.description}
          </Text>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 20,
              marginTop: 30,
            }}
          />
        </View>

        {/* Extra info */}
        <View style={styles.extraInfoContainer}>
          <Text style={{ textAlign: "left", fontSize: 15 }}>
            Don't have a membership card yet? Sign up today and start enjoying
            these exclusive benefits at our partner location!
            <Text
              onPress={() => navigation.navigate("JoinUs")}
              style={styles.link}
            >
              {" "}
              Join us here!
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewDiscountScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 32,
  },
  discountLogo: {
    width: "100%",
    height: 180,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Lexend-SemiBold",
    fontSize: 26,
    marginTop: 15,
  },
  iconContainer: {
    padding: 12,
    backgroundColor: colors.grey_background,
    borderRadius: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  rowInfoContainer: {
    flexDirection: "row",
    alignContent: "center",
    paddingHorizontal: 15,
    paddingLeft: 10,
    paddingVertical: 10,
    gap: 10,
  },
  infoColumnContainer: {
    alignContent: "center",
    justifyContent: "center",
    gap: 3,
    marginRight: 20,
  },
  infoTextMain: {
    fontSize: 16,
    fontFamily: "Lexend-Medium",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Lexend-Light",
  },
  categoryContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    paddingTop: 4,
    fontFamily: "Lexend-SemiBold",
    color: colors.primary,
  },
  extraInfoContainer: {
    marginTop: 10,
    fontFamily: "Lexend-Regular",
    marginBottom: 20,
  },
  link: {
    color: colors.primary,
    fontFamily: "Lexend-SemiBold",
  },
});

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
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useLayoutEffect } from "react";

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Image */}
      <ImageBackground
        source={{ uri: event.imageUrl }}
        style={styles.eventImage}
      />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>

      {/* Event Date */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="event" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.date}</Text>
          <Text style={styles.infoText}>
            {event.startTime}
            {event.endTime ? ` - ${event.endTime}` : ""}
          </Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="place" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.location}</Text>
        </View>
      </View>

      {/* Price */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="euro" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>{event.price} euros</Text>
          <Text style={styles.infoText}>
            {event.priceMembers} euros for members
          </Text>
        </View>
      </View>

      {/* Webpage Info */}
      <View style={styles.rowInfoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="info" size={28} color={colors.secondary} />
        </View>
        <View style={styles.infoColumnContainer}>
          <Text style={styles.infoTextMain}>
            See the event to buy tickets on our webpage:
            <Text style={styles.linkText} onPress={openWebPage}>
              {" here "}
            </Text>
          </Text>
          <Text style={styles.infoText}>See you there!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  eventImage: {
    width: "100%",
    height: 180,
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: "Lexend-SemiBold",
    marginBottom: 10,
    textAlign: "center",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    fontFamily: "Lexend-Light",
    marginBottom: 20,
    textAlign: "center",
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
    padding: 10,
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
});

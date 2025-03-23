import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const InfoPage = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About us",
      headerBackButtonDisplayMode: "minimal",
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={stylesInfo.container}>
      <Image
        source={require("../../../assets/images/ellp-logo.png")}
        style={{ width: width * 0.65, height: height * 0.25 }}
        resizeMode="contain"
      />
      <Text style={stylesInfo.titleText}>What is Erasmus Life Las Palmas?</Text>
      <Text style={stylesInfo.bodyText}>
        Erasmus Life Las Palmas (ELLP) is your ultimate guide to
        living,studying, and enjoying life on the island. We are dedicated to
        creating unforgettable experiences for Erasmus students and
        international visitors by organizing events, trips, and parties. From
        island tours to social events, we’re here to make your time in Gran
        Canaria amazing.
      </Text>
      <Text style={stylesInfo.titleText}>What is ELLP Membership?</Text>
      <Text style={stylesInfo.bodyText}>
        The ELLP Membership unlocks a world of exclusive benefits. As a member,
        you’ll get access to special discounts at local businesses, entry to our
        top events at reduced rates, and a variety of perks around the island.
        It’s the perfect way to enhance your Erasmus adventure while saving
        money!{" "}
        <Text style={{ fontFamily: "Lexend-Medium" }}>
          Unlock the Membership
          <Text
            style={{ color: colors.secondary }}
            onPress={() => navigation.navigate("JoinUs")}
          >
            {" "}
            here{" "}
          </Text>
        </Text>
        .
      </Text>
      <Text style={stylesInfo.titleText}>How to Reach Us</Text>
      <Text style={stylesInfo.bodyText}>
        <Text style={{ fontFamily: "Lexend-Regular" }}>
          We’re always here to help!
        </Text>{" "}
        You can contact us through the following channels:
      </Text>

      <View style={{ alignItems: "flex-start", width: "90%" }}>
        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/gmail-logo.png")}
            style={stylesInfo.icon}
          />
          <Text style={stylesInfo.contactText}>
            erasmuslifelaspalmas@gmail.com
          </Text>
        </View>

        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/instagram-logo.png")}
            style={stylesInfo.icon}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/erasmuslifelaspalmas/")
            }
          >
            <Text style={stylesInfo.linkText}>@erasmuslifelaspalmas</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/facebook-logo.png")}
            style={stylesInfo.icon}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/erasmuslifelaspalmas")
            }
          >
            <Text style={stylesInfo.linkText}>Erasmus Life Las Palmas</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/tiktok-image.png")}
            style={stylesInfo.icon}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.tiktok.com/@erasmuslifelaspalmas")
            }
          >
            <Text style={stylesInfo.linkText}>@erasmuslifelaspalmas</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/linkedin-logo.png")}
            style={stylesInfo.icon}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/company/international-students-life-las-palmas-association/"
              )
            }
          >
            <Text style={stylesInfo.linkText}>
              International Students Life Las Palmas {"\n"}Association
            </Text>
          </TouchableOpacity>
        </View>

        <View style={stylesInfo.contactRow}>
          <Image
            source={require("../../../assets/images/social-media-logos/web-link.png")}
            style={stylesInfo.icon}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL("https://erasmuslifelaspalmas.com/")}
          >
            <Text style={stylesInfo.linkText}>erasmuslifelaspalmas.com</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={stylesInfo.bodyText}>
        Feel free to reach out with any questions or to stay updated on all our
        upcoming events and offers!
      </Text>
    </ScrollView>
  );
};

const stylesInfo = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: colors.white,
  },
  logo: {
    marginBottom: 20,
  },
  titleText: {
    fontFamily: "Lexend-SemiBold",
    color: colors.secondary,
    fontSize: 18,
    marginTop: 20,
    textAlign: "left",
    width: "100%",
  },
  bodyText: {
    fontFamily: "Lexend-Light",
    color: colors.text,
    fontSize: 14,
    textAlign: "left",
    marginVertical: 10,
    lineHeight: 20,
    width: "100%",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  contactText: {
    fontFamily: "Lexend-Light",
    color: colors.text,
    fontSize: 14,
  },
  linkText: {
    fontFamily: "Lexend-Light",
    color: colors.text,
    fontSize: 14,
  },
});

export default InfoPage;

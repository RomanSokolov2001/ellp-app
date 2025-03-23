import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "@/assets/colors/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MdGroups } from "react-icons/md";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const JoinUs = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("../../../assets/images/ellp-card.jpg")}
          style={{
            width: width * 0.9,
            height: height * 0.38,
            alignSelf: "center",
            borderRadius: 15,
          }}
          resizeMode="cover"
        />
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              color: colors.text,
              fontSize: 18,
              textAlign: "left",
              marginBottom: 8,
            }}
          >
            Join the{" "}
            <Text style={{ color: colors.secondary }}>ELLP Membership</Text> and
            Get Your Virtual Card Today!
          </Text>
          <Text
            style={{
              color: colors.text,
              fontFamily: "Lexend-Light",
              fontSize: 14,
              textAlign: "left",
            }}
          >
            No wallet, no physical card—just pure convenience. Live the island
            life with exclusive discounts and perks!
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Ionicons
              name="calendar-clear-outline"
              size={40}
              color={colors.secondary}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Lexend-Regular",
                color: colors.secondary,
              }}
            >
              Weekly Events
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <FontAwesome6
              name="percentage"
              size={40}
              color={colors.secondary}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Lexend-Regular",
                color: colors.secondary,
              }}
            >
              Discounts
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="groups" size={40} color={colors.secondary} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Lexend-Regular",
                color: colors.secondary,
              }}
            >
              Community
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Lexend-SemiBold",
                fontSize: 18,
                color: colors.secondary,
                marginBottom: 5,
              }}
            >
              ELLP Membership
            </Text>
            <Text
              style={{
                fontFamily: "Lexend-Medium",
                fontSize: 18,
                color: colors.text,
              }}
            >
              €14,90
              <Text style={{ fontFamily: "Lexend-Light", fontSize: 16 }}>
                /year
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.fitness_tab,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 25,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontFamily: "Lexend-Regular",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default JoinUs;

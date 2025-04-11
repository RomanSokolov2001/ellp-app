import {View, Text, Image, Dimensions, ScrollView, Alert, ActivityIndicator} from "react-native";
import colors from "@/assets/colors/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MembershipStatus from "@/components/MembershipStatus";
import {useNavigation} from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {onValue, ref} from "firebase/database";

import {useLayoutEffect} from "react";
import {database} from "@/firebaseConfig";
import {usePreventScreenCapture} from "expo-screen-capture";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";
import {authService} from "@/app/api/authAPI";
import QRCodeComponent from "@/components/Profile/QRCodeComponent";


type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

const Membership = () => {
    const userData = useSelector((state: RootState) => state.userSlice.user); // Fetch user data from Redux
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [subscription, setSubscription] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Your membership",
            headerBackButtonDisplayMode: "minimal",
        });
    }, [navigation]);
    const {width, height} = Dimensions.get("window");

    useEffect(() => {
        async function checkUserSubscription() {
            try {
                const isSubscriptionActive = await authService.checkIfUserHasSubscription(userData.email);
                setSubscription(isSubscriptionActive)
            } catch (err) {
                setSubscription(false)
                // Alert.alert((err as Error).message);
            }
            setLoading(false);
        }

        checkUserSubscription();

    }, []);

    return (
        <View style={{flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: '80%', gap: 8}}>
                {/* <View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: colors.white,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: colors.fitness_tab,
                    }}
                >
                    {userData?.profileImage ? (
                        <Image
                            source={{uri: userData.profileImage}}
                            style={{width: "100%", height: "100%", borderRadius: 50}}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="person" size={50} color={colors.text}/>
                    )}
                </View> */}
                <View>
                    <QRCodeComponent email={userData?.email}></QRCodeComponent>
                </View>
                <Text
                    style={{fontFamily: "Lexend-Medium", fontSize: 20}}
                >
                    {`${userData?.firstName} ${userData?.lastName}`}
                </Text>
                {loading ? <ActivityIndicator/> :
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 8}}>
                    <MembershipStatus
                        status={subscription ? 'active' : 'non-member'}
                    />

                    <View
                        style={{flexDirection: "row", justifyContent: "space-between"}}
                    >
                        {subscription ? (
                            <>
                                {/*    TODO: Calculate expire date    */}
                                {/*<Text*/}
                                {/*    style={{fontFamily: "Lexend-Regular", color: colors.text}}*/}
                                {/*>*/}
                                {/*    Account Expiry*/}
                                {/*</Text>*/}
                                {/*<Text*/}
                                {/*    style={{fontFamily: "Lexend-Light", color: colors.text}}*/}
                                {/*>*/}
                                {/*</Text>*/}
                            </>
                        ) : (
                            <Text
                                style={{fontFamily: "Lexend-Regular", color: colors.text}}
                            >
                                Ready to become a member?{" "}
                                <Text
                                    onPress={() => navigation.navigate("JoinUs")}
                                    style={{
                                        color: colors.secondary,
                                        fontFamily: "Lexend-Medium",
                                    }}
                                >
                                    Join us here!
                                </Text>
                            </Text>
                        )}
                    </View>


                    <Image
                        source={require("../../../assets/images/ellp-card.jpg")}
                        style={{
                            width: width * 0.9,
                            height: height * 0.35,
                            borderRadius: 20,
                        }}
                        resizeMode="cover"
                    />

                    <Text
                        style={{
                            fontFamily: "Lexend-Regular",
                            color: colors.text,
                            fontSize: 14,
                            textAlign: "left",
                            paddingHorizontal: 20,
                        }}
                    >
                        {subscription
                            ? "Simply present this screen to unlock your exclusive discounts at participating locations."
                            : "By purchasing an ELLP membership, you'll unlock exclusive discounts to events and local spots, along with the best perks on the island."}
                    </Text>
                </View>
                }
            </ScrollView>
        </View>

    );
};

export default Membership;

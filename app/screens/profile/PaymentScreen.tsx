import {serverAPI} from "@/app/api/serverAPI";
import {useEffect, useState} from "react";
import {CardField, useStripe} from "@stripe/stripe-react-native";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";
import {Alert, Button, StyleSheet, TextInput, TouchableOpacity, Text, View} from "react-native";
import SimpleAlert from "@/components/SimpleAlert";
import colors from "@/assets/colors/colors";

export default function CheckoutScreen() {
    const user = useSelector((state: RootState) => state.userSlice.user);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const clientSecret = await serverAPI.receiveIntent(user.jwt);
        const ephemeralKey = 123
        const customer = user.email;

        return {
            clientSecret,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            clientSecret,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            returnURL: 'your-app://stripe-redirect',
            customerId: customer,
            // @ts-ignore
            customerEphemeralKeySecret: ephemeralKey,
            // @ts-ignore
            paymentIntentClientSecret: clientSecret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        } else {
            console.error(error.message);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Pay with Card</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.sectionTitle}>Card Information</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 1234 1234 1234"
                  keyboardType="numeric"
                />
                <View style={styles.cardInfoContainer}>
                  <TextInput
                    style={[styles.input, styles.cardInfoInput]}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.input, styles.cardInfoInput]}
                    placeholder="CVC"
                    keyboardType="numeric"
                  />
                </View>

                <TextInput style={styles.input} placeholder="Full name on card" />


                <Text style={styles.confirmationText}>
                  By confirming your subscription, you allow Erasmus Life Las Palmas to
                  charge you for future payments in accordance with their terms. You can
                  always cancel your subscription.
                </Text>
                <CardField
                    postalCodeEnabled={false}
                />

                {/*<SimpleAlert*/}
                {/*    visible={simpleAlertVisible}*/}
                {/*    onClose={() => setSimpleAlertVisible(false)}*/}
                {/*    title={simpleAlertContent.title}*/}
                {/*    message={simpleAlertContent.message}*/}
                {/*/>*/}
            </View>
            );
            <Button
                disabled={!loading}
                title="Checkout"
                onPress={openPaymentSheet}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
        paddingTop: 10,
    },
    headerText: {
        fontSize: 24,
        fontFamily: "Lexend-Medium",
        color: colors.text,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey_border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        color: colors.grey_border,
        fontFamily: "Lexend-Light",
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "Lexend-Light",
        color: colors.text,
        marginBottom: 8,
    },
    cardInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardInfoInput: {
        flex: 1,
        marginRight: 10,
    },
    payButton: {
        backgroundColor: colors.pay_button,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    payButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: "Lexend-Medium",
    },
    confirmationText: {
        fontSize: 14,
        color: colors.text,
        fontFamily: "Lexend-Light",
        textAlign: "center",
        marginTop: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#000",
        marginBottom: 15,
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#000",
        marginBottom: 15,
    },
});

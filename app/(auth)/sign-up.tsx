import {useState} from "react";
import {View, Text, ScrollView, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, useRouter} from "expo-router";
import {auth, database} from "@/firebaseConfig";
import {createUserWithEmailAndPassword, signOut} from "@firebase/auth";
import {ref, set} from "@firebase/database";

import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import SimpleAlert from "@/components/SimpleAlert";
import colors from "@/assets/colors/colors";
import {authService} from "@/app/services/authService";

const SignUp = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContent, setAlertContent] = useState({
        title: "",
        message: "",
    });
    const router = useRouter();

    // Extensive checks for form validation to be added here
    const handleSignUp = async () => {
        // Validate all fields are filled
        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.passwordConfirm || !form.username) {
            setAlertContent({
                title: "Error",
                message: "All fields are required.",
            });
            setAlertVisible(true);
            return;
        }

        // Validate passwords match
        if (form.password !== form.passwordConfirm) {
            setAlertContent({
                title: "Error",
                message: "Passwords do not match.",
            });
            setAlertVisible(true);
            return;
        }

        // Validate minimum password length
        if (form.password.length < 6) {
            setAlertContent({
                title: "Error",
                message: "Password must be at least 6 characters.",
            });
            setAlertVisible(true);
            return;
        }

        setIsSubmitting(true);

        try {
            // Create user with email and password
            const userCredential = await authService.signup(
                form.email,
                form.username,
                form.password,
                form.firstName,
                form.lastName,
            );
            setAlertContent({
                title: "Success",
                message:
                    "Your account has been created successfully! Log in to start using the app!",
            });
            setAlertVisible(true);

            router.push("/(auth)/sign-in");


        } catch (error: any) {
            console.error(error);
            setAlertContent({
                title: "Error",
                message: error.message,
            });
            setAlertVisible(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Sign Up</Text>
                    <FormField
                        title="First name"
                        placeholder="First name"
                        value={form.firstName}
                        handleChangeText={(e) => setForm({...form, firstName: e})}
                        otherStyles={styles.formField}
                    />
                    <FormField
                        title="Last name"
                        placeholder="Last name"
                        value={form.lastName}
                        handleChangeText={(e) => setForm({...form, lastName: e})}
                        otherStyles={styles.formField}
                    />
                    <FormField
                        title="Email"
                        placeholder="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({...form, email: e})}
                        otherStyles={styles.formField}
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Your username"
                        placeholder="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({...form, username: e})}
                        otherStyles={styles.formField}
                    />
                    <FormField
                        title="Password"
                        placeholder="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        otherStyles={styles.formField}
                    />
                    <FormField
                        title="Confirm Password"
                        placeholder="Confirm Password"
                        value={form.passwordConfirm}
                        handleChangeText={(e) => setForm({...form, passwordConfirm: e})}
                        otherStyles={styles.formField}
                        secureTextEntry
                    />
                    <CustomButton
                        title="Sign Up"
                        handlePress={handleSignUp}
                        containerStyles={styles.signUpButton}
                        isLoading={isSubmitting}
                    />
                    <View style={styles.signInLinkContainer}>
                        <Text style={styles.signInText}>Already have an account?</Text>
                        <Link href="/sign-in" style={styles.signInLink}>
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>

            <SimpleAlert
                visible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title={alertContent.title}
                message={alertContent.message}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    formContainer: {
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    logo: {
        width: 115,
        height: 115,
        alignSelf: "center",
    },
    title: {
        fontFamily: "Lexend-SemiBold",
        fontSize: 24,
        textAlign: "center",
        color: colors.black,
        marginTop: 16,
    },
    formField: {
        marginTop: 2,
    },
    signUpButton: {
        marginHorizontal: 12,
        marginTop: 20,
    },
    signInLinkContainer: {
        paddingTop: 12,
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start",
        marginHorizontal: 12,
    },
    signInText: {
        fontSize: 14,
        color: colors.text,
        fontFamily: "Lexend-Regular",
    },
    signInLink: {
        fontSize: 14,
        fontFamily: "Lexend-Medium",
        color: colors.fitness_tab,
    },
});

export default SignUp;

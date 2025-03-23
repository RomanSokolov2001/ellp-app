import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import SimpleAlert from "@/components/SimpleAlert";
import colors from "@/assets/colors/colors";
import { Link } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    message: "",
  });

  const handlePasswordReset = async () => {
    setIsSubmitting(true);

    if (!email) {
      setAlertContent({
        title: "Error",
        message: "Please enter your email address.",
      });
      setAlertVisible(true);
      setIsSubmitting(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertContent({
        title: "Success",
        message: "Password reset email sent! Please check your inbox.",
      });
      setAlertVisible(true);
      setEmail("");
    } catch (error: any) {
      console.error(error);
      setAlertContent({
        title: "Error",
        message: "Unable to send password reset email. Please try again later.",
      });
      setAlertVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/logo-ellp.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            No worries! Enter your email address below, and we'll send you a
            link to reset your password.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <CustomButton
            title="Send Reset Email"
            handlePress={handlePasswordReset}
            isLoading={isSubmitting}
            containerStyles={styles.buttonContainer}
          />

          <View style={styles.signInLinkContainer}>
            <Text style={styles.signInText}>Go back to</Text>
            <Link href="/sign-in" style={styles.signInLink}>
              Sign In
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>

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
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-SemiBold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Lexend-Regular",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.grey_border,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signInLinkContainer: {
    paddingTop: 12,
    flexDirection: "row",
    gap: 4,
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

export default ForgotPassword;

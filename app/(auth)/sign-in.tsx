import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import images from "@/assets/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import colors from "@/assets/colors/colors";
import { authService } from "@/app/api/authAPI";
import { User } from "../redux/userSlice";
import {useDispatch, useSelector} from "react-redux"; // Import useDispatch to dispatch the setUser action
import { setUser } from "../redux/userSlice";
import {RootState} from "@/app/redux/store"; // Import the setUser action

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" }); // Empty initial values
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const userFromSelector = useSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    console.log('test!')
  }, []);

  const submit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const user: User = await authService.login(form.email, form.password);
      console.log("Sign-in successful!");

      dispatch(setUser(user));

      // Navigate to the events page
      router.push("/(tabs)/events");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError((err as Error).message);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    // This code is no longer necessary because we're handling state through Redux.
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Sign In</Text>

          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.forgotPasswordContainer}>
            <Link
              href="/(auth)/forgot-password"
              style={styles.forgotPasswordLink}
            >
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.buttonContainer}
            isLoading={isSubmitting}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/(auth)/sign-up" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingBottom: 30,
  },
  formContainer: {
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logo: {
    marginTop: 40,
    width: 115,
    height: 115,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-SemiBold",
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    fontFamily: "Lexend-Light",
    color: colors.red_text,
    textAlign: "center",
    marginTop: 8,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 8,
  },
  forgotPasswordLink: {
    textAlign: "right",
    fontSize: 14,
    color: colors.fitness_tab,
    fontFamily: "Lexend-Regular",
  },
  buttonContainer: {
    marginTop: 30,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    marginTop: 16,
    marginHorizontal: 10,
  },
  signupText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Lexend-Regular",
  },
  signupLink: {
    fontSize: 14,
    color: colors.fitness_tab,
    fontFamily: "Lexend-Medium",
  },
});

export default SignIn;

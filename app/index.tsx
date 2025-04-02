import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import Onboarding from "@/components/Onboarding/Onboarding";
import Loading from "@/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "./redux/store";

export default function InitialScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const checkOnboarding = async () => {
    try {
      const onboardingValue = await AsyncStorage.getItem("@viewedOnboarding");
      if (onboardingValue !== null) setViewedOnboarding(true);
    } catch (err) {
      console.log("Error @checkOnboarding:", err);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      await checkOnboarding();
      setLoading(false);
    };

    initializeApp();
  }, []);


  // return loading ? (
  //   <Loading />
  // ) : user ? (
  //   <Redirect href="/(tabs)/events" />
  // ) : viewedOnboarding ? (
  //   <Redirect href="/(auth)/sign-in" />
  // ) : (
  //   <Onboarding />
  // );

  // redirect because login network error occurs
  return (
    <Redirect href="/(tabs)/events" />
  );
}

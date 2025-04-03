import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import "react-native-reanimated";

import {useColorScheme} from "@/hooks/useColorScheme";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import LoadingScreen from "@/components/LoadingScreen";
import {StripeProvider} from "@stripe/stripe-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
        "Lexend-Thin": require("../assets/fonts/Lexend-Thin.ttf"),
        "Lexend-ExtraLight": require("../assets/fonts/Lexend-ExtraLight.ttf"),
        "Lexend-Light": require("../assets/fonts/Lexend-Light.ttf"),
        "Lexend-Regular": require("../assets/fonts/Lexend-Regular.ttf"),
        "Lexend-Medium": require("../assets/fonts/Lexend-Medium.ttf"),
        "Lexend-SemiBold": require("../assets/fonts/Lexend-SemiBold.ttf"),
        "Lexend-Bold": require("../assets/fonts/Lexend-Bold.ttf"),
        "Lexend-ExtraBold": require("../assets/fonts/Lexend-ExtraBold.ttf"),
        "Lexend-Black": require("../assets/fonts/Lexend-Black.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Provider store={store}>
            <StripeProvider publishableKey={"pk_test_51NOIbmHh18onqmBxbN09YccupQ3JQYBaD4v0KlTrG7pgbpWLcr8xezSHqC7MJquZ4R9DderISFUNWxEOi1oLG8sn00nnoBUUTB"} merchantIdentifier={"acct_1NOIbmHh18onqmBx"}>
                <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
                    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}>

                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="index" options={{headerShown: false}}/>
                        </Stack>
                    </ThemeProvider>
                </PersistGate>
            </StripeProvider>
        </Provider>
    );
}

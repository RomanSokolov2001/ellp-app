import colors from "@/assets/colors/colors";
import { ActivityIndicator, View } from "react-native";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default Loading;

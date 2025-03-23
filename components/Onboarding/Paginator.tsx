import colors from "@/assets/colors/colors";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

interface PaginatorProps {
  data: any[];
  scrollX: any;
}

const Paginator = ({ data, scrollX }: PaginatorProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flexDirection: "row", height: 64 }}>
        {data.map((_, index: number) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: [colors.grey, colors.secondary, colors.grey],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dot, { backgroundColor: dotColor }]}
              key={index.toString()}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    marginHorizontal: 8,
  },
});

export default Paginator;

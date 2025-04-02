import colors from "@/assets/colors/colors";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type FilteringTabsProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  { name: "All", color: colors.all_tab },
  { name: "Restaurants & Nightlife", color: colors.food_tab },
  { name: "Lifestyle", color: colors.enertainment_tab },
  { name: "Fitness", color: colors.fitness_tab },
  { name: "Beauty", color: colors.adventure_tab },
  { name: "Accommodation", color: colors.accommodation_tab },
  { name: "Transportation", color: colors.travel_tab },
  { name: "Education", color: colors.primary },
];

const FilteringTabs: React.FC<FilteringTabsProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.srollView}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={[
            styles.tab,
            {
              backgroundColor: category.color,
              ...(selectedCategory === category.name && styles.selectedTab),
            },
          ]}
          onPress={() => onCategoryChange(category.name)} // Call the callback here
        >
          <Text style={styles.tabText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  srollView: {
    paddingVertical: 16,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Lexend-Light",
  },
  selectedTab: {
    shadowColor: colors.primary,
  },
});

export default FilteringTabs;

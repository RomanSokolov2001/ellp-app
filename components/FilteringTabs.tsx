import DiscountCategory from "@/app/types/DiscountCategory";
import colors from "@/assets/colors/colors";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type FilteringTabsProps = {
  categories : DiscountCategory[];
  selectedCategory: number;
  onCategoryChange: (category: number) => void;
};

function FilteringTabs(props: FilteringTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.srollView}
    >
      {/* All categories tab */}
      <TouchableOpacity
        style={[
          styles.tab,
          styles.firstTab,
          props.selectedCategory === 0 ? styles.selectedTab : styles.tab,
        ]}
        onPress={() => props.onCategoryChange(0)}
      >
        <Text style={[styles.tabText, props.selectedCategory === 0 ? styles.selectedTabText : styles.tabText]}>All</Text>
      </TouchableOpacity>
      
      {/* The rest of the category tabs */}
      {props.categories.map((category:DiscountCategory, i:number) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            props.selectedCategory === category.id ? styles.selectedTab : styles.tab
          ]}
          onPress={() => props.onCategoryChange(category.id)}
        >
          <Text style={[styles.tabText, props.selectedCategory === category.id ? styles.selectedTabText : styles.tabText]}>
            {require('he').decode(category.name)}
          </Text>
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
    backgroundColor: colors.primaryTransparent,
    borderColor: colors.secondary,
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: colors.secondary,
    fontSize: 16,
    fontFamily: "Lexend-Light",
  },
  selectedTab: {
    backgroundColor: colors.secondary,
  },
  selectedTabText: {
    color: colors.white,
  },
  firstTab: {
    marginLeft: 16,
  },
});

export default FilteringTabs;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilteringTabs from "@/components/FilteringTabs";
import LoadingScreen from "@/components/LoadingScreen";
import colors from "@/assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "@/app/types/Navigation";
import Card from "@/components/Card";
import DiscountCategory from "@/app/types/DiscountCategory";

export class DiscountData {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: string,
    public location: string[],
    public discount: string,
    public industry: DiscountCategory,
  ) {}
}
  
export default function Discounts() {
  //navigation for preview on card press
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  function handlePress(discount: DiscountData) {
    navigation.navigate("ViewContentScreen", {
      data: discount,
    });
  }

  //categories
  const [categories, setCategories] = useState<DiscountCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const response = await fetch(`https://erasmuslifelaspalmas.com/wp-json/wp/v2/categories?parent=21&orderby=id&order=asc`);
        const data = await response.json();
        const categoriesData = data.map((category: any, index:number) => ({
          id: category.id,
          name: category.name
        }));
        
        setCategories(categoriesData);
      }
      catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }
  , []);

  function handleCategoryChange(newlySelectedCategoryId: number) {
    if (newlySelectedCategoryId === selectedCategoryId) return;

    setPageCount(1);
    setAllFetched(false);
    setDiscounts([]);
    setSelectedCategoryId(newlySelectedCategoryId);
  }

  //loader toggle flags
  const [isInitialLoad, setIsInitialLoad] = useState(true); // for the initial loader toggle
  const [loading, setLoading] = useState(false); // for the pagination loader toggle

  //pagination
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [allFetched, setAllFetched] = useState(false); // to prevent fetching after all has been fetched

  //discounts
  const [discounts, setDiscounts] = useState<DiscountData[]>([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        // Categories needs to be fetched before fetching discounts
        if (categories.length === 0) return;

        setLoading(true);

        // Construct the category query for the API call
        // Combining the selected category and the parent category (21) will just return all categories (works as || operator), so this is the only way left to filter the discounts
        const categoryQuery = selectedCategoryId === 0
        ? "21" // all categories
        : `${selectedCategoryId}`; // only the selected category

        const response = await fetch(
          `https://erasmuslifelaspalmas.com/wp-json/wp/v2/posts?categories=${categoryQuery}&per_page=${pageSize}&page=${pageCount}&_embed`
        );
        
        const data = await response.json();

        if (!Array.isArray(data)) {
          if (data?.code === "rest_post_invalid_page_number") {
            setAllFetched(true);
            return;
          } else {
            console.error("Unexpected data format:", data);
            return;
          }
        }

        // Make sure the discount has the category 21 (parent category) along with the selected category
        const discountsData = await data.filter((discount: any) => discount.categories.includes(21))
        .map((discount: any) => new DiscountData(
          discount.id,
          discount.title.rendered,
          discount._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          [...discount.acf.location?.split('\n') || '/'],
          discount.acf.discount || "/",
          new DiscountCategory({
            id: discount.categories.find((id: number) => id !== 21) ?? 0,
            name: getCategoryName(discount.categories, categories),
          })
        ))

        // Append new discounts to the existing state in case of pagination
        setDiscounts((prev) => [...prev, ...discountsData]);

        // After the first load, set the initial load to false
        if (pageCount === 1) {
          setIsInitialLoad(false);
        }

        // Check if all data has been fetched
        if (discountsData.length < pageSize) {
          setAllFetched(true);
        }
      } catch (error) {
        console.error("Error fetching discounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscounts();

    // Helper function to get the category name
    function getCategoryName(discountCategoryIds: number[], allCategories: DiscountCategory[]): string {
      const childCategoryId = discountCategoryIds.find((id) => id !== 21);
      const matched = allCategories.find((cat) => cat.id === childCategoryId);
      return matched?.name || "Uncategorized";
    }
  }, [pageCount, categories, selectedCategoryId]); // Refetch when pageCount or selectedCategoryId changes

  // refetch when the user scrolls to the end of the list
  function handleLoadMore() {
    if (!loading && !allFetched) {
      setPageCount((prev) => prev + 1);
    }
  }

  // Initial loader toggle
  if (isInitialLoad && !discounts.length) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.tabsContainer}>
        <FilteringTabs
          categories={categories}
          selectedCategory={selectedCategoryId}
          onCategoryChange={(categoryId) => handleCategoryChange(categoryId)}
        />
      </View>

      <FlatList
        contentContainerStyle={[
          styles.list,
          discounts.length === 0 ? styles.fullHeightList : null //full height when no discounts shown, to center the loader
        ]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        data={discounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imageUrl={item.imageUrl}
            title={item.title}
            onPress={() => handlePress(item)}
          />
        )}
        ListFooterComponent={
          loading && discounts.length > 0 ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.centeredLoader}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  list: {
    padding: 16,
  },
  fullHeightList: {
    flexGrow: 1,
  },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilteringTabs from "@/components/FilteringTabs";
import DiscountCard from "@/components/DiscountCard";
import LoadingScreen from "@/components/LoadingScreen";
import stripHtml from "@/app/services/stripHTML";
import colors from "@/assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "@/app/types/Navigation";

export class DiscountData {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: string,
    public location: string,
    public discount: string,
    public industry: string,
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

  //pagination
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [allFetched, setAllFetched] = useState(false); // to prevent fetching after all has been fetched
  const [loadingMore, setLoadingMore] = useState(false); // for the pagination loader toggle

  //for the initial loader toggle
  const [loading, setLoading] = useState(true);

  //data
  const [discounts, setDiscounts] = useState<DiscountData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  function toggleFavourite(discountId: string) {}

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        setLoadingMore(true);

        // Fetch data from the WordPress API
        const response = await fetch(
          `https://erasmuslifelaspalmas.com/wp-json/wp/v2/posts?categories=21&per_page=${pageSize}&page=${pageCount}&_embed`
        );
        const data = await response.json();

        const discountsData = data.map((discount: any) => new DiscountData(
          discount.id.toString(),
          discount.title.rendered,
          discount._embedded["wp:featuredmedia"][0].source_url,
          discount.acf.location || "/",
          discount.acf.discount || "/",
          discount.acf.industry || "/",
        ));

        // Append new discounts to the existing state in case of pagination
        setDiscounts((prev) => [...prev, ...discountsData]);

        // Check if all data has been fetched
        if (discountsData.length < pageSize) {
          setAllFetched(true);
        }
      } catch (error) {
        console.error("Error fetching discounts:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchDiscounts();
  }, [pageCount]);

  function handleLoadMore() {
    if (!loadingMore && !allFetched) {
      setPageCount((prev) => prev + 1);
    }
  }

  // Toggle favorite discount (add/remove from likedDiscounts in Realtime DB)
  if (loading && pageCount === 1) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.tabsContainer}>
        <FilteringTabs
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        data={discounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountCard
            imageUrl={item.imageUrl}
            location={item.location}
            title={item.title}
            discount={item.discount}
            onPress={() => handlePress(item)}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavourite(item.id)}
          />
        )}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    paddingLeft: 16,
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
});
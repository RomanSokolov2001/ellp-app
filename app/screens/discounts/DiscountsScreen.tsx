import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import DiscountCard from "@/components/DiscountCard";
import FilteringTabs from "@/components/FilteringTabs";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "@/firebaseConfig";
import { get, ref, set, update } from "firebase/database";
import { firestoreDb } from "@/firebaseConfig";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import RootStackParamList from "@/app/types/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import stripHtml from "@/app/services/stripHTML";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/assets/colors/colors";

export interface DiscountData {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  discount: string;
  industry: string;
  locationPostalCode: string;
  locationStreet: string;
  locationCity: string;
}

type DiscountsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DiscountsScreen"
>;
const Discounts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [discounts, setDiscounts] = useState<DiscountData[]>([]);
  const [userId, setUserId] = useState<string>();
  // const [loadingFavorites, setLoadingFavorites] = useState(true);
  var [favorites, setFavorites] = useState<string[]>([]); // list of ids discounts

  // const auth = getAuth();
  // useEffect(() => {
  //   setLoading(true);

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserId(user.uid);
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (!userId) return;

  // const loadFavorites = async (userId: string) => {
  //     try {
  //       setLoading(true); // Start loading before fetching data

  //       const dbRef = ref(database, `users/${userId}/likedDiscounts`);
  //       const snapshot = await get(dbRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         console.log("Data favorites:", Object.keys(data));
  //         setFavorites(Object.keys(data));
  //       } else {
  //         setFavorites([]);
  //       }
  //       setLoadingFavorites(false);
  //     } catch (error) {
  //       console.error("Error loading favorites: ", error);
  //     } finally {
  //       setLoading(false);
  //       console.log("finally favorites:", favorites);
  //     }
  //   };
  //   loadFavorites(userId);
  // }, [userId]);

  const navigation = useNavigation<DiscountsScreenNavigationProp>();

  //load discounts from wp api
  useEffect(() => {
      const fetchEvents = async () => {
        try {
          setLoading(true);

          // Fetch data from the WordPress API, set to 100 atm because default is 10. Pagination should be implemented in the future.
          const response = await fetch('https://erasmuslifelaspalmas.com/wp-json/wp/v2/posts?categories=21&per_page=100&_embed');
          const data = await response.json();
          const discountsData = data.map((discount: any) => ({
            id: discount.id.toString(),
            title: discount.title.rendered,
            description: stripHtml(discount.content.rendered),
            imageUrl: discount._embedded["wp:featuredmedia"][0].source_url,
            location: discount.acf.location ? discount.acf.location : "",
            discount: discount.acf.discount ? discount.acf.discount : "",
            industry: discount.acf.industry ? discount.acf.industry : "",
          }));

          setDiscounts(discountsData);
        }
        catch (error) {
          console.error("Error fetching events:", error);
        }
        finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }, []);

  // Toggle favorite discount (add/remove from likedDiscounts in Realtime DB)
  const toggleFavourite = async (discountId: string) => {
    return;

    if (!userId) {
      console.error("User ID is undefined. Cannot toggle favorite.");
      return;
    }

    const dbRef = ref(database, `users/${userId}/likedDiscounts`);
    try {
      // Fetch the latest state from Firebase
      const snapshot = await get(dbRef);
      const currentFavorites = snapshot.exists() ? snapshot.val() : {};

      // Check if the discount is already a favorite
      const isFavorite = favorites.includes(discountId);

      if (isFavorite) {
        // Remove from favorites
        delete currentFavorites[discountId];
      } else {
        // Add to favorites
        currentFavorites[discountId] = true;
      }

      // Save to Firebase Realtime Database
      await set(dbRef, currentFavorites);

      // Update local state
      setFavorites(Object.keys(currentFavorites));
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  const handlePress = (discount: DiscountData) => {
    navigation.navigate("ViewDiscountScreen", { discount });
  };

  //if (loading || loadingFavorites)
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={ styles.tabsContainer}>
        <FilteringTabs
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
      />
    </SafeAreaView>
  );
};

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

export default Discounts;
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

export interface DiscountData {
  id: string;
  imageUrl: string;
  mapsUrl: string;
  location: string;
  title: string;
  discount: string;
  category: string;
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
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  var [favorites, setFavorites] = useState<string[]>([]); // list of ids discounts

  const auth = getAuth();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // fake loading to see loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const loadFavorites = async (userId: string) => {
      try {
        setLoading(true); // Start loading before fetching data
        const dbRef = ref(database, `users/${userId}/likedDiscounts`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Data favorites:", Object.keys(data));
          setFavorites(Object.keys(data));
        } else {
          setFavorites([]);
        }
        setLoadingFavorites(false);
      } catch (error) {
        console.error("Error loading favorites: ", error);
      } finally {
        setLoading(false);
        console.log("finally favorites:", favorites);
      }
    };
    loadFavorites(userId);
  }, [userId]);

  const navigation = useNavigation<DiscountsScreenNavigationProp>();

  //load discounts from firebase
  useEffect(() => {
    setLoading(true);
    const discountsCollection = collection(firestoreDb, "discounts");

    const unsubscribe = onSnapshot(
      discountsCollection,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const discountItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DiscountData[];

        setDiscounts(discountItems);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching discounts: ", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredData = discounts.filter((discount) => {
    if (selectedCategory === "All") return true;
    return discount.category === selectedCategory;
  });

  // Toggle favorite discount (add/remove from likedDiscounts in Realtime DB)
  const toggleFavourite = async (discountId: string) => {
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

  if (loading || loadingFavorites) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filteringSection}>
        <FilteringTabs
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
  },

  filteringSection: {
    height: 105,
  },
});

export default Discounts;

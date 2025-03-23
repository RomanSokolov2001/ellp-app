import { View, FlatList, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList from "@/app/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import DiscountProfileCard from "@/components/DiscountProfileCard";
import { DiscountData } from "../discounts/DiscountsScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { database, firestoreDb } from "@/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loading from "@/components/Loading";

type FavouritesPageScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "FavouriteDiscounts"
>;

const FavouriteDiscounts = () => {
  const navigation = useNavigation<FavouritesPageScreenProps>();
  var [favouriteUserDiscountsIds, setFavouriteUserDiscountsIds] = useState<
    string[]
  >([]);
  var [favouriteUserDiscounts, setFavouriteUserDiscounts] = useState<
    DiscountData[]
  >([]);
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(true);

  // set user id
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(undefined);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //load liked discounts ids
  useEffect(() => {
    if (!userId) return;
    const loadFavouriteDiscountsForUser = async (userId: string) => {
      setLoading(true);
      try {
        const dbRef = ref(database, `users/${userId}/likedDiscounts`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setFavouriteUserDiscountsIds(Object.keys(data));
          console.log(favouriteUserDiscountsIds);
        }
      } catch (error) {
        console.error("Error loading favorites: ", error);
      }
      setLoading(false);
    };
    loadFavouriteDiscountsForUser(userId);
  }, [userId]);

  useEffect(() => {
    if (!favouriteUserDiscountsIds || favouriteUserDiscountsIds.length === 0)
      return;
    setLoading(true);
    const discountsCollection = collection(firestoreDb, "discounts");
    const discountsQuery = query(
      discountsCollection,
      where("__name__", "in", favouriteUserDiscountsIds)
    );
    console.log(discountsQuery);
    const unsubscribe = onSnapshot(
      discountsQuery,
      (snapshot) => {
        const discountItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DiscountData[];
        console.log(discountItems);
        setFavouriteUserDiscounts(discountItems);
        console.log(favouriteUserDiscounts);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching discounts: ", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [favouriteUserDiscountsIds]);

  const handlePress = (discount: DiscountData) => {
    navigation.navigate("ViewDiscountScreen", { discount });
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteUserDiscounts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiscountProfileCard
            title={item.title}
            imageUrl={item.imageUrl}
            location={item.location}
            discount={item.discount}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </View>
  );
};

export default FavouriteDiscounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
});

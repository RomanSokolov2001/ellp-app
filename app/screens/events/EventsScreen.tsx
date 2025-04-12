import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestoreDb } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "@/components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "@/app/types/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import stripHtml from "@/app/services/stripHTML";
import getMetaValue from "@/app/services/getMetaValue";
import colors from "@/assets/colors/colors";

type EventsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EventsScreen"
>;

export interface EventData {
  id: string;
  imageUrl: any;
  location: string;
  date: string;
  description: any;
  category: any;
  title: any;
  startTime: string;
  endTime?: string;
  discount?: string;
  price?: string;
  priceMembers?: string;
  contact?: string;
  webPageUrl?: string;
  stock?: string;
}

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true); // for the initial loader icon
  const navigation = useNavigation<EventsScreenNavigationProp>();

  //load discounts from wp api
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);  // for the pagination loader icon
  const [allFetched, setAllFetched] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setLoadingMore(true);

        const response = await fetch(`https://erasmuslifelaspalmas.com/wp-json/custom/v1/events?page=${pageCount}&per_page=${pageSize}`);
        const data = await response.json();
        const eventsData = data.map((event: any) => ({
          id: event.id.toString(),
          title: event.name,
          description: stripHtml(event.description),
          price: event.price,
          webPageUrl: event.permalink,
          imageUrl: event.images[0].src,
          date: getMetaValue(event, "event_date"),
          location: getMetaValue(event, "event_location"),
          stock: event.stock_quantity as String,
          category: event.categories[0].name,
        }));

        // Append new discounts to the existing state in case of pagination
        setEvents(prev => [...prev, ...eventsData]);

        // Check if all data has been fetched
        if (eventsData.length < pageSize) {
          setAllFetched(true);
        }
      }
      catch (error) {
        console.error("Error fetching events:", error);
      }
      finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchEvents();
  }, [pageCount]);

  function handleLoadMore(){
    if (!loadingMore && !allFetched) {
      setPageCount(prev => prev + 1);
    }
  };

  const handlePress = (event: EventData) => {
    navigation.navigate("ViewEventScreen", { event });
  };

  if (loading && pageCount === 1) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.25}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            imageUrl={item.imageUrl}
            location={item.location}
            description={item.description}
            date={item.date}
            title={item.title}
            onPress={() => handlePress(item)}
            stock={item.stock ? parseInt(item.stock) : 0}
          />
        )}

        ListFooterComponent = { loadingMore ? <ActivityIndicator size="large" color={colors.primary} /> : null }
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  list: {
    width: "100%",
    padding: 16,
  },
});
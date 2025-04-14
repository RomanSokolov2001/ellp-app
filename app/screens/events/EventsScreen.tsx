import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "@/components/EventCard";
import LoadingScreen from "@/components/LoadingScreen";
import colors from "@/assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import RootStackParamList, { EventsScreenProps } from "@/app/types/Navigation";
import stripHtml from "@/app/services/stripHTML";
import getMetaValue from "@/app/services/getMetaValue";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export class EventData {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: any,
    public location: string,
    public date: string,
    public description: any,
    public category: any,
    public discount?: string,
    public price?: string,
    public webPageUrl?: string,
    public stock?: number
  ) {}
}

export default function EventsScreen(){
  //navigation for preview on card press
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  function handlePress (event: EventData){
    navigation.navigate("ViewContentScreen", {
      data: event,
    });
  };
  
  //pagination
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [allFetched, setAllFetched] = useState(false); // to prevent fetching after all has been fetched
  const [loadingMore, setLoadingMore] = useState(false);  // for the pagination loader toggle

  // for the initial loader toggle
  const [loading, setLoading] = useState(true);

  //fetch data from the WP API
  const [events, setEvents] = useState<EventData[]>([]); //data

  useEffect(() => {
    async function fetchEvents(){
      try {
        setLoading(true);
        setLoadingMore(true);

        const response = await fetch(`https://erasmuslifelaspalmas.com/wp-json/custom/v1/events?page=${pageCount}&per_page=${pageSize}`);
        const data = await response.json();
        const eventsData = data.map((event: any) => new EventData(
          event.id.toString(),                                 // id
          event.name,                                          // title
          event.images[0].src,                                 // imageUrl
          getMetaValue(event, "event_location") || "/",         // location
          getMetaValue(event, "event_date") || "/",             // date
          stripHtml(event.description),                        // description
          event.categories[0]?.name || "/",                     // category
          undefined,                                           // discount (nije dostupno iz API-ja)
          event.price,                                         // price
          event.permalink,                                     // webPageUrl
          event.stock_quantity               // stock
        ));

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
            stock={item.stock ? item.stock : 0}
          />
        )}
        ListFooterComponent = { loadingMore ? <ActivityIndicator size="large" color={colors.primary} /> : null }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    padding: 16,
  },
});
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestoreDb } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "@/components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "@/app/types/Navigation";
import LoadingScreen from "@/components/LoadingScreen";

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
  title: any;
  startTime: string;
  endTime?: string;
  discount?: string;
  price?: string;
  priceMembers?: string;
  contact?: string;
  webPageUrl?: string;
}

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<EventsScreenNavigationProp>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://erasmuslifelaspalmas.com/wp-json/wp/v2/product");
        const data = await response.json();

        const eventsData = data.map((event: any) => ({
          id: event.id.toString(),
          imageUrl: event.yoast_head_json?.og_image[0]?.url,
          webPageUrl: event.link,
          title: event.title?.rendered || "No Title",
          date: event.date.split("T")[0] || "No Date",
          description: event.yoast_head_json?.og_description || "No Description",
          location: "Las Palmas, Gran Canaria",
          price: "?",
        }));

        setEvents(eventsData);
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

  const handlePress = (event: EventData) => {
    navigation.navigate("ViewEventScreen", { event });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.list}
        data={events}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            imageUrl={item.imageUrl}
            location={item.location}
            description={item.description}
            date={item.date}
            title={item.title}
            onPress={() => handlePress(item)}
          />
        )}
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
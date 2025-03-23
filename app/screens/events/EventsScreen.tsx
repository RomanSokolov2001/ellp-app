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
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  title: string;
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
        const eventsCollection = collection(firestoreDb, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const data = doc.data() as EventData;
          return {
            ...data,
            id: doc.id,
          };
        });
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
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
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EventsScreen;

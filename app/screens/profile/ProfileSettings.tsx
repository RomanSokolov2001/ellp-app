import { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import colors from "@/assets/colors/colors";
import { auth } from "@/firebaseConfig";

import SimpleAlert from "@/components/SimpleAlert";
import { useRouter } from "expo-router";
import DeleteProfileComponent from "@/components/Profile/DeleteProfileComponent";
import ProfileFieldsComponent from "@/components/Profile/ProfileFieldsComponent";

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [simpleAlertVisible, setSimpleAlertVisible] = useState(false);
  const [simpleAlertContent, setSimpleAlertContent] = useState({
    title: "",
    message: "",
  });

  const router = useRouter();

  const handleSuccessAlert = (title: string, message: string) => {
    setSimpleAlertContent({ title, message });
    setSimpleAlertVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileFieldsComponent
          onSuccessAlert={handleSuccessAlert}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <DeleteProfileComponent
          auth={auth}
          onDeleteSuccess={() => router.replace("/sign-in")}
          onSuccessAlert={handleSuccessAlert}
          isEditing={isEditing}
        />
        <SimpleAlert
          visible={simpleAlertVisible}
          onClose={() => setSimpleAlertVisible(false)}
          title={simpleAlertContent.title}
          message={simpleAlertContent.message}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContainer: { padding: 20, flexGrow: 1 },
});

export default ProfileSettings;

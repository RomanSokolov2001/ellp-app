import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebaseConfig";

interface Props {
  onSuccessAlert: (title: string, message: string) => void;
  isEditing: boolean;
  onSaveImage: (imageUri: string | null) => void;
  onCancelImageEdit: () => void;
}

const ProfileImageComponent: React.FC<Props> = ({
  onSuccessAlert,
  isEditing,
  onSaveImage,
  onCancelImageEdit,
}) => {
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [tempImageUri, setTempImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}/profileImage`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setProfileImageUri(snapshot.val());
          }
        });
      }
    };

    fetchProfileImage();
  }, []);

  // Reset profile image when cancel is clicked
  useEffect(() => {
    if (!isEditing) {
      setTempImageUri(null);
    }
  }, [isEditing]);

  const handleEditProfilePicture = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        onSuccessAlert(
          "Permission Denied",
          "You need to allow access to your photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        const imageUri = result.assets[0].uri;
        setTempImageUri(imageUri); // Store temporarily
        onSaveImage(imageUri); // Pass image URI to parent
      }
    } catch (error) {
      console.error("Error editing profile picture:", error);
      onSuccessAlert("Error", "Failed to upload profile picture.");
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImage}>
        {tempImageUri || profileImageUri ? (
          <Image
            source={{
              uri:
                tempImageUri ||
                profileImageUri ||
                "https://via.placeholder.com/80",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person" size={50} />
        )}
        {isEditing && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={handleEditProfilePicture}
          >
            <AntDesign name="camerao" size={16} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { width: 80, height: 80, borderRadius: 40 },
  profileImageContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.fitness_tab,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    padding: 4,
  },
});

export default ProfileImageComponent;

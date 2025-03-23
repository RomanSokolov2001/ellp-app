import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";
import CustomAlert from "@/components/CustomAlert";
import { deleteUser, User } from "firebase/auth";
import { ref, remove } from "firebase/database";
import { database } from "@/firebaseConfig";

interface Props {
  auth: { currentUser: User | null };
  onDeleteSuccess: () => void;
  onSuccessAlert: (title: string, message: string) => void;
  isEditing: boolean;
}

const DeleteProfileComponent: React.FC<Props> = ({
  auth,
  onDeleteSuccess,
  onSuccessAlert,
  isEditing,
}) => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleDeleteProfile = () => setAlertVisible(true);

  const handleConfirmDelete = async () => {
    const user = auth.currentUser;
    if (!user) {
      onSuccessAlert("Error", "No user is currently logged in.");
      return;
    }

    try {
      // Delete user data from Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      await remove(userRef);

      // Delete user from Firebase Authentication
      await deleteUser(user);

      onSuccessAlert("Success", "Your profile has been deleted.");
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting user:", error);
      onSuccessAlert(
        "Error",
        "Failed to delete profile. Please logout and login again to perform this action."
      );
    } finally {
      setAlertVisible(false);
    }
  };

  if (isEditing) return null;

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Joined <Text style={styles.boldText}>31 October 2023</Text>
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteProfile}
      >
        <Text style={styles.deleteButtonText}>Delete Profile</Text>
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onAction={handleConfirmDelete}
          title="Delete Profile"
          message="Are you sure you want to delete your profile? This action cannot be undone."
          actionText="Delete"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 5,
    width: "100%",
  },
  deleteButton: {
    backgroundColor: colors.red_background,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  deleteButtonText: {
    color: colors.red_text,
    fontSize: 14,
    fontFamily: "Lexend-Regular",
  },
  footerText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "Lexend-Light",
  },
  boldText: {
    fontFamily: "Lexend-Regular",
    color: colors.text,
  },
});

export default DeleteProfileComponent;

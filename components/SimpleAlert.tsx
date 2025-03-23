import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import colors from "@/assets/colors/colors";

interface SimpleAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SimpleAlert = ({
  visible,
  onClose,
  title,
  message,
}: SimpleAlertProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SimpleAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Lexend-Regular",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Lexend-Light",
  },
  okButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.fitness_tab,
    alignItems: "center",
  },
  okButtonText: {
    color: colors.white,
    fontFamily: "Lexend-Medium",
    fontSize: 16,
  },
});

import colors from "@/assets/colors/colors";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  onAction: () => void;
  title: string;
  message: string;
  actionText: string;
}

const CustomAlert = ({
  visible,
  onClose,
  onAction,
  title,
  message,
  actionText,
}: CustomAlertProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onAction}>
              <Text style={styles.actionButtonText}>{actionText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.grey_background_2,
    alignItems: "center",
  },
  actionButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.red_text,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.text,
    fontFamily: "Lexend-Light",
  },
  actionButtonText: {
    color: "white",
    fontFamily: "Lexend-Light",
  },
});

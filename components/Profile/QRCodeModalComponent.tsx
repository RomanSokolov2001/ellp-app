import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import QRCodeComponent from "./QRCodeComponent";

interface QRCodeModalComponentProps {
  email: string;
  collaborator: string;
  visibility: boolean;
  onClose: () => void;
}

export default function QRCodeModalComponent({ email, visibility, onClose }: QRCodeModalComponentProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Membership Verification</Text>
          <Text style={styles.instructions}>
            To redeem a discount, present this QR code to the collaborator/partner shop.
          </Text>
          <QRCodeComponent email={email} size={300} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
});
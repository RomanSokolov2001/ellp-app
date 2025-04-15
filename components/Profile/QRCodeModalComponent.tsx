import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeComponent from "./QRCodeComponent";

export default function QRCodeModalComponent({ email, visibility, onClose }) {
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visibility}
            onRequestClose={onClose}
            >
            <Pressable style={styles.modalBackground} onPress={onClose}>
                <QRCodeComponent
                    email={email}
                    size={350}
                />
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});
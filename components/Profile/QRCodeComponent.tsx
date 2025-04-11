import { BACKEND_IP } from '@/config';
import { CHECK_MEMBERSHIP_ENDPOINT } from '@/constants/endpoints';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useState } from 'react';

export default function QRCodeComponent({ email }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const checkMemberURL = BACKEND_IP + CHECK_MEMBERSHIP_ENDPOINT + "?email=" + email;
  console.log(checkMemberURL ?? '');

  return (
    <>
      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <View style={styles.qrWrapper}>
          <QRCode
            value={checkMemberURL}
            size={200}
            logo={require("@/assets/images/logo-ellp.png")}
            logoBackgroundColor='#044EAFFC'
            logoSize={50}
          />
        </View>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <QRCode
            value={checkMemberURL}
            size={350}
            logo={require("@/assets/images/logo-ellp.png")}
            logoBackgroundColor='#044EAFFC'
            logoSize={60}
          />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  qrWrapper: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

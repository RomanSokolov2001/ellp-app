import { BACKEND_IP } from '@/config';
import { CHECK_MEMBERSHIP_ENDPOINT } from '@/constants/endpoints';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { useState } from 'react';
import QRCodeComponent from './QRCodeComponent';
import QRCodeModalComponent from './QRCodeModalComponent';

interface QRCodeWrapperProps {
  email: string;
}

export default function QRCodeWrapperComponent({ email }: QRCodeWrapperProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <View style={styles.qrWrapper}>
          <QRCodeComponent
            email={email}
            size={undefined}
          />
        </View>
      </Pressable>

      <QRCodeModalComponent 
        email={email}
        visibility={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
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
});

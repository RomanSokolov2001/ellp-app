import { BACKEND_IP } from '@/config';
import { CHECK_MEMBERSHIP_ENDPOINT } from '@/constants/endpoints';
import { StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

export default function QRCodeComponent({ email, size }) {

    if (!email) {   
        const userData = useSelector((state: RootState) => state.userSlice.user); // Fetch user data from Redux
        email = userData?.email;
    }  

    const checkMemberURL = BACKEND_IP + CHECK_MEMBERSHIP_ENDPOINT + "?email=" + email;
    console.log(checkMemberURL ?? '');

  return (
    <>
        <QRCode
            value={checkMemberURL}
            size={size ?? 200}
            logo={require("@/assets/images/logo-ellp.png")}
            logoBackgroundColor='#044EAFFC'
            logoSize={50}
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

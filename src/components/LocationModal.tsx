import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'PreferredShopsScreen'
>;

interface Props {
  visible: boolean;
  onClose: () => void;
}
type PointItem = {
  id: number;
  text: string;
};
const Points: PointItem[] = [
  {
    id: 1,
    text: 'Find shops nearest to you',
  },
  {
    id: 2,
    text: 'Accurate delivery location',
  },
  {
    id: 3,
    text: 'Better service recommendations',
  },
];
const LocationModal: React.FC<Props> = ({ visible, onClose }) => {
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;

  const handleGrantAccess = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (result === RESULTS.GRANTED) {
      // Permission mil gayi → Close modal + Navigate
      onClose();
      setTimeout(() => {
        navigation.navigate('PreferredShopsScreen');
      }, 200);
    } else if (result === RESULTS.DENIED) {
      // User ne deny kiya
      console.log('Please allow location permission to continue.');
    } else if (result === RESULTS.BLOCKED) {
      // User ne 'Don't Allow' permanently select kiya
      console.log('Permission blocked. Please enable it from Settings.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.card, { height: hp(565), width: wp(360) }]}>
          <View style={styles.iconBox}>
            <Image
              source={require('../assets/Icons/locationIcon.png')}
              style={{ height: hp(32), width: wp(32) }}
            />
          </View>

          <Text style={[styles.title, { fontSize: fp(17) }]}>
            Enable Location Access
          </Text>
          <Text style={[styles.subtitle, { fontSize: fp(16) }]}>
            We need your location to find nearby shops and deliver items to you
          </Text>

          <FlatList
            data={Points}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ gap: hp(12) }}
            style={{
              marginTop: hp(24),
              width: wp(297),
            }}
            renderItem={({ item }) => (
              <View style={[styles.rowC, { height: hp(58) }]}>
                <View style={styles.bullet} />
                <Text style={{ fontSize: fp(16), color: '#333' }}>
                  {item.text}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#FC156A',
              paddingVertical: hp(14),
              borderRadius: hp(12),
              height: hp(50),
              marginBottom: hp(16),
            }}
            onPress={handleGrantAccess}
          >
            <Text style={[styles.btnText, { fontSize: fp(16) }]}>
              Grant Location Access →
            </Text>
          </TouchableOpacity>

          <Text style={[styles.privacyText, { fontSize: fp(14) }]}>
            Your location data is secure and never shared with third parties
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 4, 4, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 32,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE7F0',
    alignSelf: 'center',
  },
  title: {
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16,
    color: '#101828',
    lineHeight: 24,
  },
  subtitle: {
    textAlign: 'center',
    color: '#4A5565',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 24,
  },

  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FC156A', // pink bullet
    marginRight: 10,
  },
  point: { fontSize: 15, color: '#333' },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  privacyText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#777',
  },
  rowC: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    borderRadius: 12,
  },
});

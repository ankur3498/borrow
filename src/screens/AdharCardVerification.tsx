import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationModal from '../components/LocationModal';
import Toast from 'react-native-toast-message';
import Screen from './Screen';
type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'PreferredShopsScreen'
>;
const AdharCardVerification = () => {
  const [adhaar, setAdhaar] = useState('');
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;
  const [showLocationModal, setShowLocationModal] = useState(false);
  return (
    <Screen bg="#FFFFFF" barStyle="dark-content">
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={{
            marginTop: hp(24),
            marginLeft: wp(24),
            height: hp(24),
            width: wp(20),
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/Icons/backIcon.png')} />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            { paddingHorizontal: wp(24), marginTop: hp(52) },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              {
                width: wp(64),
                height: wp(64),
                borderRadius: wp(32),
                marginBottom: hp(20),
              },
            ]}
          >
            <Image
              source={require('../assets/Icons/KycIcon.png')}
              style={{
                width: wp(32),
                height: wp(32),
                resizeMode: 'contain',
              }}
            />
          </View>

          <Text style={[styles.title, { fontSize: fp(24) }]}>
            Complete KYC Verification
          </Text>

          <Text
            style={[
              styles.subtitle,
              { fontSize: fp(15), marginTop: hp(8), marginBottom: hp(24) },
            ]}
          >
            We need to verify your identity before you can{'\n'}start borrowing
            items
          </Text>

          <View
            style={[
              styles.adhaarBox,
              { padding: wp(16), marginBottom: hp(8), borderRadius: wp(10) },
            ]}
          >
            <View>
              <Image
                source={require('../assets/Icons/Adhaar.png')}
                style={{ height: hp(20), width: wp(20), resizeMode: 'contain' }}
              />
            </View>
            <View>
              <Text style={[styles.adhaarTitle, { fontSize: fp(16) }]}>
                Aadhar Card Verification
              </Text>
              <Text style={[styles.adhaarSub, { fontSize: fp(14) }]}>
                Required for address proof
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.inputBox,
              {
                justifyContent: 'center',
                paddingHorizontal: wp(16),
                height: hp(53),
              },
            ]}
          >
            <TextInput
              placeholder="Enter your Adhaar Number"
              placeholderTextColor="#0A0A0A80"
              style={[
                styles.input,
                {
                  fontSize: fp(16),
                  lineHeight: hp(20),
                },
              ]}
              keyboardType="number-pad"
              maxLength={12}
              value={adhaar}
              onChangeText={setAdhaar}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {
                justifyContent: 'center',
                height: hp(54),
                borderRadius: hp(14),
                marginBottom: hp(214),
                marginTop: hp(20),
              },
            ]}
            onPress={() => {
              if (!/^\d{12}$/.test(adhaar)) {
                return Toast.show({
                  type: 'error',
                  text1: 'Enter valid Adhaar Number',
                });
              }
              setShowLocationModal(true);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { fontSize: fp(16), marginBottom: hp(0) },
              ]}
            >
              Verify & Login →
            </Text>
          </TouchableOpacity>
          <LocationModal
            visible={showLocationModal}
            onClose={() => setShowLocationModal(false)}
          />
          <Text
            style={[styles.skipText, { fontSize: fp(16), marginBottom: hp(0) }]}
          >
            Skip for now (can verify later)
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </Screen>
  );
};

export default AdharCardVerification;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
  },

  iconCircle: {
    backgroundColor: '#FFE7F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },

  title: {
    fontWeight: '700',
    color: '#1A1A1A',
  },

  subtitle: {
    color: '#4A5565',
    lineHeight: 21,
    fontWeight: 400,
    fontFamily: 'Helvetica',
  },

  adhaarBox: {
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },

  adhaarTitle: {
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },

  adhaarSub: {
    marginTop: 3,
    color: '#777',
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: 15,
  },

  input: {
    color: '#000',
  },

  button: {
    backgroundColor: '#FC156A',
    alignItems: 'center',
    elevation: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  skipText: {
    textAlign: 'center',
    color: '#FC156A',
    fontWeight: 400,
    fontFamily: 'Helvetica',
  },
});

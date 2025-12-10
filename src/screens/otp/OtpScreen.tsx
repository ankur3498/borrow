import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Toast from 'react-native-toast-message';

type OtpRouteProp = RouteProp<RootStackParamList, 'OtpScreen'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'Information'>;
const OtpScreen = () => {
  const route = useRoute<OtpRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { phone } = route.params;
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState('');

  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
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
          <Image source={require('../../assets/images/backIcon.png')} />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            { paddingHorizontal: wp(24), paddingTop: hp(52) },
          ]}
        >
          <Text style={[styles.title, { fontSize: fp(28) }]}>Enter OTP</Text>
          <Text style={styles.subtitle}>OTP sent to +91 {phone}</Text>

          <TextInput
            style={[
              styles.otpInput,
              { width: wp(345), height: hp(53), fontSize: fp(16) },
            ]}
            placeholder="Enter 6 digit OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={[styles.btn, { width: wp(345), height: hp(54) }]}
            onPress={() => {
              if (!otp) {
                return Toast.show({ type: 'error', text1: 'Enter the OTP' });
              }

              if (!/^\d{6}$/.test(otp)) {
                return Toast.show({
                  type: 'error',
                  text1: 'Enter a valid 6-digit OTP',
                });
              }

              // if (!agree) {
              //   return Toast.show({
              //     type: 'error',
              //     text1: 'Confirm the Terms of Service',
              //   });
              // }

              navigation.navigate('Information');
            }}
          >
            <Text style={[styles.btnText, { fontSize: fp(16) }]}>
              Verify & Login →
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAgree(!agree)}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(20),
              marginBottom: hp(10),
            }}
          >
            {/* <View
              style={{
                width: wp(18),
                height: wp(18),
                borderRadius: 4,
                borderWidth: 1,
                borderColor: agree ? '#FF2D92' : '#FC156A',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp(10),
                backgroundColor: agree ? '#FF2D92' : 'transparent',
              }}
            >
              {agree && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: fp(12),
                    fontWeight: 'bold',
                  }}
                >
                  {'\u2713'}
                </Text>
              )}
            </View> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeText}>Change Number</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1 },
  title: { fontWeight: '700', color: '#1A1A1A' },
  subtitle: { color: '#6A6A6A', marginTop: 8, fontSize: 16 },
  otpInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginTop: 26,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
  btnText: { color: '#FFF', fontWeight: '700' },
  changeText: {
    color: '#FC156A',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },
  terms: {
    textAlign: 'center',
    color: '#707070',
  },

  link: {
    color: '#FF2D92',
    fontWeight: '600',
  },
});

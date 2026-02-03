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
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../Screen';
import { RootStackParamList } from '../../navigation/types';
type NavProp = NativeStackNavigationProp<RootStackParamList, 'OtpScreen'>;

const Onboarding = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;
  const [agree, setAgree] = useState(true);
  
//   const sendOtp = async () => {
//   try {
//     const res = await fetch("http://192.168.1.6:3000/api/auth/request-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone }),
//     });

//     const data = await res.json();

//     if (!data.allowOtp) {
//       return Toast.show({ type: "error", text1: "OTP blocked" });
//     }

//     const confirmation = await auth().signInWithPhoneNumber("+91" + phone);

//     navigation.navigate("OtpScreen", {
//       phone: "+91" + phone,
//       confirmation,
//     });

//   } catch (err: any) {
//     console.log("🔥 FIREBASE OTP ERROR:", err);
//     Toast.show({
//       type: "error",
//       text1: "OTP failed",
//       text2: err?.message,
//     });
//   }
// };



  return (
    <Screen bg="#F3F3F3" barStyle="dark-content">
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View
            style={[
              styles.container,
              { paddingHorizontal: wp(24), paddingTop: hp(52) },
            ]}
          >
            <View style={{ paddingBottom: hp(97) }}>
              <Text style={[styles.title, { fontSize: fp(28) }]}>
                Welcome to Barrow
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { fontSize: fp(16), marginTop: hp(6) },
                ]}
              >
                Borrow items from trusted local shops
              </Text>
            </View>

            <View
              style={[
                styles.inputRow,
                {
                  width: wp(345),
                  height: hp(53),
                  alignSelf: 'center',
                },
              ]}
            >
              <View style={styles.countryBox}>
                <Text style={{ fontSize: fp(16), fontWeight: '600' }}>+91</Text>
              </View>

              <TextInput
                placeholder="Enter 10-digit number"
                placeholderTextColor="#9E9E9E"
                style={{
                  flex: 1,
                  paddingHorizontal: 12,
                  color: '#000',
                  fontSize: fp(16),
                }}
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.btn,
                {
                  width: wp(345),
                  height: hp(54),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: hp(20),
                  marginBottom: hp(21),
                },
              ]}
              onPress={() => {
                if (phone.length !== 10) {
                  return Toast.show({
                    type: 'error',
                    text1: 'Invalid Number',
                    text2: 'Please enter 10-digit number',
                  });
                }

                if (!['6', '7', '8', '9'].includes(phone[0])) {
                  return Toast.show({
                    type: 'error',
                    text1: 'Invalid Number',
                    text2: 'Number must start with 6, 7, 8 or 9',
                  });
                }

                if (!/^\d{10}$/.test(phone)) {
                  return Toast.show({
                    type: 'error',
                    text1: 'Enter valid Phone number',
                  });
                }

                if (!agree) {
                  return Toast.show({
                    type: 'error',
                    text1: 'Confirm the Terms of Service',
                  });
                }
                navigation.navigate('OtpScreen',{phone})
                // sendOtp();
              }}
            >
              <Text style={[styles.btnText, { fontSize: fp(16) }]}>
                Send OTP {''}
                <Text style={{ fontSize: fp(25) }}>→ </Text>
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
              <View
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
              </View>

              <Text style={[styles.terms, { fontSize: fp(14) }]}>
                By continuing, you agree to our{' '}
                <Text style={styles.link}>Terms of Service.</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  title: { fontWeight: '700', color: '#1A1A1A' },
  subtitle: { color: '#6A6A6A' },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DC',
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryBox: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: '100%',
  },
  countryText: { fontWeight: '600', color: '#333' },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#000',
    backgroundColor: '#FFFFFF',
  },
  btn: {
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    alignSelf: 'center',
  },
  btnText: { fontWeight: '700', color: '#FFF' },
  terms: {
    textAlign: 'center',
    color: '#707070',
  },

  link: {
    color: '#FF2D92',
    fontWeight: '600',
  },
});

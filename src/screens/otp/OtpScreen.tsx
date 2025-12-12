import React, { useRef, useState } from 'react';
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

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const { width, height } = useWindowDimensions();
  const hp = (px: number) => (px / 390) * height;
  const wp = (px: number) => (px / 390) * width;
  const fp = (px: number) => (px / 390) * width;

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (text === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      return Toast.show({
        type: 'error',
        text1: 'Enter a valid 6-digit OTP',
      });
    }

    navigation.navigate('Information');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={{
            marginTop: 20,
            marginLeft: 24,
            height: 24,
            width: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/backIcon.png')} />
        </TouchableOpacity>

        {/* Body */}
        <View style={{ paddingHorizontal: wp(24), paddingTop: hp(22) }}>
          <Text style={[styles.title, { fontSize: fp(28) }]}>Enter OTP</Text>
          <Text style={styles.subtitle}>OTP sent to +91 {phone}</Text>

          {/* OTP BOXES */}
          <View style={[styles.otpRow, { paddingTop: hp(35) }]}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  {
                    width: wp(50),
                    height: wp(55),
                    fontSize: fp(22),
                    borderColor: digit ? '#FC156A' : '#D9D9D9',
                    backgroundColor: digit ? '#FC156A14' : '#ffff',
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  nativeEvent.key === 'Backspace' &&
                  handleBackspace(digit, index)
                }
              />
            ))}
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={[styles.btn, { width: wp(345), height: 54 }]}
            onPress={handleVerify}
          >
            <Text style={[styles.btnText, { fontSize: fp(16) }]}>
              Verify & Login →
            </Text>
          </TouchableOpacity>

          {/* Change Number */}
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

  title: {
    fontWeight: '700',
    color: '#1A1A1A',
  },

  subtitle: {
    color: '#6A6A6A',
    marginTop: 8,
    fontSize: 16,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 20,
  },

  otpBox: {
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    color: '#000',
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
});

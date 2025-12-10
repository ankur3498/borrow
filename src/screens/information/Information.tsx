import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
type NavProp = NativeStackNavigationProp<RootStackParamList, 'KycVerification'>;
const Information = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;
  const [agree, setAgree] = useState(false);
  return (
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
          <Image source={require('../../assets/images/backIcon.png')} />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            { paddingHorizontal: wp(24), marginTop: hp(52) },
          ]}
        >
          <Text style={[styles.title, { fontSize: fp(28) }]}>
            Your Information
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: fp(16), marginTop: hp(6), marginBottom: hp(40) },
            ]}
          >
            Enter your full name.
          </Text>

          {/* Input */}
          <View
            style={[
              styles.inputBox,
              {
                paddingVertical: hp(9),
                paddingHorizontal: wp(18),
                height: hp(53.07),
              },
            ]}
          >
            <TextInput
              placeholder="Your name"
              placeholderTextColor="#A7A7A7"
              style={[styles.input, { fontSize: fp(16) }]}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: hp(16),
                paddingHorizontal: wp(81),
                borderRadius: hp(14),
                height: hp(54),
              },
            ]}
            onPress={() => {
              if(!name){
                return Toast.show(
                  {
                    type:'error',
                    text1:'Enter Your Name'
                  }
                )
              }
              navigation.navigate('KycVerification');
            }}
          >
            <Text style={[styles.buttonText, { fontSize: fp(17) }]}>
              Save & Continue
            </Text>
          </TouchableOpacity>

          {/* Footer Terms */}
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
            <Text style={[styles.terms, { fontSize: fp(14) }]}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms of Service.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Information;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
  },

  title: {
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    color: '#6B6B6B',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    marginBottom: 25,
    backgroundColor: '#FFF',
  },

  input: {
    color: '#000',
  },

  button: {
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#FC156A',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
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

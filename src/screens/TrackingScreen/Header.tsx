import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const wp = (v: number) => (width / 390) * v;
const hp = (v: number) => (height / 812) * v;
const fp = (v: number) => (width / 390) * v;
const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={{ padding: hp(24), backgroundColor: '#FFFFFF' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/Icons/backIcon.png')}
            style={{ height: hp(24), width: wp(24), tintColor: '#202735' }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Track Order</Text>
        <Text style={styles.subHeading}>Order #542314</Text>
      </View>
      <View
        style={{
          backgroundColor: '#C10349',
          marginHorizontal: wp(10),
          borderBottomLeftRadius: hp(16),
          borderBottomRightRadius: hp(16),
        }}
      >
        <View style={{ padding: hp(24), flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/Icons/backIcon.png')}
              style={{ height: hp(24), width: wp(24), tintColor: '#ffffffff' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    fontSize: fp(28),
    fontWeight: '700',
    fontFamily: 'Helvetica',
    marginTop: hp(24),
  },
  subHeading: {
    fontSize: fp(16),
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginTop: hp(8),
    color: '#4A5565',
  },
});

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
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: hp(68),
          padding: wp(25),
        }}
      >
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
        <View
          style={{
            padding: hp(16),
            flex: 1,
            flexDirection: 'row',
            gap: wp(16),
          }}
        >
          <Image
            source={require('../../assets/Icons/truckIcon.png')}
            style={{ height: hp(32), width: wp(32)}}
          />
          <View style={{ flexDirection: 'column',width:wp(293),gap:hp(4)}}>
            <Text
              style={{
                fontSize: fp(20),
                fontWeight: '400',
                fontFamily: 'Helvetica',
                color: '#FFFFFF',
              }}
            >
              Out for Delivery
            </Text>
            <Text
              style={{
                fontSize: fp(14),
                fontWeight: '400',
                fontFamily: 'Helvetica',
                color: '#FFFFFF',
              }}
            >
              Your items have been delivered. Please confirm receipt.
            </Text>
          </View>
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

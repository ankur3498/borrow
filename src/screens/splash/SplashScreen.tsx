import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StoreIcon from '../splash/store.svg';

console.log('StoreIcon ->', StoreIcon);
console.log('typeof StoreIcon ->', typeof StoreIcon);

const { width } = Dimensions.get('window');
const iconSize = width * 0.25;

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconBackground}>
          <StoreIcon width={iconSize} height={iconSize} fill="#e83e74" />
        </View>
        <Text style={styles.tagline}>Borrow</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    width: iconSize * 1.5,
    height: iconSize * 1.5,
    borderRadius: (iconSize * 1.5) / 2,
    backgroundColor: '#fde7ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: '700',
    color: '#FC156A',
  },
});

export default SplashScreen;

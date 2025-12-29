import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Header from './Header';
import DeliveryProgress from './DeliveryStatus';
import Screen from '../Screen';
import BottomTabs from '../../navigation/BottomTab';
import OrderSummarySection from './OrderSummary';
const Tracking = () => {
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;
  return (
    <Screen bg="#fdfcfcff" barStyle="dark-content">
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(70),
            backgroundColor: '#F6F8FC',
          }}
        >
          <Header />
          <DeliveryProgress />
          <OrderSummarySection/>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default Tracking;

const styles = StyleSheet.create({});

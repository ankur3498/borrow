import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { ordersData } from '../../components/data';
import Screen from '../Screen';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const { width, height } = Dimensions.get('window');
type NavProp = NativeStackNavigationProp<RootStackParamList, 'TrackingScreen'>;
// 🔹 Responsive helpers (Design: 390 x 812)
const wp = (v: number) => (width / 390) * v;
const hp = (v: number) => (height / 812) * v;
const fp = (v: number) => (width / 390) * v;

const MyOrders = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <Screen bg="#FFFFFF" barStyle="dark-content">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(80) }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingTop: hp(68),
            padding: wp(24),
            elevation: 6,
          }}
        >
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
              source={require('../../assets/Icons/backIcon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subTitle}>Track and manage your orders</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Ongoing Orders ({ordersData.length})
        </Text>

        {ordersData.map((item, index) => (
          <View key={item.id} style={styles.card}>
            {/* Top Row */}
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>Order #{item.id}</Text>

              <View style={styles.statusBadge}>
                <Image
                  source={require('../../assets/Icons/truckIcon.png')}
                  style={styles.truckIcon}
                />
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.dateText}>{item.date}</Text>

            <View style={styles.divider} />

            <View style={styles.productRow}>
              <Image source={item.product.image} style={styles.productImage} />

              <View>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.qty}>Qty: {item.product.qty}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{item.total}</Text>
            </View>

            <TouchableOpacity style={styles.trackBtn} onPress={()=>navigation.navigate('TrackingScreen')}>
              <Image
                source={require('../../assets/Icons/eyeIcon.png')}
                style={styles.eyeIcon}
              />
              <Text style={styles.trackText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },

  backIcon: {
    width: wp(24),
    height: wp(24),
    marginBottom: hp(24),
  },

  title: {
    fontSize: fp(28),
    fontWeight: '700',
    color: '#202735',
  },

  subTitle: {
    marginTop: hp(8),
    fontSize: fp(16),
    fontWeight: '400',
    color: '#6B7280',
  },

  sectionTitle: {
    marginTop: hp(16),
    marginHorizontal: wp(10),
    fontSize: fp(16),
    fontWeight: '400',
    color: '#111827',
  },

  /* CARD */
  card: {
    marginTop: hp(12),
    marginHorizontal: wp(10),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(16),
    padding: wp(16),
    elevation: 1,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: fp(14),
    fontWeight: '400',
    color: '#4A5565',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16A34A',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: wp(20),
  },

  truckIcon: {
    width: wp(14),
    height: wp(14),
    tintColor: '#FFF',
    marginRight: wp(6),
  },

  statusText: {
    color: '#FFFFFF',
    fontSize: fp(12),
    fontWeight: '600',
  },

  dateText: {
    marginTop: hp(7.9),
    fontSize: fp(14),
    color: '#6A7282',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: hp(14),
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productImage: {
    width: wp(52),
    height: wp(52),
    borderRadius: wp(10),
    marginRight: wp(12),
  },

  productName: {
    fontSize: fp(14),
    fontWeight: '400',
    color: '#101828',
  },

  qty: {
    marginTop: hp(4),
    fontSize: fp(13),
    color: '#6B7280',
  },

  totalLabel: {
    fontSize: fp(15),
    color: '#374151',
  },

  totalAmount: {
    fontSize: fp(18),
    fontWeight: '400',
    color: '#101828',
  },

  trackBtn: {
    marginTop: hp(18),
    backgroundColor: '#F91C6E',
    height: hp(50),
    borderRadius: wp(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  eyeIcon: {
    width: wp(18),
    height: wp(18),
    tintColor: '#FFFFFF',
    marginRight: wp(8),
  },

  trackText: {
    color: '#FFFFFF',
    fontSize: fp(16),
    fontWeight: '600',
  },
});

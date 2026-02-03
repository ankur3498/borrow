import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../Screen';
const { width, height } = Dimensions.get('window');
const wp = (v: number): number => (width / 390) * v;
const hp = (v: number): number => (height / 812) * v;
const fp = (v: number): number => (width / 390) * v;

const MyRequest = () => {
  const [qty, setQty] = useState(1);
  const pricePerDay = 80;
  const navigation = useNavigation();

  return (
    <Screen bg="#FFFFFF" barStyle="dark-content">
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f6f8' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/Icons/backIcon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={{gap:8}}>
            <Text style={styles.headerTitle}>My Cart</Text>
            <Text
              style={{ color: '#4A5565', fontWeight: '400', fontSize: wp(16) }}
            >
              Track and manage your orders
            </Text>
          </View>
        </View>

        <View style={styles.pagePadding}>
          <View style={styles.card}>
            <Text style={styles.smallText}>Borrowing from</Text>
            <Text style={styles.storeName}>Home Essentials Store</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.productTop}>
              <Image source={require("../../assets/Icons/Images/HealthCare.png")}/>
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>Pressure Cooker</Text>
                <Text style={styles.desc}>
                  5L capacity, perfect for family cooking
                </Text>
                <Text style={styles.price}>₹{pricePerDay} per day</Text>
              </View>

              <TouchableOpacity>
                <Image source={require("../../assets/Icons/delete.png")} style={{height:hp(20),width:wp(20)}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
              <View style={styles.qtyBox}>
                <TouchableOpacity
                  style={styles.qtyCircle}
                  onPress={() => qty > 1 && setQty(qty - 1)}
                >
                  <Text style={styles.qtyBtn}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyValue}>{qty}</Text>

                <TouchableOpacity
                  style={styles.qtyCircle}
                  onPress={() => setQty(qty + 1)}
                >
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subtotalText}>
                Subtotal: ₹{qty * pricePerDay}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Amount</Text>
              <Text style={styles.totalPrice}>₹{qty * pricePerDay}</Text>
            </View>

            <TouchableOpacity style={styles.sendBtn}>
              <Image source={require("../../assets/Icons/sendIcon.png")} style={{height:hp(18),width:(18)}}/>
              <Text style={styles.sendText}>Send Borrow Request</Text>
            </TouchableOpacity>

            <Text style={styles.note}>Shop owner will review your request</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default MyRequest;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    gap: hp(24),
    paddingTop: hp(54),
    paddingBottom:hp(24),
    paddingHorizontal:wp(24),
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  backIcon: {
    height: hp(24),
    width: wp(24),
    tintColor: '#111827',
    marginRight: wp(6),
  },

  backText: {
    fontSize: fp(14),
    fontWeight: '500',
    color: '#111827',
  },

  headerTitle: {
    fontSize: fp(28),
    fontWeight: '700',
    color: '#111827',
  },

  pagePadding: {
    padding: wp(14),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: wp(14),
    padding: wp(14),
    marginBottom: hp(16),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },

  smallText: {
    fontSize: fp(16),
    color: '#6b7280',
    fontWeight:'400'
  },

  storeName: {
    fontSize: fp(20),
    fontWeight: '500',
    color: '#111827',
    marginTop: hp(4),
  },

  productTop: {
    flexDirection: 'row',
    gap:wp(16),
    alignItems: 'flex-start',
  },

  productTitle: {
    fontSize: fp(18),
    fontWeight: '500',
    color: '#111827',
  },

  desc: {
    fontSize: fp(16),
    color: '#6b7280',
    marginTop: hp(4),
    lineHeight: fp(24),
    maxWidth: '95%',
    fontWeight:'400'
  },

  price: {
    fontSize: fp(14),
    fontWeight: '600',
    color: '#ff2d7a',
    marginTop: hp(6),
  },

  deleteIcon: {
    fontSize: fp(18),
    marginLeft: wp(6),
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(18),
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyCircle: {
    width: wp(29),
    height: wp(31),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyBtn: {
    fontSize: fp(16),
    fontWeight: '400',
    color: '#111827',
  },

  qtyValue: {
    fontSize: fp(14),
    fontWeight: '600',
    marginHorizontal: wp(14),
    color: '#111827',
  },

  subtotalText: {
    fontSize: fp(14),
    fontWeight: '500',
    color: '#374151',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(16),
  },

  totalText: {
    fontSize: fp(16),
    color: '#374151',
    fontWeight:'400'
  },

  totalPrice: {
    fontSize: fp(16),
    fontWeight: '400',
    color: '#111827',
  },

  sendBtn: {
    flexDirection:"row",
    backgroundColor: '#ff1466',
    paddingVertical: hp(14),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent:'center',
    gap:wp(10)
  },

  sendText: {
    color: '#ffffff',
    fontSize: fp(16),
    fontWeight: '400',
  },

  note: {
    textAlign: 'center',
    fontSize: fp(16),
    color: '#6A7282',
    marginTop: hp(12),
  },
});

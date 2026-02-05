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
import { useNavigation, useRoute } from '@react-navigation/native';
import Screen from '../Screen';
import { sellers } from '../../components/data';

const { width, height } = Dimensions.get('window');

const wp = (v: number): number => (width / 390) * v;
const hp = (v: number): number => (height / 812) * v;
const fp = (v: number): number => (width / 390) * v;

type CartType = {
  [key: number]: number;
};

interface CartItem {
  id: number;
  name: string;
  image: any;
  measure: string;
  price: number;
  qty: number;
}

const MyRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { cart: initialCart } = route.params as { cart: CartType };

  const [cart, setCart] = useState<CartType>(initialCart);

  const increase = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setCart(prev => {
      const val = (prev[id] || 0) - 1;

      if (val <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return { ...prev, [id]: val };
    });
  };

  const removeItem = (id: number) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };


  const cartItems: CartItem[] = Object.entries(cart)
    .map(([id, qty]: [string, number]) => {
      const product = sellers.find(p => p.id === Number(id));

      if (!product) return null;

      return {
        ...product,
        qty,
      };
    })
    .filter(Boolean) as CartItem[];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

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

          <View style={{ gap: 8 }}>
            <Text style={styles.headerTitle}>My Cart</Text>

            <Text
              style={{
                color: '#4A5565',
                fontWeight: '400',
                fontSize: wp(16),
              }}
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
          {cartItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: wp(12),
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: wp(70),
                    height: wp(70),
                    borderRadius: wp(12),
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.productTitle}>{item.name}</Text>

                  <Text style={styles.desc}>{item.measure}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: hp(8),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        borderRadius: wp(8),
                        paddingHorizontal: wp(6),
                        paddingVertical: hp(4),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => decrease(item.id)}
                      >
                        <Text style={styles.qtyBtn}>−</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginHorizontal: wp(10),
                          fontWeight: '600',
                          fontSize: fp(14),
                        }}
                      >
                        {item.qty}
                      </Text>

                      <TouchableOpacity
                        onPress={() => increase(item.id)}
                      >
                        <Text style={styles.qtyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        marginLeft: wp(12),
                        fontSize: fp(14),
                        color: '#374151',
                        fontWeight: '500',
                      }}
                    >
                      Subtotal: ₹{item.qty * item.price}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                >
                  <Image
                    source={require('../../assets/Icons/delete.png')}
                    style={{
                      width: wp(18),
                      height: wp(18),
                      tintColor: '#EF4444',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.card}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Amount</Text>

              <Text style={styles.totalPrice}>₹{totalAmount}</Text>
            </View>

            <TouchableOpacity style={styles.sendBtn}>
              <Image
                source={require('../../assets/Icons/sendIcon.png')}
                style={{ height: hp(18), width: 18 }}
              />

              <Text style={styles.sendText}>
                Send Borrow Request
              </Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              Shop owner will review your request
            </Text>
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
    paddingBottom: hp(24),
    paddingHorizontal: wp(24),
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  backIcon: {
    height: hp(24),
    width: wp(24),
    tintColor: '#111827',
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
  },

  storeName: {
    fontSize: fp(20),
    fontWeight: '500',
    color: '#111827',
    marginTop: hp(4),
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
  },

  qtyBtn: {
    fontSize: fp(16),
    fontWeight: '400',
    color: '#111827',
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
  },

  totalPrice: {
    fontSize: fp(16),
    fontWeight: '400',
    color: '#111827',
  },

  sendBtn: {
    flexDirection: 'row',
    backgroundColor: '#ff1466',
    paddingVertical: hp(14),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(10),
  },

  sendText: {
    color: '#ffffff',
    fontSize: fp(16),
  },

  note: {
    textAlign: 'center',
    fontSize: fp(16),
    color: '#6A7282',
    marginTop: hp(12),
  },
});

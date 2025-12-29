import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const OrderSummarySection = () => {
  const { width, height } = useWindowDimensions();

  // responsive helpers
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;

  return (
    <View style={{ marginTop: hp(14) }}>
      {/* ================= ORDER DETAILS ================= */}
      <View style={[styles.card, { marginHorizontal: wp(12) }]}>
        <Text style={[styles.heading, { fontSize: fp(16) }]}>
          Order Details
        </Text>

        <View style={{ height: hp(12) }} />

        <View style={styles.itemRow}>
          <Image
            source={require('../../assets/Icons/Images/rice.png')}
            style={{
              width: wp(44),
              height: wp(44),
              borderRadius: wp(8),
            }}
          />

          <View style={{ marginLeft: wp(12), flex: 1 }}>
            <Text style={[styles.itemName, { fontSize: fp(15) }]}>
              Basmati Rice
            </Text>
            <Text style={[styles.subText, { fontSize: fp(13) }]}>
              Qty : 2 × ₹450
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { marginVertical: hp(14) }]} />

        <View style={styles.rowBetween}>
          <Text style={[styles.label, { fontSize: fp(14) }]}>
            Total Items
          </Text>
          <Text style={[styles.value, { fontSize: fp(14) }]}>2</Text>
        </View>

        <View style={[styles.rowBetween, { marginTop: hp(6) }]}>
          <Text style={[styles.label, { fontSize: fp(14) }]}>
            Total Amount
          </Text>
          <Text style={[styles.amount, { fontSize: fp(15) }]}>₹900</Text>
        </View>
      </View>

      {/* ================= DELIVERY ADDRESS ================= */}
      <View
        style={[
          styles.addressCard,
          {
            marginHorizontal: wp(12),
            marginTop: hp(14),
            padding: wp(14),
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/Icons/locationIcon.png')}
            style={{
              width: wp(18),
              height: wp(18),
              tintColor: '#F43F5E',
            }}
          />
          <Text
            style={[
              styles.addressTitle,
              { fontSize: fp(14), marginLeft: wp(8) },
            ]}
          >
            Delivery Address
          </Text>
        </View>

        <Text
          style={[
            styles.addressText,
            { fontSize: fp(14), marginTop: hp(6) },
          ]}
        >
          Koramangala, Bangalore, Karnataka
        </Text>
      </View>

      {/* ================= NEED HELP ================= */}
      <View
        style={[
          styles.card,
          {
            marginHorizontal: wp(12),
            marginTop: hp(14),
            alignItems: 'center',
          },
        ]}
      >
        <Text style={[styles.helpTitle, { fontSize: fp(15) }]}>
          Need Help?
        </Text>

        <Text
          style={[
            styles.helpText,
            {
              fontSize: fp(13),
              marginTop: hp(6),
              textAlign: 'center',
            },
          ]}
        >
          Contact the shop directly for any queries about your order.
        </Text>

        <TouchableOpacity
          style={[
            styles.helpButton,
            {
              marginTop: hp(14),
              paddingVertical: hp(10),
            },
          ]}
        >
          <Text style={[styles.helpBtnText, { fontSize: fp(14) }]}>
            Help
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSummarySection;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  heading: {
    fontWeight: '600',
    color: '#111827',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    fontWeight: '600',
    color: '#111827',
  },

  subText: {
    color: '#6B7280',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    color: '#6B7280',
  },

  value: {
    color: '#111827',
    fontWeight: '500',
  },

  amount: {
    color: '#111827',
    fontWeight: '700',
  },

  addressCard: {
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
  },

  addressTitle: {
    fontWeight: '600',
    color: '#111827',
  },

  addressText: {
    color: '#374151',
    fontWeight: '400',
  },

  helpTitle: {
    fontWeight: '600',
    color: '#111827',
  },

  helpText: {
    color: '#6B7280',
  },

  helpButton: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F43F5E',
    alignItems: 'center',
  },

  helpBtnText: {
    color: '#F43F5E',
    fontWeight: '600',
  },
});

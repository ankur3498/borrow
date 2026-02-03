import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';

const steps = [
  {
    title: 'Order Placed',
    time: '18 Dec, 02:41 pm',
    icon: require('../../assets/Icons/truckIcon.png'),
    done: true,
  },
  {
    title: 'Confirmed by Shop',
    time: '18 Dec, 02:46 pm',
    icon: require('../../assets/Icons/tickIcon.png'),
    done: true,
  },
  {
    title: 'Items Being Prepared',
    time: '18 Dec, 02:56 pm',
    icon: require('../../assets/Icons/truckIcon.png'),
    done: true,
  },
  {
    title: 'Out for Delivery',
    time: '18 Dec, 03:06 pm',
    subtitle: 'Delivery executive is on the way',
    icon: require('../../assets/Icons/truckIcon.png'),
    done: false,
  },
  {
    title: 'Delivered',
    icon: require('../../assets/Icons/tickIcon.png'),
    done: false,
  },
];

const DeliveryProgress = () => {
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (width / 390) * v;
  const hp = (v: number) => (height / 812) * v;
  const fp = (v: number) => (width / 390) * v;

  return (
    <View style={[styles.card, { padding: wp(16), marginHorizontal: wp(10), marginTop: hp(20) }]}>
      <Text style={[styles.heading, { fontSize: fp(18), marginBottom: hp(16) }]}>
        Delivery Progress
      </Text>

      {steps.map((item, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={index} style={[styles.row, { marginBottom: hp(20) }]}>
            {/* LEFT ICON + LINE */}
            <View style={[styles.left, { width: wp(40) }]}>
              <View
                style={[
                  styles.circle,
                  {
                    height: wp(44),
                    width: wp(44),
                    borderRadius: wp(22),
                    backgroundColor: item.done ? '#16A34A' : '#E5E7EB',
                  },
                ]}
              >
                {item.icon && (
                  <Image
                    source={item.icon}
                    style={{
                      height: wp(20),
                      width: wp(20),
                      tintColor: '#fff',
                    }}
                  />
                )}
              </View>

              {!isLast && (
                <View
                  style={[
                    styles.line,
                    {
                      height: hp(30),
                      backgroundColor: item.done ? '#16A34A' : '#E5E7EB',
                    },
                  ]}
                />
              )}
            </View>

            <View style={[styles.content, { paddingLeft: wp(12) }]}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: fp(16),
                    color: item.done ? '#111827' : '#9CA3AF',
                  },
                ]}
              >
                {item.title}
              </Text>

              {item.time && (
                <Text style={[styles.time, { fontSize: fp(13), marginTop: hp(2) }]}>
                  {item.time}
                </Text>
              )}

              {item.subtitle && (
                <Text style={[styles.subtitle, { fontSize: fp(13), marginTop: hp(4) }]}>
                  {item.subtitle}
                </Text>
              )}
            </View>

            {item.done && (
              <Image
                source={require('../../assets/Icons/tickIcon.png')}
                style={{
                  height: wp(22),
                  width: wp(22),
                  tintColor: '#16A34A',
                  marginTop: hp(2),
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default DeliveryProgress;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  heading: {
    fontWeight: '600',
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
  },

  left: {
    alignItems: 'center',
  },

  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },

  content: {
    flex: 1,
  },

  title: {
    fontWeight: '600',
  },

  time: {
    color: '#6B7280',
  },

  subtitle: {
    color: '#2563EB',
  },
});

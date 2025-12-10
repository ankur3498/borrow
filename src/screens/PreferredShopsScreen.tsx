import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const shops = [
  {
    id: '1',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '2',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '3',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
];

const PreferredShopsScreen = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER ICON */}
      <View style={styles.headerIconBox}>
        <Image
          source={require('../assets/images/Adhaar.png')}
          style={{ width: 32, height: 32, tintColor: '#ff2d87' }}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>Select Preferred Shops</Text>
      <Text style={styles.subtitle}>
        Choose shops you want to borrow items from
      </Text>

      {/* LOCATION CARD */}
      <View style={[styles.locationCard,{marginBottom:20}]}>
        <View>
          <Text style={styles.locationText}>Koramangala,</Text>
          <Text style={styles.locationText}>Bangalore, Karnataka</Text>
        </View>

        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* SHOP LIST */}
      <FlatList
        data={shops}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 120,gap:5}}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.id;

          return (
            <TouchableOpacity
              style={[styles.shopCard, isSelected && styles.shopCardSelected]}
              onPress={() => setSelectedId(item.id)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isSelected && styles.iconWrapperSelected,
                ]}
              >
                <Image
                  source={require('../assets/images/Adhaar.png')}
                  style={[
                    styles.shopIcon,
                    isSelected && { tintColor: '#ff2d87' },
                  ]}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={[styles.shopName, isSelected && { color: '#ff2d87' }]}
                >
                  {item.name}
                </Text>
                <Text style={styles.shopArea}>{item.area}</Text>
              </View>

              <Text
                style={[
                  styles.distanceText,
                  isSelected && { color: '#ff2d87' },
                ]}
              >
                {item.distance}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBtnWrapper}>
        <TouchableOpacity
          disabled={!selectedId}
          style={[styles.bottomBtn, selectedId && styles.bottomBtnActive]}
        >
          <Text style={styles.bottomBtnText}>Verify & Login →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PreferredShopsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 52,
  },

  headerIconBox: {
    width: 72,
    height: 72,
    borderRadius: 40,
    backgroundColor: '#ffe7f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: '#6b6b6b',
    marginTop: 4,
  },

  locationCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 18,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  locationText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },

  changeBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    elevation: 2,
  },

  changeBtnText: {
    color: '#ff2d87',
    fontWeight: '600',
  },

  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },

  shopCardSelected: {
    borderColor: '#ff2d87',
    borderWidth: 2,
    backgroundColor: '#fff0f6',
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  iconWrapperSelected: {
    backgroundColor: '#ff2d87',
  },

  shopIcon: {
    width: 28,
    height: 28,
    tintColor: '#7b7b7b',
  },

  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  shopArea: {
    fontSize: 13,
    color: '#606060',
    marginTop: 2,
  },

  distanceText: {
    color: '#7b7b7b',
    fontSize: 15,
    fontWeight: '600',
  },

  bottomBtnWrapper: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    paddingHorizontal: 22,
  },

  bottomBtn: {
    backgroundColor: '#d5d5d5',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  bottomBtnActive: {
    backgroundColor: '#ff2d87',
  },

  bottomBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});

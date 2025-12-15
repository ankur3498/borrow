import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { category } from '../../components/data';
import { shops } from '../../components/data';
import HomeScreen2 from './FrequentlyOrdered';
import BestSellers from './BestSellers';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: hp(230),
          backgroundColor: '#C10349',
          borderBottomLeftRadius: wp(16),
          borderBottomRightRadius: wp(16),
          paddingHorizontal: wp(16),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: hp(52),
          }}
        >
          <View>
            <Text
              style={{
                fontSize: fp(15),
                color: '#FFF',
                fontWeight: '400',
              }}
            >
              Mayur Vihar Phase-1
            </Text>

            <MaskedView
              maskElement={
                <Text style={{ fontSize: fp(24), fontWeight: '700' }}>
                  4 minutes
                </Text>
              }
            >
              <LinearGradient
                colors={['#FFEDF4', '#FF88B4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={{ opacity: 0, fontSize: fp(24) }}>4 minutes</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          <TouchableOpacity
            style={{
              width: wp(36),
              height: wp(36),
              borderRadius: wp(18),
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../../assets/Icons/backIcon.png')}
              style={{ width: wp(16), height: wp(16), tintColor: '#fff' }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp(20),
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: hp(48),
              borderRadius: hp(14),
              backgroundColor: '#FFF',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp(16),
              width: wp(245),
              marginRight: wp(10),
            }}
          >
            <Image
              source={require('../../assets/Icons/SearchIcon.png')}
              style={{ width: wp(18), height: wp(18), marginRight: wp(10) }}
            />
            <TextInput
              placeholder="Search for products..."
              placeholderTextColor="#8A8F9A"
              style={{
                flex: 1,
                fontSize: fp(15),
                color: '#202735',
              }}
            />
          </View>

          <View
            style={{
              height: hp(48),
              width: wp(105),
              borderRadius: hp(14),
              backgroundColor: '#FFC43C',
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <FlatList
              data={shops}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: wp(105),
                    height: hp(48),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: wp(16),
                      height: wp(16),
                      marginRight: wp(6),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fp(14),
                      fontWeight: '700',
                      color: '#1A1A1A',
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )}
            />

            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                bottom: hp(3.5),
                alignSelf: 'center',
                flexDirection: 'row',
              }}
            >
              {shops.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: activeIndex === index ? 8 : 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      activeIndex === index ? '#202735' : '#D9D9D9',
                    marginHorizontal: 2,
                  }}
                />
              ))}
            </View>
          </View>
        </View>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            alignItems: 'center',
            gap: wp(24),
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: wp(38),
                height: hp(18),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: wp(24),
                  height: wp(24),
                  marginBottom: hp(6),
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontSize: fp(12),
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <HomeScreen2 />
      <BestSellers/>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

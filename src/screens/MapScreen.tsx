import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type Props = {
  location: {
    latitude: number;
    longitude: number;
  };
  onLocationChange: (loc: { latitude: number; longitude: number }) => void;
  onAddressChange: (address: string) => void;
};

const getAddressFromLatLng = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBH_iYNk78CwK7lgKHLM9klWO0epNQ-XLc`,
    );

    const data = await res.json();
    console.log('GEOCODE RESPONSE:', data);

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address;
    }

    if (data.status === 'ZERO_RESULTS') {
      return 'No address found';
    }

    if (data.status === 'REQUEST_DENIED') {
      return 'API key not allowed';
    }

    return 'Unknown location';
  } catch (error) {
    console.log('GEOCODE ERROR:', error);
    return 'Unable to fetch address';
  }
};


const MapScreen = ({ location, onLocationChange, onAddressChange }: Props) => {
  const handleLocationUpdate = async (latitude: number, longitude: number) => {
    onLocationChange({ latitude, longitude });
    const address = await getAddressFromLatLng(latitude, longitude);
    onAddressChange(address);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        scrollEnabled
        zoomEnabled
        pitchEnabled
        rotateEnabled
        onPress={e => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          handleLocationUpdate(latitude, longitude);
        }}
      >
        <Marker
          draggable
          coordinate={location}
          onDragEnd={e => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            handleLocationUpdate(latitude, longitude);
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

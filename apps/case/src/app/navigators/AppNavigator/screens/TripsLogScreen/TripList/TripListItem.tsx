import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Trip } from 'apps/case/src/app/slice/trips/types';
import { CommnunityIcon } from 'apps/case/src/app/components/icons';

interface ITripListItem extends Trip {}

export const TripListItem = (props: ITripListItem) => {
  const LATITUDE_DELTA = 0.00922;
  const LONGITUDE_DELTA = 0.00421;

  const mapViewRef = useRef();

  const { distance, locations, startTime, endTime } = props;

  useEffect(() => {
    mapViewRef.current.fitToCoordinates(
      locations.map((location) => location.coords),
      {
        edgePadding: {
          top: 50,
          bottom: 50,
          right: 50,
          left: 50,
        },
      }
    );
  });
  console.log('----------------- Rendering ----------');

  return (
    <View style={{ elevation: 5, maxWidth: 400 }}>
      <View
        style={{
          flex: 1,
          padding: 5,
          height: 40,
          backgroundColor: 'lightblue',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 4 }}>
          <Text bold size="xl">
            {(distance * 0.001).toFixed(2)} kilometers logged!
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <CommnunityIcon size={20} name="fuel" />
          </View>
          <Text bold size="xl">
            {(distance * 0.001 * 22.5).toFixed(2)}$
          </Text>
        </View>
      </View>
      <MapView
        ref={mapViewRef}
        liteMode={true}
        followsUserLocation
        scrollEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={{ height: 350, width: 400 }}
      >
        <Marker coordinate={locations[0]?.coords} />
        <Marker coordinate={locations[locations.length - 1]?.coords} />
        <Polyline
          geodesic
          coordinates={locations.map((location) => location.coords)}
          strokeColor="rgba(0, 179, 253, 0.6)"
          strokeWidth={5}
          zIndex={0}
        />
      </MapView>
    </View>
  );
};

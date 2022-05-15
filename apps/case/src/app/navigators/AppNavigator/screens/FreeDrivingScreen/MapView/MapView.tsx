import React, { useCallback, useState } from 'react';
import { Location } from 'react-native-background-geolocation';
import BaseMapView, {
  Animated,
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
  Region,
  AnimatedRegion,
} from 'react-native-maps';
import { LocationTracker } from '../components/LocationTracker';

const style = {
  flex: 1,
};

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;

export const MapView = () => {
  console.log('----------------- Rendering ----------');

  const [region, setRegion] = useState({
    latitude: 45.518853,
    longitude: -73.60055,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const handleLocationArrive = useCallback((location: Location) => {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);

  return (
    <Animated
      style={style}
      provider={PROVIDER_GOOGLE}
      //   followsUserLocation
      showsScale
      region={region}
      onRegionChange={setRegion}
      showsUserLocation
      showsMyLocationButton
      showsPointsOfInterest
      followsUserLocation
    >
      <LocationTracker onLocationArrive={handleLocationArrive}>
        {(location, coords) => (
          //
          //
          <>
            <Marker coordinate={coords[coords.length - 1]} />
            <Polyline
              geodesic
              coordinates={coords}
              strokeColor="rgba(0, 179, 253, 0.6)"
              strokeWidth={5}
              zIndex={0}
            />
          </>
        )}
      </LocationTracker>
    </Animated>
  );
};

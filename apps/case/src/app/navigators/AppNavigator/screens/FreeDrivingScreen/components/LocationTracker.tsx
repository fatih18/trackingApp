import { useAppSlice } from 'apps/case/src/app/slice';
import { useIsTripActive } from 'apps/case/src/app/slice/trips/selectors';
import { useEffect, useState } from 'react';
import BackgroundGeolocation, {
  Location,
  Subscription,
} from 'react-native-background-geolocation';
import { LatLng } from 'react-native-maps';
import { useDispatch } from 'react-redux';

interface ILocationTrackerProps {
  onLocationArrive: (location: Location) => void;
  children: (locations: Location[], coords: LatLng[]) => JSX.Element;
}

export const LocationTracker = ({
  children,
  onLocationArrive,
}: ILocationTrackerProps) => {
  const isTripActive = useIsTripActive();

  const dispatch = useDispatch();
  const {
    actions: { locationArrived },
  } = useAppSlice();

  const [locations, setLocations] = useState<Location[]>([]);
  const [coords, setCoords] = useState<LatLng[]>([]);

  useEffect(() => {
    let unsubscribe: Subscription;

    if (isTripActive) {
      unsubscribe = BackgroundGeolocation.onLocation((location) => {
        dispatch(locationArrived({ location }));
        setLocations((prevState) => [...prevState, location]);
        setCoords((prevState) => [...prevState, location.coords]);
      }, console.log);

      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      unsubscribe?.remove();
    }

    () => {
      BackgroundGeolocation.stop();
      unsubscribe?.remove();
    };
  }, [isTripActive]);

  useEffect(() => {
    if (locations.length) onLocationArrive(locations[locations.length - 1]);
  }, [locations, onLocationArrive]);

  return children(locations, coords);
};

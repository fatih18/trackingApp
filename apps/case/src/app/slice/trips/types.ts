import { Location } from 'react-native-background-geolocation';

/* --- STATE --- */
export interface AppState {
  prevTrips: Trip[];
  currentTrip?: Trip;
}

export interface Trip {
  locations: Location[];
  distance: number;
  startTime: number;
  endTime?: number;
}

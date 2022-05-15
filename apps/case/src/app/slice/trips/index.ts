import { AppState, Trip } from './types';
import { createSlice } from '../../utils/@reduxjs/toolkit';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { getDistance } from 'geolib';
import { Location } from 'react-native-background-geolocation';
import { useDispatch } from 'react-redux';

export const initialState: AppState = {
  prevTrips: [],
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // save driven coordinates
    // calculate distance

    startTrip(state) {
      state.currentTrip = {
        distance: 0,
        startTime: Date.now(),
        endTime: undefined,
        locations: [],
      };
    },

    endTrip(state) {
      state.prevTrips = [
        ...state.prevTrips,
        {
          ...state.currentTrip,
          endTime: Date.now(),
        },
      ];

      state.currentTrip = undefined;
    },

    locationArrived(state, action: PayloadAction<{ location: Location }>) {
      const { locations, distance } = state.currentTrip;
      const { length, [length - 1]: lastLocation } = locations;

      const newDistance = lastLocation?.coords
        ? getDistance(lastLocation.coords, action.payload.location.coords)
        : 0;

      state.currentTrip.distance = distance + newDistance;
      state.currentTrip.locations = [...locations, action.payload.location];
    },
  },
});

export const { actions: appActions, reducer: appReducer } = slice;

export const useAppSlice = () => {
  return { actions: slice.actions };
};

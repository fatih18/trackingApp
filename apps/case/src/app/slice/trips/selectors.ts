import { RootState } from '../../store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const selectSlice = (state: RootState) => state.app;

export const useIsTripActive = () =>
  useSelector(
    createSelector([selectSlice], (state) => state.currentTrip != null)
  );

export const usePrevTrips = () =>
  useSelector(createSelector([selectSlice], (state) => state.prevTrips));

export const saveTrip = createSelector([selectSlice], (state) => state);
export const selectColorMode = createSelector([selectSlice], (state) => state);

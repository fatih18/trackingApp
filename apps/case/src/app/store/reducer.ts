/**
 *  This is where we combine all reducers
 */

import { appReducer } from '../slice/trips';
import { combineReducers } from 'redux';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export const createReducer = () => {
  return combineReducers({
    app: appReducer,
  });
};

/**
 * Create store with dynamic reducer
 */

import { createReducer } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

export function configureAppStore() {
  //confi
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
  };

  const reducers = createReducer();

  const persistedReducer = persistReducer(persistConfig, reducers);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
      logger,
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ],
    devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);

  return { store, persistor };
}

import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { AppNavigator } from './navigators/index';
import { Provider } from 'react-redux';
import { configureAppStore } from '../app/store/configureStore';

const { store, persistor } = configureAppStore();

export const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

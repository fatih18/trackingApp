import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './screens/BottomTabNavigator/BottomTabNavigator';
import React from 'react';
import { FreeDrivingScreen, TripsLogScreen } from './screens';
import { SafeAreaView, Text, View } from 'react-native';
import { Icon } from 'native-base';

export type NavigatorParamList<T = unknown> = {
  // Contain screens that does not require authentication

  freeDrivingScreen: undefined;

  bottomTab: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'bottomTab'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="bottomTab"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{}}
        name="freeDrivingScreen"
        component={FreeDrivingScreen}
      />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

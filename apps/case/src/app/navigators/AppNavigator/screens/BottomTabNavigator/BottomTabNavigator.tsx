import React from 'react';
import { TripsLogScreen, FreeDrivingScreen } from '../index';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TopMenu } from '../../components/Menu/TopMenu';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CommnunityIcon } from '../../../../components/icons';
import { WalletScreen } from '../WalletScreen/WalletScreen';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { Text } from 'native-base';

export type BottomTabNavigatorParamList = {
  tripsLogScreen: undefined;
  walletScreen: undefined;
  freeDrivingScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

type BottomTabNavigatorParamListKeys = keyof BottomTabNavigatorParamList;

type BottomTabIconConfig = {
  [P in BottomTabNavigatorParamListKeys]: {
    focused: {
      color?: string;
      name: string;
      size?: string | number;
    };
    default: {
      color?: string;
      name: string;
      size?: string | number;
    };
  };
};

const useIconOptions = (): BottomTabIconConfig => {
  return {
    tripsLogScreen: {
      default: { name: 'pin-outline' },
      focused: { name: 'pin', color: 'blue' },
    },
    walletScreen: {
      default: { name: 'wallet' },
      focused: { name: 'wallet-outline', color: 'blue' },
    },
    freeDrivingScreen: {
      default: { name: 'map' },
      focused: { name: 'map-outline', color: 'blue' },
    },
  };
};

export const BottomTabNavigator = () => {
  //
  const iconOptios = useIconOptions();

  const generateTabBarIcon = (routeName: BottomTabNavigatorParamListKeys) => {
    const TabBarIcon = ({ focused, size, color }) => {
      const iconConfig = iconOptios[routeName][focused ? 'focused' : 'default'];

      return (
        <CommnunityIcon
          name={iconConfig.name}
          size={iconConfig.size || size}
          color={iconConfig.color || color}
        />
      );
    };
    return TabBarIcon;
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: true, header: () => <Text>''</Text> }}
    >
      <Tab.Screen
        name="freeDrivingScreen"
        component={FreeDrivingScreen}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: generateTabBarIcon('freeDrivingScreen'),
          tabBarLabel: 'Map',
          header: () => (
            <SafeAreaView>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <TopMenu />
                <SearchBar />
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <Tab.Screen
        name="tripsLogScreen"
        component={TripsLogScreen}
        options={{
          tabBarIcon: generateTabBarIcon('tripsLogScreen'),
          tabBarLabel: 'Trip Logs',
        }}
      />
      <Tab.Screen
        name="walletScreen"
        component={WalletScreen}
        options={{
          tabBarIcon: generateTabBarIcon('walletScreen'),
          tabBarLabel: 'Wallet ',
        }}
      />
    </Tab.Navigator>
  );
};

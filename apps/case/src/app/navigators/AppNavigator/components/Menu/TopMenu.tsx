import React from 'react';
import { Menu, HamburgerIcon, Box, Pressable } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigatorParamList } from '../../screens/BottomTabNavigator/BottomTabNavigator';

export const TopMenu = () => {
  const navigation =
    useNavigation<NavigationProp<BottomTabNavigatorParamList>>();

  return (
    <Box padding={2} alignItems="flex-start">
      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <HamburgerIcon size={8} />
            </Pressable>
          );
        }}
      >
        <Menu.Item
          style={{ backgroundColor: 'skyblue' }}
          onPress={() => navigation.navigate('freeDrivingScreen')}
        >
          Map Screen
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate('tripsLogScreen')}>
          Trips Log Screen
        </Menu.Item>
        <Menu.Item onPress={() => navigation.navigate('walletScreen')}>
          Wallet Screen
        </Menu.Item>
        <Menu.Item isDisabled>Settings Screen</Menu.Item>
      </Menu>
    </Box>
  );
};

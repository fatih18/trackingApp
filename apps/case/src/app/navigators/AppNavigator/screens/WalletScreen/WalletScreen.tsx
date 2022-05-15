import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center, Column, Text } from 'native-base';
import React from 'react';
import { BottomTabNavigatorParamList } from '../BottomTabNavigator/BottomTabNavigator';
import { CommnunityIcon } from '../../../../components/icons/index';

export const WalletScreen = () => {
  const navigation =
    useNavigation<NavigationProp<BottomTabNavigatorParamList>>();

  const handleInvite = () => navigation.navigate('tripsLogScreen');

  return (
    <Center w="full" h="full">
      <Column space={2} alignItems="center" w="75%">
        <Text textAlign="center">Cannot find any informations.</Text>
        <Text variant="secondary" textAlign="center">
          No worries!
        </Text>
        <Button
          mt={6}
          onPress={handleInvite}
          leftIcon={
            //
            //
            <CommnunityIcon name="pin" size={16} color="white" />
          }
        >
          Go to Logs
        </Button>
      </Column>
    </Center>
  );
};

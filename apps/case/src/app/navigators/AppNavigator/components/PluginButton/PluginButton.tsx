import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { Pressable, Text } from 'native-base';
import { Icon } from '../../../../components/icons';
import { useIsTripActive } from 'apps/case/src/app/slice/trips/selectors';
import { useDispatch } from 'react-redux';
import { useAppSlice } from 'apps/case/src/app/slice';

interface Props {
  enabled: boolean;
  onClickEnabled: (x: boolean) => void;
  onLog: () => void;
}

export const PluginButton = (props: Props) => {
  const isTripActive = useIsTripActive();

  const dispatch = useDispatch();
  const {
    actions: { startTrip, endTrip },
  } = useAppSlice();

  const handleValueChange = (newVal: boolean) => {
    if (newVal) {
      dispatch(startTrip());
    } else {
      dispatch(endTrip());
    }
  };

  return (
    <Pressable onPress={props.onLog}>
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: ' black',
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'space-between',
          backgroundColor: isTripActive ? 'yellow' : 'transparent',
        }}
      >
        <View>
          <Text fontSize="2xl"> Free Driving</Text>
        </View>
        <Icon size={32} name="drive-eta" />
        <View style={{ marginRight: 4 }}>
          <Switch onValueChange={handleValueChange} value={isTripActive} />
        </View>
      </View>
    </Pressable>
  );
};

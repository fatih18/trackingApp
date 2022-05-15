import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { TripListItem } from './TripList/TripListItem';
import { Heading } from 'native-base';

import { usePrevTrips } from 'apps/case/src/app/slice/trips/selectors';

export const TripsLogScreen = () => {
  const trips = usePrevTrips();

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Heading style={{ marginTop: 30, marginBottom: 10 }} size="sm">
        Trips in progress
      </Heading>
      <FlatList
        data={trips}
        renderItem={({ item }) => <TripListItem {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

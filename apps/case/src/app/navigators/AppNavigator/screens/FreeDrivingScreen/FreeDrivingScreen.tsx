import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { PluginButton } from '../../components/PluginButton/PluginButton';

import BackgroundGeolocation, {
  Location,
  LocationError,
  State,
  MotionActivityEvent,
} from 'react-native-background-geolocation';
import BackgroundFetch from 'react-native-background-fetch';

import ENV from './ENV';

//import { registerTransistorAuthorizationListener } from './lib/Autharization';
import { MapView } from './MapView/MapView';
import { useIsTripActive } from 'apps/case/src/app/slice/trips/selectors';

//
export const FreeDrivingScreen = ({ route, navigation }) => {
  const [enabled, setEnabled] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);
  const [location, setLocation] = React.useState<Location>(null);
  const [odometer, setOdometer] = React.useState(0);

  // Handy Util class for managing app/plugin Settings.
  //const settingsService = SettingsService.getInstance();

  /// Init BackgroundGeolocation when view renders.
  useEffect(() => {
    // Register BackgroundGeolocation event-listeners.

    // For printing odometer in bottom toolbar.
    // const locationSubscriber: any = BackgroundGeolocation.onLocation(
    //   setLocation,
    //   (error) => {
    //     console.warn('[onLocation] ERROR: ', error);
    //   }
    // );
    // Auto-toggle [ play ] / [ pause ] button in bottom toolbar on motionchange events.
    // const motionChangeSubscriber: any = BackgroundGeolocation.onMotionChange(
    //   (location) => {
    //     setIsMoving(location.isMoving);
    //   }
    // );
    // For printing the motion-activity in bottom toolbar.
    // const activityChangeSubscriber: any =
    //   BackgroundGeolocation.onActivityChange(setMotionActivityEvent);

    // Configure BackgroundFetch (optional)
    initBackgroundFetch();

    // Configure BackgroundGeolocation.ready().
    initBackgroundGeolocation();

    // Boilerplate authorization-listener for tracker.transistorsoft.com (nothing interesting)
    //registerTransistorAuthorizationListener(navigation);
    return () => {
      // When view is destroyed (or refreshed with dev live-reload),
      // Remove BackgroundGeolocation event-listeners.
      // locationSubscriber.remove();
      // motionChangeSubscriber.remove();
      // activityChangeSubscriber.remove();
    };
  }, []);

  console.log('-------- Rendering');

  /// Location effect-handler
  useEffect(() => {
    if (!location) return;
    setOdometer(location.odometer);
  }, [location]);

  /// Configure BackgroundGeolocation.ready
  const initBackgroundGeolocation = async () => {
    // Get an authorization token from transistorsoft demo server.
    const token =
      await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
        'org.Case',
        'sipsi',
        ENV.TRACKER_HOST
      );

    const state: State = await BackgroundGeolocation.ready({
      // Debug
      reset: false,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      transistorAuthorizationToken: token,
      // Geolocation
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
      distanceFilter: 10,
      stopTimeout: 5,
      // Permissions
      locationAuthorizationRequest: 'Always',
      backgroundPermissionRationale: {
        title:
          "Allow {applicationName} to access this device's location even when closed or not in use.",
        message:
          'This app collects location data to enable recording your trips to work and calculate distance-travelled.',
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel',
      },
      // HTTP & Persistence
      autoSync: true,
      maxDaysToPersist: 14,
      // Application
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    });

    setOdometer(state.odometer);
    setEnabled(state.enabled);
    setIsMoving(state.isMoving || false);
  };

  const initBackgroundFetch = async () => {
    await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: true,
      },
      (taskId) => {
        console.log('[BackgroundFetch] ', taskId);
        BackgroundFetch.finish(taskId);
      },
      (taskId) => {
        BackgroundFetch.finish(taskId);
      }
    );
  };

  /// <Switch> handler to toggle the plugin on/off.
  const onClickEnable = (value: boolean) => {
    setEnabled(value);
    if (value) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      // Toggle the [ > ] / [ || ] button in bottom-toolbar back to [ > ]
      setIsMoving(false);
    }
  };

  /// getCurrentPosition handler
  const onClickGetCurrentPosition = () => {
    BackgroundGeolocation.getCurrentPosition({
      persist: true,
      samples: 1,
      timeout: 30,
      extras: {
        getCurrentPosition: true,
      },
    })
      .then((location: Location) => {
        console.log('[getCurrentPosition] success: ', location);
      })
      .catch((error: LocationError) => {
        console.warn('[getCurrentPosition] error: ', error);
      });
  };

  const currentTrip = useIsTripActive();

  return (
    <SafeAreaView style={styles.container}>
      <MapView />

      <View style={{ padding: 10, backgroundColor: 'transparent' }}>
        <PluginButton
          onLog={() => onClickGetCurrentPosition()}
          onClickEnabled={onClickEnable}
          enabled={currentTrip}
        />
      </View>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  statusBar: {
    fontSize: 16,
  },
});

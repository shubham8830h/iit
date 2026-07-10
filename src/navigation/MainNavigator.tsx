/**
 * MainNavigator — A Stack Navigator that wraps the DrawerNavigator
 * and contains full-screen modals or pages that need standard transition animations
 * (like sliding in from the right).
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import { AllTimeQuestsScreen, SparksHistoryScreen } from '../screens';
import type { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Slide from right is default on iOS, but let's make it consistent for Android too
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="AllTimeQuests" component={AllTimeQuestsScreen} />
      <Stack.Screen name="SparksHistory" component={SparksHistoryScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

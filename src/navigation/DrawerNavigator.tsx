/**
 * DrawerNavigator — Drawer navigation for authenticated users.
 * Uses custom drawer content matching the IITPK web app sidebar.
 */

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components';
import {
  DashboardScreen,
  CoursesScreen,
  AIFacultyScreen,
  RemedialLearningScreen,
} from '../screens';
import { Colors } from '../constants';
import type { DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
          backgroundColor: Colors.backgroundWhite,
        },
        overlayColor: Colors.overlay,
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Courses" component={CoursesScreen} />
      <Drawer.Screen name="AIFaculty" component={AIFacultyScreen} />
      <Drawer.Screen name="RemedialLearning" component={RemedialLearningScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

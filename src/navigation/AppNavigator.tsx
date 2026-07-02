/**
 * AppNavigator — Root navigator that switches between Auth and Main app flows
 * based on authentication state.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../store/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavigator: React.FC = () => {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      {state.isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

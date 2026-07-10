/**
 * AppNavigator — Root navigator that switches between Auth and Main app flows
 * based on authentication state.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../store/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import { FullScreenLoader } from '../components';

const AppNavigator: React.FC = () => {
  const { state } = useAuth();

  return (
    <>
      <NavigationContainer>
        {state.isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      {state.isLoading && <FullScreenLoader />}
    </>
  );
};

export default AppNavigator;

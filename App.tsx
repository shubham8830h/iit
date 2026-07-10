/**
 * IITPK AI Faculty — React Native Mobile App
 * Entry point with AuthProvider and Navigation setup.
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/store/AuthContext';
import { ThemeProvider, useTheme } from './src/store/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const { isDarkMode, colors } = useTheme();
  
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.backgroundLight}
        translucent
      />
      <AppNavigator />
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../store/ThemeContext';
import { FontSize, FontWeight, Spacing } from '../../constants';

interface FullScreenLoaderProps {
  message?: string;
  visible?: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  message = 'Loading your workspace...',
  visible = true,
}) => {
  const { colors } = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const styles = getStyles(colors);

  return (
    <Modal visible={visible} transparent={true} animationType="fade" statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {/* The rotating ring */}
          <Animated.View
            style={[
              styles.spinnerRing,
              { transform: [{ rotate: spin }] },
            ]}
          />
          {/* The center icon */}
          <Icon name="brain" size={54} color={colors.activeBlue} style={styles.centerIcon} />
        </View>
        <Text style={styles.title}>AI Faculty</Text>
        <Text style={styles.subtitle}>{message}</Text>
      </View>
    </Modal>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  spinnerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.borderLight, // Light gray
    borderTopColor: colors.activeBlue, // Blue accent
  },
  centerIcon: {
    position: 'absolute',
  },
  title: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: colors.textSecondary,
  },
});

export default FullScreenLoader;

/**
 * CustomButton — Reusable button component.
 * Supports primary (teal), outline, danger, and text variants with loading state.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, FontSize, FontWeight, BorderRadius, ButtonHeight, Spacing } from '../../constants';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger' | 'text';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || isLoading;

  const getButtonStyle = (): ViewStyle[] => {
    const base: ViewStyle[] = [styles.base];
    switch (variant) {
      case 'primary':
        base.push(styles.primary);
        break;
      case 'outline':
        base.push(styles.outline);
        break;
      case 'danger':
        base.push(styles.danger);
        break;
      case 'text':
        base.push(styles.textVariant);
        break;
    }
    if (isDisabled) {
      base.push(styles.disabled);
    }
    if (style) {
      base.push(style);
    }
    return base;
  };

  const getTextStyle = (): TextStyle[] => {
    const base: TextStyle[] = [styles.baseText];
    switch (variant) {
      case 'primary':
        base.push(styles.primaryText);
        break;
      case 'outline':
        base.push(styles.outlineText);
        break;
      case 'danger':
        base.push(styles.dangerText);
        break;
      case 'text':
        base.push(styles.textVariantText);
        break;
    }
    if (textStyle) {
      base.push(textStyle);
    }
    return base;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.textWhite : Colors.primary}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: ButtonHeight.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  // Primary — teal brand color (matches the IITPK web app login button)
  primary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  // Outline — transparent with teal border
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  // Danger — red for destructive actions
  danger: {
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  textVariant: {
    backgroundColor: 'transparent',
    height: 'auto' as unknown as number,
    paddingHorizontal: 0,
  },
  disabled: {
    opacity: 0.55,
  },
  baseText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
  },
  primaryText: {
    color: Colors.textWhite,
  },
  outlineText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.textWhite,
  },
  textVariantText: {
    color: Colors.textLink,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
  },
});

export default CustomButton;

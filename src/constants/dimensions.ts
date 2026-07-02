/**
 * Dimension and spacing constants for consistent layouts.
 */

import { scale, verticalScale, moderateScale } from '../utils';

export const Spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  base: scale(16),
  lg: scale(20),
  xl: scale(24),
  xxl: scale(32),
  xxxl: scale(40),
  huge: scale(48),
} as const;

export const BorderRadius = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  round: scale(50),
  full: 9999, // keep full static
} as const;

export const IconSize = {
  sm: moderateScale(16),
  md: moderateScale(20),
  base: moderateScale(24),
  lg: moderateScale(28),
  xl: moderateScale(32),
  xxl: moderateScale(40),
} as const;

export const InputHeight = {
  sm: verticalScale(40),
  md: verticalScale(48),
  lg: verticalScale(56),
} as const;

export const ButtonHeight = {
  sm: verticalScale(36),
  md: verticalScale(44),
  lg: verticalScale(52),
} as const;

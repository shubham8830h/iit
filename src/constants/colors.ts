/**
 * Color palette matching the IITPK AI Faculty web application.
 * All colors used across the app should be referenced from here.
 */

export const Colors = {
  // Primary brand colors
  primary: '#1B3C4B',
  primaryLight: '#2D6E7E',
  primaryGradientStart: '#1B3C4B',
  primaryGradientEnd: '#2D7D8E',

  // Accent / Danger color (red — for destructive actions)
  accent: '#E8594F',
  accentDark: '#D44840',
  accentLight: '#F07068',

  // Active / Selected state
  activeBlue: '#2196F3',
  activeBlueBg: '#E8F4FD',
  activeBlueLight: '#BBDEFB',

  // Text colors
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textWhite: '#FFFFFF',
  textLink: '#2196F3',
  textDanger: '#E8594F',

  // Background colors
  backgroundWhite: '#FFFFFF',
  backgroundLight: '#F8F9FA',
  backgroundGray: '#F3F4F6',
  backgroundDark: '#1A1A2E',

  // Border colors
  borderLight: '#E5E7EB',
  borderMedium: '#D1D5DB',
  borderDark: '#9CA3AF',

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Toggle
  toggleActive: '#FFA726',
  toggleInactive: '#E0E0E0',
} as const;

export type ColorKey = keyof typeof Colors;

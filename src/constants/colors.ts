/**
 * Color palettes for Light and Dark modes.
 */

export type ColorPalette = {
  primary: string;
  primaryLight: string;
  primaryGradientStart: string;
  primaryGradientEnd: string;
  accent: string;
  accentDark: string;
  accentLight: string;
  activeBlue: string;
  activeBlueBg: string;
  activeBlueLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textWhite: string;
  textLink: string;
  textDanger: string;
  backgroundWhite: string;
  backgroundLight: string;
  backgroundGray: string;
  backgroundDark: string;
  borderLight: string;
  borderMedium: string;
  borderDark: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  shadow: string;
  shadowDark: string;
  overlay: string;
  toggleActive: string;
  toggleInactive: string;
  // Subject Colors
  subjectMath: string;
  subjectPhysics: string;
  subjectChemistry: string;
  subjectBiology: string;
};

export const LightColors: ColorPalette = {
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

  // Subject Colors
  subjectMath: '#5CBCE8',
  subjectPhysics: '#F8457A',
  subjectChemistry: '#0DC4D3',
  subjectBiology: '#7445FF',
};

export const DarkColors: ColorPalette = {
  primary: '#2D6E7E', // slightly lighter for dark mode visibility
  primaryLight: '#4A9AB0',
  primaryGradientStart: '#1B3C4B',
  primaryGradientEnd: '#2D7D8E',

  accent: '#F07068',
  accentDark: '#D44840',
  accentLight: '#F59C96',

  activeBlue: '#60A5FA',
  activeBlueBg: '#1E3A5F',
  activeBlueLight: '#3B82F6',

  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  textWhite: '#FFFFFF',
  textLink: '#60A5FA',
  textDanger: '#F87171',

  backgroundWhite: '#1F2937', // dark card background
  backgroundLight: '#111827', // darker main background
  backgroundGray: '#374151',
  backgroundDark: '#030712',

  borderLight: '#374151',
  borderMedium: '#4B5563',
  borderDark: '#6B7280',

  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowDark: 'rgba(0, 0, 0, 0.8)',
  overlay: 'rgba(0, 0, 0, 0.7)',

  toggleActive: '#FFA726',
  toggleInactive: '#4B5563',

  // Subject Colors (can keep same or slightly tweak for dark mode)
  subjectMath: '#5CBCE8',
  subjectPhysics: '#F8457A',
  subjectChemistry: '#0DC4D3',
  subjectBiology: '#7445FF',
};

// Default export for fallback or static usage before context is ready
export const Colors = LightColors;
export type ColorKey = keyof typeof LightColors;

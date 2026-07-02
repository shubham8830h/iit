/**
 * Utility helpers — responsive scaling and general helpers.
 * Add shared utility functions here as the app grows.
 */

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Base design width (iPhone 13 / 390px) */
const BASE_WIDTH = 390;

/**
 * Scales a size value relative to the base design width.
 * Useful for responsive font sizes and dimensions.
 */
export const scale = (size: number): number =>
  Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);

/** Base design height (iPhone 13 / 844px) */
const BASE_HEIGHT = 844;

/**
 * Scales a size value relative to the base design height.
 * Useful for vertical spacing or component heights.
 */
export const verticalScale = (size: number): number =>
  Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);

/**
 * Moderately scales a size (e.g. for fonts). 
 * Prevents text from becoming too huge on large devices like tablets.
 * factor = 0.5 means it scales half as fast.
 */
export const moderateScale = (size: number, factor: number = 0.5): number =>
  Math.round(size + (scale(size) - size) * factor);

/**
 * Returns the screen width.
 */
export const screenWidth = (): number => SCREEN_WIDTH;

/**
 * Returns the screen height.
 */
export const screenHeight = (): number => SCREEN_HEIGHT;

/**
 * Clamps a value between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

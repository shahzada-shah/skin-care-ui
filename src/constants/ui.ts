/**
 * UI Configuration Constants
 *
 * Contains configuration for UI elements including animations,
 * transitions, breakpoints, and other visual settings.
 *
 * @module constants/ui
 */

/**
 * Animation duration constants (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Dropdown animation delays (in milliseconds)
 */
export const DROPDOWN_ANIMATION = {
  STAGGER_DELAY: 60,
  TRANSITION_DURATION: 300,
} as const;

/**
 * Z-index layers for proper stacking
 */
export const Z_INDEX = {
  DROPDOWN: 50,
  MODAL: 100,
  TOOLTIP: 150,
} as const;

/**
 * Breakpoint values for responsive design
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Container max-width
 */
export const CONTAINER_MAX_WIDTH = '1400px';

/**
 * Icon sizes
 */
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 24,
} as const;

/**
 * Common spacing values
 */
export const SPACING = {
  SECTION_PADDING: 'py-16 md:py-24',
  CONTAINER_PADDING: 'px-4 md:px-6',
} as const;

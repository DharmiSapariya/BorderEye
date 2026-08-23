/**
 * BorderEye design tokens — single source of truth for color, spacing,
 * radius, typography, shadow, blur, and motion values.
 *
 * Palette direction: dark robotics command-center. A near-black navy base
 * with three elevation steps, a restrained cyan-teal accent used only for
 * active/important states, and desaturated (not neon) status colors.
 */

export const colors = {
  // Surface elevations (0 = app background, higher = closer to the user)
  background: '#0A0E14',
  backgroundLight: '#0F141C',
  surface: '#151B25',
  surfaceElevated: '#1C2430',
  surfaceGlass: 'rgba(21, 27, 37, 0.72)',

  // Borders / separators
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.16)',

  // Primary accent — used sparingly (active states, key metrics, CTAs)
  primary: '#2FD3E8',
  primaryDeep: '#158FA3',
  primaryGlow: 'rgba(47,211,232,0.24)',
  primaryTint: 'rgba(47,211,232,0.14)',

  // Status — desaturated, not neon
  success: '#34D399',
  successTint: 'rgba(52,211,153,0.16)',
  warning: '#F2A93B',
  warningTint: 'rgba(242,169,59,0.16)',
  danger: '#F0505F',
  dangerTint: 'rgba(240,80,95,0.16)',
  info: '#2FD3E8',
  infoTint: 'rgba(47,211,232,0.14)',

  // Text
  text: '#F2F5F9',
  textSecondary: '#8D9BB0',
  textDim: '#576375',

  // Sensor identity accents (used as small icon-badge tints, not full-bleed fills)
  temperature: '#F0964A',
  humidity: '#4FB8E8',
  gas: '#B08CF0',
  distance: '#34D399',
  metal: '#F0505F',

  // Reserved for hero/CTA surfaces only — restrained duotones, not saturated web-style gradients
  gradients: {
    primary: ['#1C6E7D', '#0F141C'],
    success: ['#1E6B54', '#0F141C'],
    warning: ['#7A5A22', '#0F141C'],
    danger: ['#7A2B36', '#0F141C'],
    neutral: ['#232C39', '#151B25'],
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
};

// Font sizing/weight scale. Color is applied by the caller (usually
// colors.text or colors.textSecondary) so these stay theme-neutral.
export const typography = {
  screenTitle: { fontSize: 26, fontWeight: '700', letterSpacing: 0.1 },
  sectionTitle: { fontSize: 13, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  cardTitle: { fontSize: 15, fontWeight: '600', letterSpacing: 0.1 },
  metric: { fontSize: 30, fontWeight: '700', letterSpacing: -0.3 },
  metricLarge: { fontSize: 40, fontWeight: '700', letterSpacing: -0.5 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.2 },
  metadata: { fontSize: 12, fontWeight: '400' },
  timestamp: { fontSize: 11, fontWeight: '400' },
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 8,
  },
};

export const blur = {
  subtle: 24,
  medium: 40,
  strong: 60,
  tint: 'dark',
};

export const motion = {
  micro: 180,
  normal: 300,
  large: 450,
  springSoft: { type: 'spring', damping: 18, stiffness: 180 },
  springSnappy: { type: 'spring', damping: 14, stiffness: 220 },
  stagger: 60,
};

// Content is capped on wide viewports (desktop/tablet web) so cards never
// stretch into full-bleed bars — see BorderEye's phone-only layout math.
export const layout = {
  maxContentWidth: 640,
};

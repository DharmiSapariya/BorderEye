/**
 * BorderEye design tokens — single source of truth for color, spacing,
 * radius, typography, shadow, blur, and motion values.
 *
 * Palette direction: field robotics / industrial hardware documentation —
 * a light, cool-neutral base with a warm beige/slate technical accent and
 * deep-charcoal anchors. Muted, restrained, engineered — not a neon
 * "AI SaaS dashboard" look. Status/sensor colors are desaturated and used
 * only on small badges, dots, and icons — never as full-bleed fills.
 */

export const colors = {
  // Surface elevations (0 = app background, higher = closer to the user)
  background: '#F4F6F8',
  backgroundLight: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceElevated: '#E2DFDB',
  surfaceGlass: 'rgba(255, 255, 255, 0.78)',
  // Deep-charcoal anchor surface, used deliberately (hero/status panels,
  // major section transitions) — never as the app's default background.
  surfaceDark: '#2C2C2C',
  surfaceDarkElevated: '#3A3A3A',

  // Borders / separators
  border: 'rgba(44, 44, 44, 0.12)',
  borderStrong: 'rgba(44, 44, 44, 0.22)',
  borderOnDark: 'rgba(244, 246, 248, 0.16)',

  // Primary accent — the slate/technical blue-grey, used for active states,
  // key metrics, icons, and CTAs
  primary: '#566167',
  primaryDeep: '#3E464B',
  primaryGlow: 'rgba(86, 97, 103, 0.20)',
  primaryTint: 'rgba(86, 97, 103, 0.12)',

  // Warm accent surface (badges, highlighted states, secondary CTA fills)
  accent: '#C9BCA9',
  accentTint: 'rgba(201, 188, 169, 0.30)',

  // Status — muted/engineered, not neon
  success: '#4B7A5E',
  successTint: 'rgba(75, 122, 94, 0.14)',
  warning: '#B98A3D',
  warningTint: 'rgba(185, 138, 61, 0.14)',
  danger: '#B33A3A',
  dangerTint: 'rgba(179, 58, 58, 0.14)',
  info: '#566167',
  infoTint: 'rgba(86, 97, 103, 0.12)',

  // Text
  text: '#2C2C2C',
  textSecondary: '#566167',
  textDim: '#8A9096',
  textOnDark: '#F4F6F8',
  textOnDarkSecondary: 'rgba(244, 246, 248, 0.64)',

  // Sensor identity accents (used as small icon-badge tints, not full-bleed fills)
  temperature: '#B9713D',
  humidity: '#4A7FA0',
  gas: '#7C6A9C',
  distance: '#4B7A5E',
  metal: '#B33A3A',

  // Reserved for hero/CTA/section-transition surfaces only — restrained
  // charcoal/slate duotones, not saturated web-style gradients. The hero
  // status panel stays this fixed technical duotone regardless of robot
  // state; state is communicated by a small badge/dot/label instead, so
  // the app never flips into a full-bleed red/amber/green "alarm" screen.
  gradients: {
    hero: ['#2C2C2C', '#566167'],
    neutral: ['#E2DFDB', '#F4F6F8'],
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
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#2C2C2C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
  },
};

export const blur = {
  subtle: 24,
  medium: 40,
  strong: 60,
  // Panels on the light background use a light blur tint; the fixed dark
  // hero/status panel (colors.gradients.hero) uses tintOnDark instead.
  tint: 'light',
  tintOnDark: 'dark',
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

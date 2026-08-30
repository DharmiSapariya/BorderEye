import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, View } from 'react-native';
import { blur, colors, radius, shadow, spacing } from '../utils/theme';

/**
 * Shared dark-glass surface: BlurView + translucent tint + hairline border.
 * Optional `onPress` turns it into a pressable card with Moti press feedback.
 */
export const GlassCard = ({
  children,
  style,
  intensity = blur.subtle,
  noPadding = false,
  onPress,
  dark = false,
  accessibilityLabel,
  accessibilityRole,
}) => {
  const inner = (
    <View style={[styles.wrap, dark ? styles.wrapDark : styles.wrapLight, shadow.md, style]}>
      <BlurView intensity={intensity} tint={dark ? blur.tintOnDark : blur.tint} style={StyleSheet.absoluteFill} />
      <View style={[styles.overlay, dark ? styles.overlayDark : styles.overlayLight]} pointerEvents="none" />
      <View style={!noPadding ? styles.padding : undefined}>{children}</View>
    </View>
  );

  if (!onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={accessibilityRole || 'button'}
      accessibilityLabel={accessibilityLabel}
    >
      {({ pressed }) => (
        <MotiView
          animate={{ scale: pressed ? 0.97 : 1, opacity: pressed ? 0.85 : 1 }}
          transition={{ type: 'timing', duration: 120 }}
        >
          {inner}
        </MotiView>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  wrapLight: {
    borderColor: colors.border,
  },
  wrapDark: {
    borderColor: colors.borderOnDark,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayLight: {
    backgroundColor: colors.surfaceGlass,
  },
  overlayDark: {
    backgroundColor: 'rgba(44, 44, 44, 0.55)',
  },
  padding: {
    padding: spacing.lg,
  },
});

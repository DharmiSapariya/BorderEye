import { MotiView } from 'moti';
import { Pressable } from 'react-native';
import { motion } from '../utils/theme';

/**
 * Shared press-scale wrapper for primary buttons — same tactile feedback
 * GlassCard/SensorCard already give cards, standardized so every tappable
 * surface in the app responds the same way instead of some being inert.
 */
export const PressScale = ({ children, style, onPress, disabled, accessibilityRole = 'button', accessibilityLabel, ...rest }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    accessibilityRole={accessibilityRole}
    accessibilityLabel={accessibilityLabel}
    {...rest}
  >
    {({ pressed }) => (
      <MotiView
        style={style}
        animate={{ scale: pressed ? 0.97 : 1, opacity: disabled ? 0.6 : pressed ? 0.9 : 1 }}
        transition={{ type: 'timing', duration: motion.micro }}
      >
        {children}
      </MotiView>
    )}
  </Pressable>
);

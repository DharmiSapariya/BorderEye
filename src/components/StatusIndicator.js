import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { motion, typography } from '../utils/theme';

/**
 * Dot + text label so status is never communicated by color alone.
 * `pulse` loops a soft ring animation around the dot for "live" states.
 */
export const StatusIndicator = ({ color, label, pulse = false, size = 8 }) => (
  <View
    style={styles.row}
    accessible
    accessibilityRole="text"
    accessibilityLabel={label}
  >
    <View style={[styles.dotWrap, { width: size, height: size }]}>
      {pulse && (
        <MotiView
          style={[styles.pulse, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]}
          from={{ opacity: 0.45, scale: 1 }}
          animate={{ opacity: 0, scale: 2.6 }}
          transition={{ type: 'timing', duration: motion.large * 3, loop: true }}
        />
      )}
      <View style={[styles.dot, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />
    </View>
    <Text style={[styles.label, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotWrap: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
  pulse: {
    position: 'absolute',
  },
  label: {
    ...typography.label,
  },
});

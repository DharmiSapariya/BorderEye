import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { colors, motion, radius, spacing, typography } from '../utils/theme';

export const ConnectionBadge = ({ isConnected, deviceName }) => {
  const color = isConnected ? colors.success : colors.danger;
  const label = isConnected ? `Connected · ${deviceName}` : 'Disconnected';

  return (
    <View
      style={[styles.container, { backgroundColor: color + '14', borderColor: color + '30' }]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <View style={styles.dotWrap}>
        {isConnected && (
          <MotiView
            style={[styles.dotPulse, { backgroundColor: color }]}
            from={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ type: 'timing', duration: motion.large * 3, loop: true }}
          />
        )}
        <View style={[styles.dot, { backgroundColor: color }]} />
      </View>
      <Feather name={isConnected ? 'wifi' : 'wifi-off'} size={11} color={color} style={styles.icon} />
      <Text style={[styles.text, { color }]} numberOfLines={1}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  dotWrap: {
    width: 7,
    height: 7,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotPulse: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    ...typography.label,
    flexShrink: 1,
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { blur, colors, motion, radius, shadow, spacing, typography } from '../utils/theme';

export const SensorCard = ({ title, value, unit, icon, accent = colors.primary, status, index = 0, onPress }) => {
  const content = ({ pressed } = {}) => (
    <MotiView
      style={[styles.card, shadow.md, pressed && styles.pressed]}
      from={{ opacity: 0, translateY: 14, scale: 0.97 }}
      animate={{ opacity: 1, translateY: 0, scale: pressed ? 0.97 : 1 }}
      transition={{ type: 'timing', duration: motion.normal, delay: index * motion.stagger }}
    >
      <BlurView intensity={blur.subtle} tint={blur.tint} style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={styles.content}>
        <View style={[styles.iconBadge, { backgroundColor: accent + '1F', borderColor: accent + '38' }]}>
          <MaterialCommunityIcons name={icon} size={18} color={accent} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {value !== null && value !== undefined ? value : '--'}
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        </Text>
        {status && (
          <View style={[styles.statusBadge, { backgroundColor: status.color + '1F' }]}>
            <View style={[styles.statusDot, { backgroundColor: status.color }]} />
            <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
          </View>
        )}
      </View>
    </MotiView>
  );

  if (!onPress) return <View style={styles.grid}>{content({})}</View>;

  return (
    <Pressable
      onPress={onPress}
      style={styles.grid}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${value ?? 'no reading'} ${unit || ''}${status ? `, ${status.text}` : ''}`}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    minWidth: '46%',
    margin: spacing.xs,
  },
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 130,
  },
  pressed: {
    borderColor: colors.borderStrong,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceGlass,
  },
  content: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  value: {
    ...typography.metric,
    color: colors.text,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

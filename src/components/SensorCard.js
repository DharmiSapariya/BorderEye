import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from './AnimatedNumber';
import { Sparkline } from './Sparkline';
import { blur, colors, motion, radius, shadow, spacing, typography } from '../utils/theme';

export const SensorCard = ({ title, value, decimals = 0, unit, icon, accent = colors.primary, status, history, index = 0, onPress }) => {
  const isNumeric = typeof value === 'number' && !Number.isNaN(value);
  const content = ({ pressed } = {}) => (
    <MotiView
      style={[styles.card, shadow.md, pressed && styles.pressed]}
      from={{ opacity: 0, translateY: 14, scale: 0.97 }}
      animate={{ opacity: 1, translateY: 0, scale: pressed ? 0.97 : 1 }}
      transition={{ type: 'timing', duration: motion.normal, delay: index * motion.stagger }}
    >
      <LinearGradient
        colors={['transparent', accent, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.accentBar}
      />
      <BlurView intensity={blur.subtle} tint={blur.tint} style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={[styles.iconBadge, { backgroundColor: accent + '1F', borderColor: accent + '38' }]}>
            <MaterialCommunityIcons name={icon} size={18} color={accent} />
          </View>
          {history && history.length > 1 && <Sparkline data={history} color={accent} />}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueRow}>
          {isNumeric ? (
            <AnimatedNumber value={value} decimals={decimals} style={styles.value} />
          ) : (
            <Text style={styles.value}>{value !== null && value !== undefined ? value : '--'}</Text>
          )}
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        </View>
        {status && (
          <View style={[styles.statusBadge, { backgroundColor: status.color + '1F' }]}>
            <View style={[styles.statusDot, { backgroundColor: status.color }]} />
            <Text style={[styles.statusText, { color: status.color }]}>{status.text}</Text>
          </View>
        )}
      </View>
    </MotiView>
  );

  return (
    <Pressable
      onPress={onPress}
      style={styles.grid}
      accessibilityRole={onPress ? 'button' : undefined}
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
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    ...typography.metric,
    color: colors.text,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginLeft: 2,
    marginBottom: 3,
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

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing, typography } from '../utils/theme';

// The four sensing layers actually wired into the firmware + DataParser
// (see README "Hardware Components" and DataParser.parseSerialData).
// State is deliberately not "ACTIVE" across the board: the sensor logic
// and UI are fully implemented, but the *data source* is real hardware
// only when a bridge server is reachable — otherwise DemoModeService
// supplies simulated readings. See src/services/WiFiService.js.
const LAYERS = [
  {
    index: '01',
    name: 'PROXIMITY',
    icon: 'radar',
    accent: colors.distance,
    measures: 'Distance to nearby objects, via the HC-SR04 ultrasonic sensor',
    why: 'Detects obstacles and approaching intruders so the unit can react before contact',
  },
  {
    index: '02',
    name: 'METAL',
    icon: 'magnet',
    accent: colors.metal,
    measures: 'Presence of concealed metallic objects',
    why: 'Flags weapons or metallic contraband that visual/motion sensing alone would miss',
  },
  {
    index: '03',
    name: 'GAS',
    icon: 'weather-windy',
    accent: colors.gas,
    measures: 'Ambient gas concentration, via an MQ-series sensor',
    why: 'Catches toxic or explosive vapors — an environmental hazard, not just an intrusion',
  },
  {
    index: '04',
    name: 'ENVIRONMENT',
    icon: 'thermometer',
    accent: colors.temperature,
    measures: 'Temperature and humidity, via a DHT11 sensor',
    why: 'Abnormal swings can indicate tampering or unusual on-site activity',
  },
];

const Card = ({ layer, isFocused, isDimmed, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${layer.name} sensing layer`}>
    <MotiView
      style={[styles.card, shadow.sm]}
      animate={{ opacity: isDimmed ? 0.55 : 1, scale: isFocused ? 1.02 : 1 }}
      transition={{ type: 'timing', duration: 220 }}
    >
      <View style={styles.topRow}>
        <Text style={styles.indexLabel}>{layer.index}</Text>
        <View style={[styles.iconBadge, { backgroundColor: layer.accent + '1A', borderColor: layer.accent + '38' }]}>
          <MaterialCommunityIcons name={layer.icon} size={16} color={layer.accent} />
        </View>
      </View>
      <Text style={styles.name}>{layer.name}</Text>
      <Text style={styles.measures}>{layer.measures}</Text>
      {isFocused && (
        <MotiView
          from={{ opacity: 0, translateY: 4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <View style={styles.divider} />
          <Text style={styles.why}>{layer.why}</Text>
        </MotiView>
      )}
    </MotiView>
  </Pressable>
);

export const SensingLayers = () => {
  const [focused, setFocused] = useState(null);

  return (
    <View style={styles.grid}>
      {LAYERS.map((layer) => (
        <View key={layer.name} style={styles.cell}>
          <Card
            layer={layer}
            isFocused={focused === layer.name}
            isDimmed={focused !== null && focused !== layer.name}
            onPress={() => setFocused((prev) => (prev === layer.name ? null : layer.name))}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  cell: {
    width: '50%',
    padding: spacing.xs,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    minHeight: 132,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  indexLabel: {
    ...typography.metadata,
    fontWeight: '700',
    color: colors.textDim,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.label,
    color: colors.text,
    marginBottom: 4,
  },
  measures: {
    ...typography.metadata,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  why: {
    ...typography.metadata,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

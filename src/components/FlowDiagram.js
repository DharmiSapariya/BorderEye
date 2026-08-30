import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../utils/theme';

const Pulse = ({ delay }) => (
  <MotiView
    style={styles.pulseDot}
    from={{ opacity: 0, translateY: 0 }}
    animate={{ opacity: [0, 1, 1, 0], translateY: 56 }}
    transition={{ type: 'timing', duration: 1400, loop: true, delay, repeatReverse: false }}
  />
);

/**
 * Vertical node-chain used for both the sensing "signal -> response" path
 * and the hardware architecture diagram — same visual language, different
 * stage data.
 */
export const FlowDiagram = ({ stages, highlightIndex = -1 }) => (
  <View style={styles.container}>
    {stages.map((stage, i) => (
      <View key={stage.title} style={styles.row}>
        <View style={styles.railCol}>
          <View style={[styles.node, i === highlightIndex && styles.nodeAccent]}>
            <Feather name={stage.icon} size={15} color={i === highlightIndex ? colors.textOnDark : colors.primary} />
          </View>
          {i < stages.length - 1 && (
            <View style={styles.railWrap}>
              <View style={styles.rail} />
              <Pulse delay={i * 220} />
            </View>
          )}
        </View>
        <MotiView
          style={styles.textCol}
          from={{ opacity: 0, translateX: -8 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 300, delay: i * 70 }}
        >
          <Text style={styles.stageTitle}>{stage.title}</Text>
          <Text style={styles.stageDetail}>{stage.detail}</Text>
        </MotiView>
      </View>
    ))}
  </View>
);

const NODE_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
  },
  railCol: {
    alignItems: 'center',
    width: NODE_SIZE,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeAccent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  railWrap: {
    width: 2,
    height: 56,
    alignItems: 'center',
    overflow: 'hidden',
  },
  rail: {
    width: 2,
    height: '100%',
    backgroundColor: colors.border,
  },
  pulseDot: {
    position: 'absolute',
    top: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: -2,
    backgroundColor: colors.primary,
  },
  textCol: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
  stageTitle: {
    ...typography.label,
    color: colors.text,
    marginBottom: 2,
  },
  stageDetail: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
});

import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { DataParser } from '../services/DataParser';
import { ROBOT_STATES } from '../utils/constants';
import { blur, colors, radius, shadow, spacing, typography } from '../utils/theme';
import { StatusIndicator } from './StatusIndicator';

const STATE_META = {
  [ROBOT_STATES.HAZARD_ALERT]: { icon: 'alert-triangle', gradient: colors.gradients.danger, label: 'Hazard' },
  [ROBOT_STATES.OBSTACLE_DETECTED]: { icon: 'shield', gradient: colors.gradients.warning, label: 'Obstacle' },
  [ROBOT_STATES.TURNING]: { icon: 'shield', gradient: colors.gradients.warning, label: 'Maneuvering' },
  [ROBOT_STATES.EXPLORING]: { icon: 'navigation', gradient: colors.gradients.success, label: 'Active' },
};
const DEFAULT_META = { icon: 'wifi-off', gradient: colors.gradients.neutral, label: 'Offline' };

// DataParser's status text is prefixed with an emoji for the old plain-text
// UI; this layer renders its own icon instead, so strip the leading glyph.
const stripLeadingEmoji = (text) => text.replace(/^[^\w]+/, '').trim();

const formatUpdatedAt = (isoString) => {
  if (!isoString) return null;
  return new Date(isoString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export const RobotStatus = ({ robotState, sensorData, deviceName, uptime }) => {
  const meta = STATE_META[robotState] || DEFAULT_META;
  const statusColor = DataParser.getStatusColor(robotState);
  const statusText = sensorData
    ? stripLeadingEmoji(DataParser.getRobotStatusText(robotState, sensorData))
    : 'Disconnected';
  const updatedAt = formatUpdatedAt(sensorData?.timestamp);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 320 }}
    >
      <View style={[styles.card, shadow.lg]}>
        <LinearGradient colors={meta.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <BlurView intensity={blur.subtle} tint={blur.tint} style={StyleSheet.absoluteFill} />
        <View style={styles.glassTint} pointerEvents="none" />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.eyebrow}>SYSTEM STATUS</Text>
            {updatedAt && <Text style={styles.timestamp}>Updated {updatedAt}</Text>}
          </View>

          <View style={styles.mainRow}>
            <View style={[styles.iconBadge, { backgroundColor: statusColor + '22', borderColor: statusColor + '40' }]}>
              <Feather name={meta.icon} size={22} color={statusColor} />
            </View>
            <View style={styles.mainText}>
              <Text style={styles.deviceName} numberOfLines={1}>{deviceName || 'BorderEye Unit'}</Text>
              <Text style={styles.statusText} numberOfLines={1}>{statusText}</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <StatusIndicator color={statusColor} label={meta.label} pulse={robotState === ROBOT_STATES.EXPLORING} />
            {uptime && (
              <View style={styles.uptimeWrap}>
                <Feather name="clock" size={11} color={colors.textDim} style={{ marginRight: 4 }} />
                <Text style={styles.uptime}>{uptime}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,14,20,0.38)',
  },
  content: {
    padding: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  eyebrow: {
    ...typography.sectionTitle,
    color: colors.textSecondary,
  },
  timestamp: {
    ...typography.timestamp,
    color: colors.textDim,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  mainText: {
    flex: 1,
  },
  deviceName: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  statusText: {
    ...typography.cardTitle,
    fontSize: 17,
    color: colors.text,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uptimeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uptime: {
    ...typography.metadata,
    color: colors.textDim,
  },
});

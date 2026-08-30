import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import AlertService from '../services/AlertService';
import { ALERT_TYPES } from '../utils/constants';
import { colors, radius, shadow, spacing, typography } from '../utils/theme';

const ALERT_ICONS = {
  [ALERT_TYPES.GAS]: 'cloud-outline',
  [ALERT_TYPES.METAL]: 'magnet-outline',
  [ALERT_TYPES.OBSTACLE]: 'warning-outline',
  [ALERT_TYPES.TEMPERATURE]: 'thermometer-outline',
};

export const AlertCard = ({ alert, index = 0 }) => {
  const icon = ALERT_ICONS[alert.type] || 'notifications-outline';
  const color = AlertService.getAlertColor(alert.type);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MotiView
      style={[styles.card, shadow.sm, { borderLeftColor: color }]}
      from={{ opacity: 0, translateX: 16 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 320, delay: Math.min(index, 8) * 50 }}
    >
      <View style={styles.content}>
        <View style={[styles.iconWrap, { backgroundColor: color + '1F', borderColor: color + '38' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.details}>
          <Text style={styles.message}>{alert.message}</Text>
          <Text style={styles.time}>{formatTime(alert.timestamp)}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: color + '1F' }]}>
          <Text style={[styles.severityText, { color }]}>{alert.severity}</Text>
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: spacing.lg,
    borderLeftWidth: 3,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  message: {
    ...typography.cardTitle,
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  time: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
  severityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
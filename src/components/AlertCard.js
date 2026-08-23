import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import AlertService from '../services/AlertService';
import { ALERT_TYPES } from '../utils/constants';

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
      style={[styles.card, { borderLeftColor: color }]}
      from={{ opacity: 0, translateX: 16 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 320, delay: Math.min(index, 8) * 50 }}
    >
      <View style={styles.content}>
        <View style={[styles.iconWrap, { backgroundColor: color + '26' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.details}>
          <Text style={styles.message}>{alert.message}</Text>
          <Text style={styles.time}>{formatTime(alert.timestamp)}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: color }]}>
          <Text style={styles.severityText}>{alert.severity}</Text>
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderRadius: 12,
    backgroundColor: '#252541',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#B0B0C0',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import AlertService from '../services/AlertService';

export const AlertCard = ({ alert }) => {
  const icon = AlertService.getAlertIcon(alert.type);
  const color = AlertService.getAlertColor(alert.type);
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.details}>
          <Text style={styles.message}>{alert.message}</Text>
          <Text style={styles.time}>{formatTime(alert.timestamp)}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: color }]}>
          <Text style={styles.severityText}>{alert.severity}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    backgroundColor: '#252541',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    fontSize: 24,
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
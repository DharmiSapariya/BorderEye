import { StyleSheet, Text, View } from 'react-native';
import { DataParser } from '../services/DataParser';
import { colors } from '../utils/colors';

export const RobotStatus = ({ robotState, sensorData }) => {
  const statusText = sensorData 
    ? DataParser.getRobotStatusText(robotState, sensorData)
    : '❌ Disconnected';
  
  const statusColor = DataParser.getStatusColor(robotState);

  return (
    <View style={[styles.container, { backgroundColor: statusColor + '20' }]}>
      <View style={styles.content}>
        <View style={[styles.indicator, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <View style={[styles.pulse, { backgroundColor: statusColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  pulse: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    left: 16,
    top: 16,
    opacity: 0.3,
  },
});
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { DataParser } from '../services/DataParser';
import { colors } from '../utils/colors';

export const RobotStatus = ({ robotState, sensorData }) => {
  const statusText = sensorData
    ? DataParser.getRobotStatusText(robotState, sensorData)
    : '❌ Disconnected';

  const statusColor = DataParser.getStatusColor(robotState);

  return (
    <MotiView
      style={[styles.container, { backgroundColor: statusColor + '20' }]}
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 350 }}
    >
      <View style={styles.content}>
        <View style={styles.indicatorWrap}>
          <MotiView
            style={[styles.pulse, { backgroundColor: statusColor }]}
            from={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ type: 'timing', duration: 1400, loop: true }}
          />
          <View style={[styles.indicator, { backgroundColor: statusColor }]} />
        </View>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
    </MotiView>
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
  indicatorWrap: {
    width: 12,
    height: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
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
  },
});
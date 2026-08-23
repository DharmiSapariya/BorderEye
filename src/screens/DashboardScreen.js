import { MotiView } from 'moti';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConnectionBadge } from '../components/ConnectionBadge';
import { RobotStatus } from '../components/RobotStatus';
import { SensorCard } from '../components/SensorCard';
import { useRobot } from '../context/RobotContext';
import { colors } from '../utils/colors';
import { THRESHOLDS } from '../utils/constants';

export const DashboardScreen = () => {
  const { sensorData, robotState, connectedDevice, stats, uptime } = useRobot();

  const getGasStatus = (gasValue) => {
    if (!gasValue) return null;
    if (gasValue > THRESHOLDS.GAS_DANGER) {
      return { text: 'DANGER', color: colors.danger };
    } else if (gasValue > THRESHOLDS.GAS_DANGER - 100) {
      return { text: 'Caution', color: colors.warning };
    }
    return { text: 'Safe', color: colors.success };
  };

  const getDistanceStatus = (distance) => {
    if (!distance) return null;
    if (distance <= THRESHOLDS.DISTANCE_CRITICAL) {
      return { text: 'Critical', color: colors.danger };
    } else if (distance <= THRESHOLDS.DISTANCE_WARNING) {
      return { text: 'Warning', color: colors.warning };
    }
    return { text: 'Clear', color: colors.success };
  };

  const getMetalStatus = (metal) => {
    if (metal === null || metal === undefined) return null;
    return metal === 0 
      ? { text: 'DETECTED', color: colors.danger }
      : { text: 'Clear', color: colors.success };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard</Text>
          <ConnectionBadge 
            isConnected={true} 
            deviceName={connectedDevice?.name || 'Robot'} 
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <RobotStatus robotState={robotState} sensorData={sensorData} />

        <View style={styles.sensorGrid}>
          <SensorCard
            index={0}
            title="Temperature"
            value={sensorData?.temperature?.toFixed(1)}
            unit="°C"
            icon="thermometer"
            gradient={colors.gradients.orange}
          />

          <SensorCard
            index={1}
            title="Humidity"
            value={sensorData?.humidity?.toFixed(0)}
            unit="%"
            icon="water-percent"
            gradient={colors.gradients.blue}
          />

          <SensorCard
            index={2}
            title="Air Quality"
            value={sensorData?.gas}
            unit=""
            icon="weather-windy"
            gradient={colors.gradients.purple}
            status={getGasStatus(sensorData?.gas)}
          />

          <SensorCard
            index={3}
            title="Distance"
            value={sensorData?.distance}
            unit="cm"
            icon="radar"
            gradient={colors.gradients.green}
            status={getDistanceStatus(sensorData?.distance)}
          />
        </View>

        <View style={styles.metalCard}>
          <SensorCard
            index={4}
            title="Metal Detection"
            value={sensorData?.metal === 0 ? 'DETECTED' : 'None'}
            unit=""
            icon="magnet"
            gradient={colors.gradients.red}
            status={getMetalStatus(sensorData?.metal)}
          />
        </View>

        <MotiView
          style={styles.statsContainer}
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 380, delay: 5 * 70 }}
        >
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{uptime}</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.obstaclesAvoided}</Text>
              <Text style={styles.statLabel}>Obstacles</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.alertsTriggered}</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.backgroundLight,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  content: {
    flex: 1,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  metalCard: {
    paddingHorizontal: 8,
  },
  statsContainer: {
    margin: 16,
    marginTop: 8,
    marginBottom: 28,
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
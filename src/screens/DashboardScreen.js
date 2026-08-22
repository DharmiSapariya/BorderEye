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
            title="Temperature"
            value={sensorData?.temperature?.toFixed(1)}
            unit="°C"
            icon="🌡️"
            gradient={colors.gradients.orange}
          />
          
          <SensorCard
            title="Humidity"
            value={sensorData?.humidity?.toFixed(0)}
            unit="%"
            icon="💧"
            gradient={colors.gradients.blue}
          />
          
          <SensorCard
            title="Air Quality"
            value={sensorData?.gas}
            unit=""
            icon="💨"
            gradient={colors.gradients.purple}
            status={getGasStatus(sensorData?.gas)}
          />
          
          <SensorCard
            title="Distance"
            value={sensorData?.distance}
            unit="cm"
            icon="📏"
            gradient={colors.gradients.green}
            status={getDistanceStatus(sensorData?.distance)}
          />
        </View>

        <View style={styles.metalCard}>
          <SensorCard
            title="Metal Detection"
            value={sensorData?.metal === 0 ? 'DETECTED' : 'None'}
            unit=""
            icon="🔩"
            gradient={colors.gradients.red}
            status={getMetalStatus(sensorData?.metal)}
          />
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{uptime}</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.obstaclesAvoided}</Text>
              <Text style={styles.statLabel}>Obstacles</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.alertsTriggered}</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
          </View>
        </View>
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
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
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
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
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
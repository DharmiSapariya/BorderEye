import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AlertCard } from '../components/AlertCard';
import { ConnectionBadge } from '../components/ConnectionBadge';
import { EmptyState } from '../components/EmptyState';
import { RobotStatus } from '../components/RobotStatus';
import { SectionHeader } from '../components/SectionHeader';
import { SensorCard } from '../components/SensorCard';
import { useRobot } from '../context/RobotContext';
import AlertService from '../services/AlertService';
import { colors, layout, radius, spacing, typography } from '../utils/theme';
import { THRESHOLDS } from '../utils/constants';

export const DashboardScreen = ({ navigation }) => {
  const { sensorData, dataHistory, robotState, connectedDevice, stats, uptime, alerts } = useRobot();

  // Oldest -> newest, last 12 readings, for the sparkline on each sensor
  // card (dataHistory itself is newest-first).
  const sparkline = (field) =>
    dataHistory
      .slice(0, 12)
      .map((d) => d[field])
      .filter((v) => typeof v === 'number')
      .reverse();

  const getGasStatus = (gasValue) => {
    if (!gasValue) return null;
    if (gasValue > THRESHOLDS.GAS_DANGER) {
      return { text: 'Danger', color: colors.danger };
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
      ? { text: 'Detected', color: colors.danger }
      : { text: 'Clear', color: colors.success };
  };

  // Critical/warning alerts surface here; everything else lives on the Alerts tab.
  const SEVERITY_RANK = { critical: 0, warning: 1, info: 2 };
  const topAlerts = [...alerts]
    .sort((a, b) => SEVERITY_RANK[AlertService.getAlertSeverity(a.type)] - SEVERITY_RANK[AlertService.getAlertSeverity(b.type)])
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>Dashboard</Text>
          <ConnectionBadge
            isConnected={true}
            deviceName={connectedDevice?.name || 'Robot'}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentInner}>
          {/* PRIMARY: overall system/robot status */}
          <RobotStatus
            robotState={robotState}
            sensorData={sensorData}
            deviceName={connectedDevice?.name}
            uptime={uptime}
          />

          {/* SECONDARY: critical alerts, only when they exist */}
          {topAlerts.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionPadded}>
                <SectionHeader
                  title="Critical Alerts"
                  icon="alert-triangle"
                  actionLabel="View all"
                  onAction={() => navigation.navigate('Alerts')}
                />
              </View>
              {topAlerts.map((alert, i) => (
                <AlertCard key={alert.id} alert={alert} index={i} />
              ))}
            </View>
          )}

          {/* SECONDARY: key sensor metrics */}
          <View style={styles.section}>
            <View style={styles.sectionPadded}>
              <SectionHeader title="Sensors" icon="activity" />
            </View>
            <View style={styles.sensorGrid}>
              <SensorCard
                index={0}
                title="Temperature"
                value={sensorData?.temperature}
                decimals={1}
                unit="°C"
                icon="thermometer"
                accent={colors.temperature}
                history={sparkline('temperature')}
              />
              <SensorCard
                index={1}
                title="Humidity"
                value={sensorData?.humidity}
                decimals={0}
                unit="%"
                icon="water-percent"
                accent={colors.humidity}
                history={sparkline('humidity')}
              />
              <SensorCard
                index={2}
                title="Air Quality"
                value={sensorData?.gas}
                unit=""
                icon="weather-windy"
                accent={colors.gas}
                status={getGasStatus(sensorData?.gas)}
                history={sparkline('gas')}
              />
              <SensorCard
                index={3}
                title="Distance"
                value={sensorData?.distance}
                unit="cm"
                icon="radar"
                accent={colors.distance}
                status={getDistanceStatus(sensorData?.distance)}
                history={sparkline('distance')}
              />
              <SensorCard
                index={4}
                title="Metal Detection"
                value={sensorData?.metal === 0 ? 'Detected' : 'None'}
                unit=""
                icon="magnet"
                accent={colors.metal}
                status={getMetalStatus(sensorData?.metal)}
              />
            </View>
          </View>

          {/* TERTIARY: session stats */}
          <View style={[styles.section, styles.statsCard]}>
            <SectionHeader title="Session" icon="bar-chart-2" />
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{uptime}</Text>
                <Text style={styles.statLabel}>Uptime</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.obstaclesAvoided}</Text>
                <Text style={styles.statLabel}>Obstacles</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.alertsTriggered}</Text>
                <Text style={styles.statLabel}>Alerts</Text>
              </View>
            </View>
          </View>

          {!sensorData && (
            <EmptyState
              icon="radio"
              title="Waiting for sensor data"
              subtitle="Readings will appear here as soon as telemetry starts streaming in."
            />
          )}
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
    paddingTop: 56,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  title: {
    ...typography.screenTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
  contentInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionPadded: {
    paddingHorizontal: spacing.lg,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.cardTitle,
    fontSize: 22,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
});

import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRobot } from '../context/RobotContext';
import { colors } from '../utils/colors';

const screenWidth = Dimensions.get('window').width;

export const AnalyticsScreen = () => {
  const { dataHistory, stats } = useRobot();

  // Prepare chart data (last 20 readings)
  const recentData = dataHistory.slice(0, 20).reverse();
  
  const temperatureData = recentData.map(d => d.temperature || 0);
  const gasData = recentData.map(d => d.gas || 0);
  const distanceData = recentData.map(d => d.distance || 0);

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(0, 217, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
  };

  const calculateAverage = (data) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((a, b) => a + b, 0);
    return (sum / data.length).toFixed(1);
  };

  const calculateMax = (data) => {
    if (data.length === 0) return 0;
    return Math.max(...data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>{dataHistory.length} readings recorded</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {recentData.length > 0 ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🌡️ Temperature Trend</Text>
              <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: temperatureData }],
                }}
                width={screenWidth - 32}
                height={180}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={false}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
              />
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Average</Text>
                  <Text style={styles.statValue}>{calculateAverage(temperatureData)}°C</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Max</Text>
                  <Text style={styles.statValue}>{calculateMax(temperatureData)}°C</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💨 Gas Levels</Text>
              <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: gasData }],
                }}
                width={screenWidth - 32}
                height={180}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(255, 230, 109, ${opacity})`,
                }}
                bezier
                style={styles.chart}
                withDots={false}
                withInnerLines={false}
                withOuterLines={true}
              />
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Average</Text>
                  <Text style={styles.statValue}>{calculateAverage(gasData)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Max</Text>
                  <Text style={styles.statValue}>{calculateMax(gasData)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📏 Distance Readings</Text>
              <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: distanceData }],
                }}
                width={screenWidth - 32}
                height={180}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(57, 255, 20, ${opacity})`,
                }}
                bezier
                style={styles.chart}
                withDots={false}
                withInnerLines={false}
                withOuterLines={true}
              />
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Average</Text>
                  <Text style={styles.statValue}>{calculateAverage(distanceData)} cm</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Min</Text>
                  <Text style={styles.statValue}>{Math.min(...distanceData)} cm</Text>
                </View>
              </View>
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>📊 Summary Statistics</Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryValue}>{stats.totalReadings}</Text>
                  <Text style={styles.summaryLabel}>Total Readings</Text>
                </View>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryValue}>{stats.obstaclesAvoided}</Text>
                  <Text style={styles.summaryLabel}>Obstacles Avoided</Text>
                </View>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryValue}>{stats.alertsTriggered}</Text>
                  <Text style={styles.summaryLabel}>Alerts Triggered</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📈</Text>
            <Text style={styles.emptyText}>No data yet</Text>
            <Text style={styles.emptySubtext}>Start collecting sensor data to see analytics</Text>
          </View>
        )}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  summarySection: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
import { Feather } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { EmptyState } from '../components/EmptyState';
import { useRobot } from '../context/RobotContext';
import { colors, layout, radius, shadow, spacing, typography } from '../utils/theme';

const SectionTitle = ({ icon, children }) => (
  <View style={styles.sectionTitleRow}>
    <Feather name={icon} size={14} color={colors.primary} style={styles.sectionTitleIcon} />
    <Text style={styles.sectionTitle}>{children}</Text>
  </View>
);

// rgba(...) builders so react-native-chart-kit (which needs a color function,
// not a static value) still draws in the theme's muted sensor accents.
const rgbaFromHex = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

const baseChartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 1,
  labelColor: (opacity = 1) => `rgba(${rgbaFromHex(colors.textDim)}, ${opacity})`,
};

const chartColorConfig = (hex) => ({
  ...baseChartConfig,
  color: (opacity = 1) => `rgba(${rgbaFromHex(hex)}, ${opacity})`,
});

const screenWidth = Dimensions.get('window').width;

export const AnalyticsScreen = () => {
  const { dataHistory, stats } = useRobot();

  const recentData = dataHistory.slice(0, 20).reverse();

  const temperatureData = recentData.map(d => d.temperature || 0);
  const gasData = recentData.map(d => d.gas || 0);
  const distanceData = recentData.map(d => d.distance || 0);

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
        <View style={styles.headerInner}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>{dataHistory.length} readings recorded</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentInner}>
          {recentData.length > 0 ? (
            <>
              <View style={[styles.section, shadow.sm]}>
                <SectionTitle icon="thermometer">Temperature Trend</SectionTitle>
                <LineChart
                  data={{ labels: [], datasets: [{ data: temperatureData }] }}
                  width={Math.min(screenWidth, layout.maxContentWidth) - 64}
                  height={180}
                  chartConfig={chartColorConfig(colors.temperature)}
                  bezier
                  style={styles.chart}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines
                  withVerticalLabels
                  withHorizontalLabels
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

              <View style={[styles.section, shadow.sm]}>
                <SectionTitle icon="wind">Gas Levels</SectionTitle>
                <LineChart
                  data={{ labels: [], datasets: [{ data: gasData }] }}
                  width={Math.min(screenWidth, layout.maxContentWidth) - 64}
                  height={180}
                  chartConfig={chartColorConfig(colors.gas)}
                  bezier
                  style={styles.chart}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines
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

              <View style={[styles.section, shadow.sm]}>
                <SectionTitle icon="radio">Distance Readings</SectionTitle>
                <LineChart
                  data={{ labels: [], datasets: [{ data: distanceData }] }}
                  width={Math.min(screenWidth, layout.maxContentWidth) - 64}
                  height={180}
                  chartConfig={chartColorConfig(colors.distance)}
                  bezier
                  style={styles.chart}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines
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

              <View style={[styles.section, shadow.sm]}>
                <SectionTitle icon="bar-chart-2">Summary Statistics</SectionTitle>
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
            <EmptyState
              icon="bar-chart-2"
              title="No data yet"
              subtitle="Start collecting sensor data to see analytics"
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
    paddingBottom: spacing.lg,
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
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  contentInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
  },
  section: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitleIcon: {
    marginRight: spacing.sm,
  },
  sectionTitle: {
    ...typography.cardTitle,
    color: colors.text,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.metadata,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...typography.cardTitle,
    color: colors.primary,
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
    fontSize: 22,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 4,
  },
  summaryLabel: {
    ...typography.metadata,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

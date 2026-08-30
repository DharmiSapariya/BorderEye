import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AlertCard } from '../components/AlertCard';
import { PressScale } from '../components/PressScale';
import { useRobot } from '../context/RobotContext';
import { colors, layout, radius, spacing, typography } from '../utils/theme';

export const AlertsScreen = () => {
  const { alerts } = useRobot();
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: 'list-outline' },
    { id: 'gas', label: 'Gas', icon: 'cloud-outline' },
    { id: 'metal', label: 'Metal', icon: 'magnet-outline' },
    { id: 'obstacle', label: 'Obstacle', icon: 'warning-outline' },
    { id: 'temperature', label: 'Temperature', icon: 'thermometer-outline' },
  ];

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(alert => alert.type === filter);

  const renderFilter = (item) => (
    <PressScale
      style={[
        styles.filterButton,
        filter === item.id && styles.filterButtonActive
      ]}
      onPress={() => setFilter(item.id)}
      accessibilityLabel={`Filter: ${item.label}`}
      accessibilityState={{ selected: filter === item.id }}
    >
      <Ionicons
        name={item.icon}
        size={14}
        color={filter === item.id ? colors.textOnDark : colors.textSecondary}
        style={styles.filterIcon}
      />
      <Text style={[
        styles.filterText,
        filter === item.id && styles.filterTextActive
      ]}>
        {item.label}
      </Text>
    </PressScale>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>Alerts & Logs</Text>
          <Text style={styles.subtitle}>{filteredAlerts.length} total alerts</Text>
        </View>
      </View>

      <View style={styles.filters}>
        <FlatList
          data={filters}
          renderItem={({ item }) => renderFilter(item)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {filteredAlerts.length > 0 ? (
        <FlatList
          data={filteredAlerts}
          renderItem={({ item, index }) => <AlertCard alert={item} index={index} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="checkmark-circle-outline" size={40} color={colors.success} />
          </View>
          <Text style={styles.emptyText}>No alerts</Text>
          <Text style={styles.emptySubtext}>
            {filter === 'all'
              ? 'The unit is operating within normal thresholds'
              : `No ${filter} alerts recorded`}
          </Text>
        </View>
      )}
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
  filters: {
    paddingVertical: spacing.md,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersList: {
    paddingHorizontal: spacing.xl,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textOnDark,
  },
  list: {
    paddingVertical: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.successTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyText: {
    ...typography.cardTitle,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AlertCard } from '../components/AlertCard';
import { useRobot } from '../context/RobotContext';
import { colors } from '../utils/colors';

export const AlertsScreen = () => {
  const { alerts } = useRobot();
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: 'list-outline' },
    { id: 'gas', label: 'Gas', icon: 'cloud-outline' },
    { id: 'metal', label: 'Metal', icon: 'magnet-outline' },
    { id: 'obstacle', label: 'Obstacle', icon: 'warning-outline' },
  ];

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(alert => alert.type === filter);

  const renderFilter = (item) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === item.id && styles.filterButtonActive
      ]}
      onPress={() => setFilter(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={15}
        color={filter === item.id ? colors.text : colors.textSecondary}
        style={styles.filterIcon}
      />
      <Text style={[
        styles.filterText,
        filter === item.id && styles.filterTextActive
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts & Logs</Text>
        <Text style={styles.subtitle}>{filteredAlerts.length} total alerts</Text>
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
          <Ionicons name="checkmark-circle-outline" size={56} color={colors.success} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No alerts</Text>
          <Text style={styles.emptySubtext}>
            {filter === 'all' 
              ? 'Your robot is operating normally'
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
  filters: {
    paddingVertical: 12,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  list: {
    paddingVertical: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
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
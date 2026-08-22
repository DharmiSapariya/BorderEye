import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../utils/colors';

export const SensorCard = ({ title, value, unit, icon, gradient, status }) => {
  return (
    <Card style={styles.card}>
      <LinearGradient
        colors={gradient || colors.gradients.blue}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>
            {value !== null && value !== undefined ? value : '--'}
            <Text style={styles.unit}>{unit}</Text>
          </Text>
          {status && (
            <View style={[
              styles.statusBadge,
              { backgroundColor: status.color }
            ]}>
              <Text style={styles.statusText}>{status.text}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 16,
    elevation: 4,
    overflow: 'hidden',
    flex: 1,
    minWidth: '45%',
  },
  gradient: {
    padding: 16,
    minHeight: 140,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
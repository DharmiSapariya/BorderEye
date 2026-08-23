import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';

export const SensorCard = ({ title, value, unit, icon, gradient, status, index = 0 }) => {
  return (
    <MotiView
      style={styles.card}
      from={{ opacity: 0, translateY: 14, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'timing', duration: 380, delay: index * 70 }}
    >
      <LinearGradient
        colors={gradient || colors.gradients.blue}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={icon} size={22} color="#FFFFFF" />
          </View>
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
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 18,
    overflow: 'hidden',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  gradient: {
    padding: 16,
    minHeight: 140,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../utils/theme';

export const MetricValue = ({ label, value, unit, color = colors.text, large = false }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={[large ? styles.valueLarge : styles.value, { color }]}>
      {value !== null && value !== undefined ? value : '--'}
      {unit ? <Text style={styles.unit}> {unit}</Text> : null}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    ...typography.metric,
    color: colors.text,
  },
  valueLarge: {
    ...typography.metricLarge,
    color: colors.text,
  },
  unit: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});

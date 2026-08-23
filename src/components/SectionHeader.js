import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';

export const SectionHeader = ({ title, icon, actionLabel, onAction }) => (
  <View style={styles.row}>
    <View style={styles.left}>
      {icon && <Feather name={icon} size={13} color={colors.primary} style={styles.icon} />}
      <Text style={styles.title}>{title}</Text>
    </View>
    {actionLabel && (
      <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button" accessibilityLabel={actionLabel}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textSecondary,
  },
  action: {
    ...typography.label,
    color: colors.primary,
  },
});

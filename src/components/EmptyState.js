import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../utils/theme';

export const EmptyState = ({ icon = 'inbox', title, subtitle }) => (
  <MotiView
    style={styles.container}
    from={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 350 }}
  >
    <View style={styles.iconWrap}>
      <Feather name={icon} size={30} color={colors.textDim} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </MotiView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
    paddingHorizontal: spacing.xxl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.cardTitle,
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

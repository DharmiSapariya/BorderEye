import { Feather, Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { SectionHeader } from '../components/SectionHeader';
import { useRobot } from '../context/RobotContext';
import { BLUETOOTH_DEVICE_NAME, REFRESH_RATE, THRESHOLDS } from '../utils/constants';
import { colors, layout, radius, shadow, spacing, typography } from '../utils/theme';

export const SettingsScreen = ({ navigation }) => {
  const { connectedDevice, disconnect } = useRobot();

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect',
      'Are you sure you want to disconnect from the unit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            await disconnect();
            navigation.replace('Connection');
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, danger }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={styles.settingContent}>
        <View style={[styles.settingIconWrap, danger && styles.settingIconWrapDanger]}>
          <Ionicons name={icon} size={17} color={danger ? colors.danger : colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, danger && styles.dangerText]}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={17} color={colors.textDim} />
    </TouchableOpacity>
  );

  const ThresholdRow = ({ label, value }) => (
    <View style={styles.thresholdRow}>
      <Text style={styles.thresholdLabel}>{label}</Text>
      <View style={styles.thresholdValueWrap}>
        <Text style={styles.thresholdValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentInner}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connection</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Connected Device</Text>
              <Text style={styles.infoValue}>{connectedDevice?.name || 'Unknown'}</Text>
              <Text style={styles.infoAddress}>{connectedDevice?.address || ''}</Text>
            </View>

            <SettingItem
              icon="power-outline"
              title="Disconnect Unit"
              subtitle="End current connection"
              onPress={handleDisconnect}
              danger
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <SettingItem
              icon="phone-portrait-outline"
              title="Haptic Feedback"
              subtitle="Currently enabled"
              onPress={() => Alert.alert('Info', 'Haptic feedback is enabled for alerts')}
            />
            <SettingItem
              icon="notifications-outline"
              title="Alert Sounds"
              subtitle="Currently disabled"
              onPress={() => Alert.alert('Info', 'Sound alerts are disabled')}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.thresholdHeaderRow}>
              <Text style={styles.sectionTitle}>Configured Thresholds</Text>
              <View style={styles.prototypeTag}>
                <Text style={styles.prototypeTagText}>READ-ONLY</Text>
              </View>
            </View>
            <View style={[styles.thresholdCard, shadow.sm]}>
              <ThresholdRow label="GAS ALERT LEVEL" value={THRESHOLDS.GAS_DANGER} />
              <View style={styles.thresholdDivider} />
              <ThresholdRow label="DISTANCE WARNING" value={`${THRESHOLDS.DISTANCE_WARNING} cm`} />
              <View style={styles.thresholdDivider} />
              <ThresholdRow label="DISTANCE CRITICAL" value={`${THRESHOLDS.DISTANCE_CRITICAL} cm`} />
              <View style={styles.thresholdDivider} />
              <ThresholdRow label="TEMP HIGH" value={`${THRESHOLDS.TEMP_HIGH}°C`} />
              <View style={styles.thresholdDivider} />
              <ThresholdRow label="TEMP LOW" value={`${THRESHOLDS.TEMP_LOW}°C`} />
            </View>
            <Text style={styles.thresholdNote}>
              These values are set in the firmware and app config — changing
              them here doesn&apos;t affect the physical unit.
            </Text>
          </View>

          <View style={styles.section}>
            <SectionHeader title="System Architecture" icon="cpu" />
            <View style={[styles.diagramCard, shadow.sm]}>
              <ArchitectureDiagram />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>

            <View style={[styles.aboutCard, shadow.sm]}>
              <Text style={styles.aboutTitle}>BorderEye Monitor</Text>
              <Text style={styles.aboutVersion}>Version 1.0.0 · Prototype</Text>
              <Text style={styles.aboutDescription}>
                Real-time monitoring app for the BorderEye multi-sensor
                intrusion and hazard detection platform.
              </Text>
              <View style={styles.aboutDetails}>
                <View style={styles.aboutDetailRow}>
                  <Feather name="bluetooth" size={13} color={colors.textSecondary} />
                  <Text style={styles.aboutDetail}>Bluetooth: {BLUETOOTH_DEVICE_NAME}</Text>
                </View>
                <View style={styles.aboutDetailRow}>
                  <Feather name="terminal" size={13} color={colors.textSecondary} />
                  <Text style={styles.aboutDetail}>Protocol: Serial Monitor</Text>
                </View>
                <View style={styles.aboutDetailRow}>
                  <Feather name="zap" size={13} color={colors.textSecondary} />
                  <Text style={styles.aboutDetail}>Refresh rate: {REFRESH_RATE}ms</Text>
                </View>
              </View>
            </View>
          </View>
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
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textDim,
    marginBottom: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  infoLabel: {
    ...typography.metadata,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    ...typography.cardTitle,
    fontSize: 17,
    color: colors.text,
    marginBottom: 2,
  },
  infoAddress: {
    ...typography.metadata,
    color: colors.textDim,
  },
  settingItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingIconWrapDanger: {
    backgroundColor: colors.dangerTint,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
  dangerText: {
    color: colors.danger,
  },
  thresholdHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prototypeTag: {
    backgroundColor: colors.accentTint,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginBottom: spacing.sm,
  },
  prototypeTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: colors.primaryDeep,
  },
  thresholdCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  thresholdLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  thresholdValueWrap: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  thresholdValue: {
    ...typography.label,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  thresholdDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  thresholdNote: {
    ...typography.metadata,
    color: colors.textDim,
    marginTop: spacing.sm,
  },
  diagramCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  aboutCard: {
    backgroundColor: colors.surfaceDark,
    padding: spacing.xl,
    borderRadius: radius.lg,
  },
  aboutTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textOnDark,
    marginBottom: 4,
  },
  aboutVersion: {
    ...typography.label,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  aboutDescription: {
    ...typography.body,
    color: colors.textOnDarkSecondary,
    marginBottom: spacing.lg,
  },
  aboutDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.borderOnDark,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  aboutDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  aboutDetail: {
    ...typography.metadata,
    color: colors.textOnDarkSecondary,
    marginLeft: spacing.sm,
  },
});

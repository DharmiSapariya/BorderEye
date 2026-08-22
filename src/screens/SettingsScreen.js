import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRobot } from '../context/RobotContext';
import { colors } from '../utils/colors';

export const SettingsScreen = ({ navigation }) => {
  const { connectedDevice, disconnect } = useRobot();

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect',
      'Are you sure you want to disconnect from the robot?',
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
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, danger && styles.dangerText]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Connected Device</Text>
            <Text style={styles.infoValue}>{connectedDevice?.name || 'Unknown'}</Text>
            <Text style={styles.infoAddress}>{connectedDevice?.address || ''}</Text>
          </View>

          <SettingItem
            icon="🔌"
            title="Disconnect Robot"
            subtitle="End current connection"
            onPress={handleDisconnect}
            danger
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <SettingItem
            icon="📳"
            title="Haptic Feedback"
            subtitle="Currently enabled"
            onPress={() => Alert.alert('Info', 'Haptic feedback is enabled for alerts')}
          />
          
          <SettingItem
            icon="🔔"
            title="Alert Sounds"
            subtitle="Currently disabled"
            onPress={() => Alert.alert('Info', 'Sound alerts are disabled')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thresholds</Text>
          
          <SettingItem
            icon="💨"
            title="Gas Alert Level"
            subtitle="Triggers at 450"
            onPress={() => Alert.alert('Info', 'Gas alert threshold: 450')}
          />
          
          <SettingItem
            icon="📏"
            title="Distance Warning"
            subtitle="Triggers at 15cm"
            onPress={() => Alert.alert('Info', 'Distance warning threshold: 15cm')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>BorderEye Monitor</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Real-time monitoring app for BorderEye hazard detection robot
            </Text>
            <View style={styles.aboutDetails}>
              <Text style={styles.aboutDetail}>📡 Bluetooth: {BLUETOOTH_DEVICE_NAME}</Text>
              <Text style={styles.aboutDetail}>🤖 Protocol: Serial Monitor</Text>
              <Text style={styles.aboutDetail}>⚡ Refresh: 500ms</Text>
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
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  infoAddress: {
    fontSize: 14,
    color: colors.textDim,
  },
  settingItem: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dangerText: {
    color: colors.danger,
  },
  arrow: {
    fontSize: 24,
    color: colors.textDim,
  },
  aboutCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  aboutDetail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
});
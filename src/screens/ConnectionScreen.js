import { Feather, Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Logo } from '../components/Logo';
import { PressScale } from '../components/PressScale';
import { useRobot } from '../context/RobotContext';
import WiFiService from '../services/WiFiService';
import { colors, layout, radius, shadow, spacing, typography } from '../utils/theme';

export const ConnectionScreen = ({ navigation }) => {
  const { connect } = useRobot();
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    try {
      const foundDevices = await WiFiService.scanDevices();
      setDevices(foundDevices);
    } catch (error) {
      console.error('Scan failed:', error);
    }
    setScanning(false);
  };

  const handleConnect = async (device) => {
    setConnecting(true);
    try {
      const success = await connect(device);
      if (success) {
        navigation.replace('Main');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
    setConnecting(false);
  };

  const renderDevice = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300, delay: index * 60 }}
    >
      <PressScale
        style={[styles.deviceCard, shadow.sm]}
        onPress={() => handleConnect(item)}
        disabled={connecting}
        accessibilityLabel={`Connect to ${item.name}`}
      >
        <View style={styles.deviceIconWrap}>
          <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceAddress}>{item.address}</Text>
          {item.isReal === false && (
            <View style={styles.demoTag}>
              <Text style={styles.demoTagText}>SIMULATED DATA</Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textDim} />
      </PressScale>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.header}
        from={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <View style={styles.headerInner}>
          <View style={styles.brandRow}>
            <View style={styles.brandIconWrap}>
              <Logo size={24} ring={colors.textOnDark} aperture={colors.textOnDark} blip={colors.accent} />
            </View>
            <View>
              <Text style={styles.title}>BorderEye Monitor</Text>
              <Text style={styles.subtitle}>Connect to your unit</Text>
            </View>
          </View>
        </View>
      </MotiView>

      <View style={styles.content}>
        <View style={styles.contentInner}>
          <PressScale
            style={styles.scanButton}
            onPress={handleScan}
            disabled={scanning || connecting}
            accessibilityLabel={devices.length > 0 ? 'Scan again' : 'Scan for devices'}
          >
            {scanning ? (
              <ActivityIndicator color={colors.textOnDark} />
            ) : (
              <>
                <Feather name="wifi" size={16} color={colors.textOnDark} style={{ marginRight: spacing.sm }} />
                <Text style={styles.scanButtonText}>
                  {devices.length > 0 ? 'SCAN AGAIN' : 'SCAN FOR DEVICES'}
                </Text>
              </>
            )}
          </PressScale>

          {connecting && (
            <View style={styles.connectingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.connectingText}>Connecting…</Text>
            </View>
          )}

          {devices.length > 0 && !connecting && (
            <View style={styles.deviceList}>
              <Text style={styles.listTitle}>AVAILABLE DEVICES</Text>
              <FlatList
                data={devices}
                renderItem={renderDevice}
                keyExtractor={(item) => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          {devices.length === 0 && !scanning && (
            <MotiView
              style={styles.emptyState}
              from={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 400 }}
            >
              <View style={styles.emptyIconWrap}>
                <Ionicons name="wifi-outline" size={36} color={colors.textDim} />
              </View>
              <Text style={styles.emptyText}>No bridge server found yet</Text>
              <Text style={styles.emptySubtext}>
                Make sure the bridge server is running on your computer and both
                devices are on the same network. Scanning always finds a device
                to connect to — a real bridge if reachable, otherwise a
                simulated one for exploring the app.
              </Text>
            </MotiView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headerInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  title: {
    ...typography.screenTitle,
    fontSize: 20,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  contentInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  scanButton: {
    flexDirection: 'row',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  scanButtonText: {
    ...typography.label,
    color: colors.textOnDark,
    letterSpacing: 0.6,
  },
  connectingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.huge,
  },
  connectingText: {
    marginTop: spacing.md,
    ...typography.body,
    color: colors.textSecondary,
  },
  deviceList: {
    flex: 1,
  },
  listTitle: {
    ...typography.sectionTitle,
    color: colors.textDim,
    marginBottom: spacing.md,
  },
  list: {
    flex: 1,
  },
  deviceCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    ...typography.cardTitle,
    color: colors.text,
    marginBottom: 2,
  },
  deviceAddress: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
  demoTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentTint,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: spacing.xs,
  },
  demoTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: colors.primaryDeep,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconWrap: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyText: {
    ...typography.cardTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});

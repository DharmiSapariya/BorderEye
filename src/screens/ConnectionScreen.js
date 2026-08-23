import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRobot } from '../context/RobotContext';
import WiFiService from '../services/WiFiService';
import { colors } from '../utils/colors';

export const ConnectionScreen = ({ navigation }) => {
  const { connect } = useRobot();
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    try {
      const foundDevices = await WiFiService.scanDevices(); // Changed from BluetoothService
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
      <TouchableOpacity
        style={styles.deviceCard}
        onPress={() => handleConnect(item)}
        disabled={connecting}
      >
        <View style={styles.deviceIconWrap}>
          <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceAddress}>{item.address}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight]}
      style={styles.container}
    >
      <MotiView
        style={styles.header}
        from={{ opacity: 0, translateY: -8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <View style={styles.brandRow}>
          <View style={styles.brandIconWrap}>
            <Ionicons name="shield-checkmark" size={26} color={colors.primary} />
          </View>
          <Text style={styles.title}>BorderEye Monitor</Text>
        </View>
        <Text style={styles.subtitle}>Connect to your robot</Text>
      </MotiView>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
          onPress={handleScan}
          disabled={scanning || connecting}
        >
          <LinearGradient
            colors={colors.gradients.blue}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {scanning ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.scanButtonText}>
                {devices.length > 0 ? 'Scan Again' : 'Scan for Devices'}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {connecting && (
          <View style={styles.connectingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.connectingText}>Connecting...</Text>
          </View>
        )}

        {devices.length > 0 && !connecting && (
          <View style={styles.deviceList}>
            <Text style={styles.listTitle}>Available Devices</Text>
            <FlatList
              data={devices}
              renderItem={renderDevice}
              keyExtractor={(item) => item.id}
              style={styles.list}
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
              <Ionicons name="wifi-outline" size={40} color={colors.textDim} />
            </View>
            <Text style={styles.emptyText}>No bridge server found</Text>
            <Text style={styles.emptySubtext}>Make sure bridge server is running on your computer and both devices are on same WiFi</Text>
          </MotiView>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary + '1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scanButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  connectingContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  connectingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },
  deviceList: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  deviceCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primary + '1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  deviceAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
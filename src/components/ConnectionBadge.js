import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';

export const ConnectionBadge = ({ isConnected, deviceName }) => {
  const color = isConnected ? colors.success : colors.danger;

  return (
    <View style={[styles.container, { backgroundColor: color + '20' }]}>
      <View style={styles.dotWrap}>
        {isConnected && (
          <MotiView
            style={[styles.dotPulse, { backgroundColor: color }]}
            from={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ type: 'timing', duration: 1400, loop: true }}
          />
        )}
        <View style={[styles.dot, { backgroundColor: color }]} />
      </View>
      <Text style={styles.text}>
        {isConnected ? `Connected to ${deviceName}` : 'Disconnected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  dotWrap: {
    width: 8,
    height: 8,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPulse: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
});
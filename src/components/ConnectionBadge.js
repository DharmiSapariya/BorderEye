import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';

export const ConnectionBadge = ({ isConnected, deviceName }) => {
  return (
    <View style={[
      styles.container,
      { backgroundColor: isConnected ? colors.success + '20' : colors.danger + '20' }
    ]}>
      <View style={[
        styles.dot,
        { backgroundColor: isConnected ? colors.success : colors.danger }
      ]} />
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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
});
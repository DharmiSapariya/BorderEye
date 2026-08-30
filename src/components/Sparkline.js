import Svg, { Polyline } from 'react-native-svg';
import { View } from 'react-native';

/**
 * Minimal trend line for a card — same role as WalletWise's Sparkline:
 * a quick "is this moving?" read from real recent history, not a full chart.
 */
export const Sparkline = ({ data, color, width = 64, height = 22 }) => {
  if (!data || data.length < 2) return <View style={{ width, height }} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`)
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

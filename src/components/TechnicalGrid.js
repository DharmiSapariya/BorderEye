import { StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { colors } from '../utils/theme';

/**
 * Faint repeating grid used as background texture behind hero/section-
 * transition surfaces — matches the spec's "technical grids" visual
 * language without pulling in any new dependency.
 */
export const TechnicalGrid = ({ width, height, step = 28, color = colors.border, opacity = 1, style }) => {
  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);

  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Svg width={width} height={height} style={{ opacity }}>
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <Line key={`v${i}`} x1={i * step} y1={0} x2={i * step} y2={height} stroke={color} strokeWidth={1} />
        ))}
        {Array.from({ length: rows + 1 }).map((_, i) => (
          <Line key={`h${i}`} x1={0} y1={i * step} x2={width} y2={i * step} stroke={color} strokeWidth={1} />
        ))}
      </Svg>
    </View>
  );
};

import Svg, { Circle, Line } from 'react-native-svg';
import { colors } from '../utils/theme';

/**
 * BorderEye mark: a perimeter ring (the "border") with a scan-gap and a
 * cardinal blip, around a solid aperture (the "eye"). Drawn in a fixed
 * 0-100 viewBox and scaled via width/height, so it stays crisp at any size.
 */
const RING_R = 38;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

export const Logo = ({ size = 32, ring = colors.primary, aperture = colors.primary, blip = colors.accent }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle
      cx={50}
      cy={50}
      r={RING_R}
      stroke={ring}
      strokeWidth={6}
      fill="none"
      strokeDasharray={`${CIRCUMFERENCE * 0.86} ${CIRCUMFERENCE * 0.14}`}
      strokeDashoffset={CIRCUMFERENCE * 0.07}
      strokeLinecap="round"
    />
    <Circle cx={50} cy={50} r={15} fill={aperture} />
    <Line x1={50} y1={6} x2={50} y2={18} stroke={blip} strokeWidth={6} strokeLinecap="round" />
  </Svg>
);

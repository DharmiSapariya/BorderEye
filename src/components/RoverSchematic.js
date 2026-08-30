import Svg, { Circle, Line, Rect, Text as SvgText } from 'react-native-svg';
import { colors } from '../utils/theme';

const WHEEL_W = 18;
const WHEEL_H = 46;

const Wheel = ({ x, y }) => (
  <Rect x={x} y={y} width={WHEEL_W} height={WHEEL_H} rx={6} fill={colors.surfaceDark} opacity={0.85} />
);

const SensorNode = ({ cx, cy, color, labelX, labelY, label, align = 'start' }) => (
  <>
    <Line x1={cx} y1={cy} x2={labelX} y2={labelY} stroke={color} strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
    <Circle cx={cx} cy={cy} r={5} fill={color} />
    <SvgText x={labelX + (align === 'end' ? -6 : 6)} y={labelY + 3} fontSize={8} fill={color} textAnchor={align} fontWeight="700">
      {label}
    </SvgText>
  </>
);

/**
 * Top-down technical schematic of the chassis — not a literal render, a
 * blueprint-style diagram (4WD chassis + the four real sensor nodes wired
 * to a central controller), matching the real component layout described
 * in README's Hardware Components table without claiming to be a photo.
 */
export const RoverSchematic = ({ width = 220, height = 300 }) => (
  <Svg width={width} height={height} viewBox="0 0 220 300">
    {/* chassis */}
    <Rect x={60} y={40} width={100} height={220} rx={20} stroke={colors.primary} strokeWidth={1.5} fill="none" />
    {/* wheels */}
    <Wheel x={34} y={54} />
    <Wheel x={168} y={54} />
    <Wheel x={34} y={200} />
    <Wheel x={168} y={200} />

    {/* MCU chip, center */}
    <Rect x={92} y={135} width={36} height={36} rx={5} stroke={colors.primary} strokeWidth={1.5} fill={colors.surfaceElevated} />
    {[0, 1, 2, 3].map((i) => (
      <Line key={`pl${i}`} x1={92} y1={144 + i * 8} x2={86} y2={144 + i * 8} stroke={colors.primary} strokeWidth={1.5} />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <Line key={`pr${i}`} x1={128} y1={144 + i * 8} x2={134} y2={144 + i * 8} stroke={colors.primary} strokeWidth={1.5} />
    ))}
    <SvgText x={110} y={157} fontSize={8} fill={colors.primary} textAnchor="middle" fontWeight="700">MCU</SvgText>

    {/* sensor nodes -> leader lines -> labels */}
    <SensorNode cx={110} cy={70} color={colors.distance} labelX={110} labelY={22} label="PROXIMITY" align="middle" />
    <SensorNode cx={80} cy={100} color={colors.metal} labelX={20} labelY={95} label="METAL" align="start" />
    <SensorNode cx={140} cy={100} color={colors.gas} labelX={200} labelY={95} label="GAS" align="end" />
    <SensorNode cx={110} cy={230} color={colors.temperature} labelX={110} labelY={282} label="ENVIRONMENT" align="middle" />
  </Svg>
);

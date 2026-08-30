import { Feather } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { TechnicalGrid } from '../components/TechnicalGrid';
import { colors, spacing, typography } from '../utils/theme';

const RING_SIZE = 96;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Radar-sweep motif standing in for a literal loader asset — a rotating
// gradient wedge plus an outer pulse, matching the "scanning / sensing /
// system initialization" motion language without a bundled animation file.
const ScanRing = ({ reduceMotion }) => (
  <View style={styles.ringWrap}>
    {!reduceMotion && (
      <>
        <MotiView
          style={styles.ringPulse}
          from={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.7 }}
          transition={{ type: 'timing', duration: 1400, loop: true }}
        />
        <MotiView
          style={StyleSheet.absoluteFill}
          from={{ rotate: '0deg' }}
          animate={{ rotate: '360deg' }}
          transition={{ type: 'timing', duration: 1600, loop: true, repeatReverse: false }}
        >
          <Svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
            <Defs>
              <LinearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.primary} stopOpacity="0" />
                <Stop offset="1" stopColor={colors.primary} stopOpacity="0.9" />
              </LinearGradient>
            </Defs>
            <Path
              d={`M ${RING_SIZE / 2} ${RING_SIZE / 2} L ${RING_SIZE / 2} 0 A ${RING_SIZE / 2} ${RING_SIZE / 2} 0 0 1 ${RING_SIZE} ${RING_SIZE / 2} Z`}
              fill="url(#sweep)"
            />
          </Svg>
        </MotiView>
      </>
    )}
    <Svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} style={StyleSheet.absoluteFill}>
      <Circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_SIZE / 2 - 1} stroke={colors.borderOnDark} strokeWidth={1} fill="none" />
    </Svg>
    <Feather name="shield" size={22} color={colors.textOnDark} />
  </View>
);

const STEPS = ['BORDEREYE INITIALIZING…', 'SENSOR NETWORK ONLINE', 'MONITORING READY'];
const STEP_DURATION = 550;

export const SplashScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion).catch(() => {});
  }, []);

  useEffect(() => {
    if (step >= STEPS.length - 1) {
      const finish = setTimeout(onDone, reduceMotion ? 200 : STEP_DURATION);
      return () => clearTimeout(finish);
    }
    const next = setTimeout(() => setStep((s) => s + 1), reduceMotion ? 150 : STEP_DURATION);
    return () => clearTimeout(next);
  }, [step, reduceMotion, onDone]);

  return (
    <View style={styles.container}>
      <TechnicalGrid width={SCREEN_WIDTH} height={SCREEN_HEIGHT} step={32} color={colors.borderOnDark} opacity={0.5} />
      <ScanRing reduceMotion={reduceMotion} />
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={step}
          from={{ opacity: 0, translateY: 6 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -6 }}
          transition={{ type: 'timing', duration: reduceMotion ? 100 : 220 }}
        >
          <Text style={styles.stepText}>{STEPS[step]}</Text>
        </MotiView>
      </AnimatePresence>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  ringPulse: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.primaryTint,
    backgroundColor: 'transparent',
  },
  stepText: {
    ...typography.sectionTitle,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.textOnDarkSecondary,
  },
});

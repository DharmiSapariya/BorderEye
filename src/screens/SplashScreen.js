import { Feather } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';

// Simple scanning-ring motif standing in for a literal loader asset —
// keeps to the "scanning / sensing / system initialization" motion
// language without depending on any bundled animation file.
const ScanRing = ({ reduceMotion }) => (
  <View style={styles.ringWrap}>
    <View style={styles.ringBase} />
    {!reduceMotion && (
      <MotiView
        style={styles.ringPulse}
        from={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 0, scale: 1.9 }}
        transition={{ type: 'timing', duration: 1400, loop: true }}
      />
    )}
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

const RING_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.borderOnDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  ringBase: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.borderOnDark,
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

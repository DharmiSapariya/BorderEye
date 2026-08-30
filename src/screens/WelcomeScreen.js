import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SectionHeader } from '../components/SectionHeader';
import { SensingLayers } from '../components/SensingLayers';
import { SignalFlowDiagram } from '../components/SignalFlowDiagram';
import { TechnicalGrid } from '../components/TechnicalGrid';
import { colors, fontFamily, layout, radius, shadow, spacing, typography } from '../utils/theme';

const hardwareImage = require('../../assets/border-eye-hardware.jpg');
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 300;

const SNAPSHOT = [
  { value: '04', label: 'SENSORS' },
  { value: '4WD', label: 'PLATFORM' },
  { value: 'LIVE', label: 'MONITORING' },
  { value: 'MULTI', label: 'THREAT DETECTION' },
];

export const WelcomeScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const heroOpacity = scrollY.interpolate({ inputRange: [0, 200], outputRange: [1, 0.1], extrapolate: 'clamp' });
  const heroTranslate = scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -36], extrapolate: 'clamp' });
  const heroScale = scrollY.interpolate({ inputRange: [0, 200], outputRange: [1, 0.95], extrapolate: 'clamp' });
  const gridTranslate = scrollY.interpolate({ inputRange: [0, 400], outputRange: [0, 70], extrapolate: 'clamp' });

  return (
  <Animated.ScrollView
    style={styles.container}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
  >
    <Animated.View style={[styles.gridLayer, { transform: [{ translateY: gridTranslate }] }]}>
      <TechnicalGrid width={SCREEN_WIDTH} height={HERO_HEIGHT + 80} step={26} opacity={0.55} />
    </Animated.View>
    <View style={styles.inner}>
      {/* HERO */}
      <Animated.View
        style={{ opacity: heroOpacity, transform: [{ translateY: heroTranslate }, { scale: heroScale }] }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
        >
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusPillText}>PROTOTYPE / RESEARCH PROJECT</Text>
          </View>
          <Text style={styles.wordmark}>BORDEREYE</Text>
          <Text style={styles.tagline}>AUTONOMOUS PERIMETER SYSTEM</Text>
          <Text style={styles.hero}>
            A mobile, multi-sensor platform for real-time perimeter monitoring,
            environmental sensing, and intrusion detection.
          </Text>
        </MotiView>
      </Animated.View>

      {/* SYSTEM SNAPSHOT */}
      <View style={styles.snapshotRow}>
        {SNAPSHOT.map((item, i) => (
          <MotiView
            key={item.label}
            style={styles.snapshotCell}
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 300, delay: 120 + i * 60 }}
          >
            <Text style={styles.snapshotValue}>{item.value}</Text>
            <Text style={styles.snapshotLabel}>{item.label}</Text>
          </MotiView>
        ))}
      </View>

      {/* THE PROBLEM */}
      <View style={styles.section}>
        <SectionHeader title="The Problem" icon="alert-circle" />
        <Text style={styles.problemText}>
          Perimeter monitoring gets difficult when an area is large, remote,
          or constantly changing. Static cameras give a fixed viewpoint.
          Human patrols are costly and inconsistent. Individual sensors only
          ever report an isolated signal.
        </Text>
        <Text style={styles.problemTextEmphasis}>
          BorderEye combines mobility, multi-sensor input, and monitoring
          into a single field platform instead.
        </Text>
      </View>

      {/* WHAT IS BORDEREYE */}
      <View style={styles.section}>
        <SectionHeader title="What Is BorderEye?" icon="shield" />
        <View style={styles.hardwareCard}>
          <Image source={hardwareImage} style={styles.hardwareImage} contentFit="cover" accessibilityLabel="BorderEye assembled hardware prototype: a 4WD chassis carrying an Arduino Uno, ultrasonic, metal, gas and DHT11 sensors, an LCD, and an HC-05 Bluetooth module" />
        </View>
        <Text style={styles.bodyText}>
          BorderEye is a mobile sensing platform built around an Arduino Uno,
          carrying four sensing modalities on a single 4-wheel-drive chassis.
          Instead of treating each sensor as an isolated device, one
          controller reads them all, applies threshold logic, and drives a
          local alarm, an onboard display, and the motors.
        </Text>
        <View style={styles.specList}>
          {[
            'Mobile 4WD chassis',
            'Four-sensor architecture',
            'On-board threshold alerting',
            'Live status via this app',
          ].map((item) => (
            <View key={item} style={styles.specRow}>
              <Feather name="check" size={13} color={colors.primary} />
              <Text style={styles.specText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* FOUR SENSING LAYERS */}
      <View style={styles.section}>
        <SectionHeader title="Four Sensing Layers" icon="layers" />
        <SensingLayers />
      </View>

      {/* SIGNAL -> RESPONSE */}
      <View style={styles.section}>
        <SectionHeader title="From Signal to Response" icon="git-commit" />
        <View style={styles.diagramCard}>
          <SignalFlowDiagram />
        </View>
      </View>

      {/* CTA */}
      <MotiView
        style={styles.ctaCard}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 350 }}
      >
        <Text style={styles.ctaTitle}>EXPLORE THE SYSTEM</Text>
        <Text style={styles.ctaSubtitle}>
          Connect to a BorderEye unit to see live sensor data, alerts, and
          analytics — or explore in demo mode with simulated data.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Connection')}
          accessibilityRole="button"
          accessibilityLabel="Connect to device"
        >
          <Text style={styles.ctaButtonText}>CONNECT TO DEVICE</Text>
          <Feather name="arrow-right" size={16} color={colors.textOnDark} />
        </TouchableOpacity>
      </MotiView>

      <Text style={styles.footerNote}>BorderEye — Prototype / Research Project</Text>
    </View>
  </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gridLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT + 80,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: spacing.huge,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: spacing.xl,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    marginBottom: spacing.lg,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warning,
    marginRight: 6,
  },
  statusPillText: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.textSecondary,
  },
  wordmark: {
    fontFamily: fontFamily.displayBold,
    fontSize: 42,
    letterSpacing: -1,
    color: colors.text,
    marginBottom: 2,
  },
  tagline: {
    ...typography.sectionTitle,
    fontSize: 13,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  hero: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  snapshotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xxl,
  },
  snapshotCell: {
    width: '50%',
    marginBottom: spacing.md,
  },
  snapshotValue: {
    fontFamily: fontFamily.displayBold,
    fontSize: 24,
    color: colors.text,
    letterSpacing: -0.5,
  },
  snapshotLabel: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: colors.textDim,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  problemText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  problemTextEmphasis: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  hardwareCard: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  hardwareImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceElevated,
  },
  bodyText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  specList: {
    gap: spacing.xs,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  specText: {
    ...typography.body,
    fontSize: 13,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  diagramCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    ...shadow.sm,
  },
  ctaCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceDark,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadow.lg,
  },
  ctaTitle: {
    ...typography.sectionTitle,
    fontSize: 13,
    color: colors.textOnDark,
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    ...typography.body,
    color: colors.textOnDarkSecondary,
    marginBottom: spacing.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    gap: spacing.sm,
  },
  ctaButtonText: {
    ...typography.label,
    color: colors.textOnDark,
    letterSpacing: 0.6,
  },
  footerNote: {
    ...typography.metadata,
    color: colors.textDim,
    textAlign: 'center',
  },
});

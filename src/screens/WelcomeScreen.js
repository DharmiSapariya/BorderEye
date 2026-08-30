import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { useRef } from 'react';
import { Animated, Dimensions, Linking, StyleSheet, Text, View } from 'react-native';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Logo } from '../components/Logo';
import { PressScale } from '../components/PressScale';
import { RoverSchematic } from '../components/RoverSchematic';
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

// From README "Applications" — presented as potential environments, not
// deployment claims (this is an unreleased prototype).
const APPLICATIONS = [
  { n: '01', title: 'Border / Perimeter Zones', detail: 'Unauthorized entry attempts' },
  { n: '02', title: 'Restricted Facilities', detail: 'Military or industrial site access' },
  { n: '03', title: 'Industrial Sites', detail: 'Intrusions and gas leaks' },
  { n: '04', title: 'Critical Infrastructure', detail: 'Power plants, dams, research facilities' },
  { n: '05', title: 'Perimeter Fencing', detail: 'Airport runways, restricted zones' },
  { n: '06', title: 'Field Robotics', detail: 'Mobile multi-sensor platforms generally' },
];

// From README "Testing and Results" — the four scenarios actually
// validated against real stimuli during development.
const TEST_MATRIX = [
  { test: 'Motion / proximity', trigger: 'Person walking in front of the ultrasonic sensor', status: 'VERIFIED' },
  { test: 'Concealed metal', trigger: 'Metal object placed near the metal sensor', status: 'VERIFIED' },
  { test: 'Gas leak', trigger: 'Test gas released near the gas sensor', status: 'VERIFIED' },
  { test: 'Climate anomaly', trigger: 'Simulated temperature spike', status: 'VERIFIED' },
];

// From README "Future Scope".
const ROADMAP = [
  'GSM/IoT connectivity for remote alerting beyond Bluetooth range',
  'A camera module for visual confirmation of detected threats',
  'Solar charging for unattended, long-duration deployment',
  'On-device or cloud-side data logging with pattern analysis',
  'GPS tagging of alerts for precise incident location',
];

export const WelcomeScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollOffsetRef = useRef(0);
  const scrollRef = useRef(null);
  const architectureRef = useRef(null);

  // measureLayout's relativeTo-node argument isn't supported on web
  // (react-native-web), so this uses plain .measure() page coordinates
  // (supported everywhere) plus a JS-tracked scroll offset instead.
  const scrollToArchitecture = () => {
    architectureRef.current?.measure((_x, _y, _w, _h, _pageXTarget, pageYTarget) => {
      scrollRef.current?.measure?.((__x, __y, __w, __h, _pageXScroll, pageYScroll) => {
        const targetY = scrollOffsetRef.current + (pageYTarget - pageYScroll) - spacing.xl;
        scrollRef.current?.scrollTo({ y: Math.max(targetY, 0), animated: true });
      });
    });
  };

  const heroOpacity = scrollY.interpolate({ inputRange: [0, 200], outputRange: [1, 0.1], extrapolate: 'clamp' });
  const heroTranslate = scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -36], extrapolate: 'clamp' });
  const heroScale = scrollY.interpolate({ inputRange: [0, 200], outputRange: [1, 0.95], extrapolate: 'clamp' });
  const gridTranslate = scrollY.interpolate({ inputRange: [0, 400], outputRange: [0, 70], extrapolate: 'clamp' });

  return (
  <Animated.ScrollView
    ref={scrollRef}
    style={styles.container}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true, listener: (e) => { scrollOffsetRef.current = e.nativeEvent.contentOffset.y; } }
    )}
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
          <View style={styles.wordmarkRow}>
            <Logo size={34} />
            <Text style={styles.wordmark}>BORDEREYE</Text>
          </View>
          <Text style={styles.tagline}>AUTONOMOUS PERIMETER SYSTEM</Text>
          <Text style={styles.hero}>
            A mobile, multi-sensor platform for real-time perimeter monitoring,
            environmental sensing, and intrusion detection.
          </Text>
          <View style={styles.heroCtaRow}>
            <PressScale
              style={styles.ctaButton}
              onPress={() => navigation.navigate('Connection')}
              accessibilityLabel="Connect to device"
            >
              <Text style={styles.ctaButtonText}>EXPLORE SYSTEM</Text>
              <Feather name="arrow-right" size={16} color={colors.textOnDark} />
            </PressScale>
            <PressScale
              style={styles.heroSecondaryButton}
              onPress={scrollToArchitecture}
              accessibilityLabel="View system architecture"
            >
              <Text style={styles.heroSecondaryButtonText}>VIEW ARCHITECTURE</Text>
            </PressScale>
          </View>
        </MotiView>

        <MotiView
          style={styles.illustrationWrap}
          from={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 150 }}
        >
          <RoverSchematic width={SCREEN_WIDTH - spacing.xl * 2 - 40} height={260} />
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
    </View>

    {/* THE SYSTEM DOESN'T JUST DETECT. IT RESPONDS. — full-bleed transition */}
    <MotiView
      style={styles.transitionSection}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <View style={styles.transitionInner}>
        <Text style={styles.transitionText}>
          THE SYSTEM{'\n'}DOESN&apos;T JUST{'\n'}
          <Text style={{ color: colors.textOnDarkSecondary }}>DETECT.</Text>
          {'\n'}IT{'\n'}RESPONDS.
        </Text>
        <View style={styles.transitionFlow}>
          {['DETECT', 'CLASSIFY', 'DECIDE', 'RESPOND'].map((step, i, arr) => (
            <View key={step} style={styles.transitionFlowItem}>
              <Text style={styles.transitionFlowText}>{step}</Text>
              {i < arr.length - 1 && <Feather name="arrow-right" size={12} color={colors.textOnDarkSecondary} />}
            </View>
          ))}
        </View>
      </View>
    </MotiView>

    <View style={styles.inner}>
      {/* SYSTEM ARCHITECTURE */}
      <View ref={architectureRef} style={styles.section}>
        <SectionHeader title="System Architecture" icon="cpu" />
        <View style={styles.diagramCard}>
          <ArchitectureDiagram />
        </View>
      </View>

      {/* BUILT. TESTED. ITERATED. */}
      <View style={styles.section}>
        <SectionHeader title="Built. Tested. Iterated." icon="check-square" />
        <Text style={styles.bodyText}>
          The prototype was validated against real stimuli for each sensing
          modality before this app was built around it.
        </Text>
        <View style={styles.testCard}>
          {TEST_MATRIX.map((t, i) => (
            <View key={t.test}>
              {i > 0 && <View style={styles.testDivider} />}
              <View style={styles.testRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.testName}>{t.test}</Text>
                  <Text style={styles.testTrigger}>{t.trigger}</Text>
                </View>
                <View style={styles.testStatusBadge}>
                  <View style={styles.testStatusDot} />
                  <Text style={styles.testStatusText}>{t.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* POTENTIAL APPLICATIONS */}
      <View style={styles.section}>
        <SectionHeader title="Potential Applications" icon="map-pin" />
        <Text style={styles.bodyText}>
          Target environments for this class of platform — not claims of
          current deployment.
        </Text>
        <View style={styles.appGrid}>
          {APPLICATIONS.map((app, i) => (
            <MotiView
              key={app.n}
              style={styles.appCard}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 300, delay: i * 50 }}
            >
              <Text style={styles.appIndex}>{app.n}</Text>
              <Text style={styles.appTitle}>{app.title}</Text>
              <Text style={styles.appDetail}>{app.detail}</Text>
            </MotiView>
          ))}
        </View>
      </View>

      {/* WHERE IT GOES NEXT */}
      <View style={styles.section}>
        <SectionHeader title="Where It Goes Next" icon="trending-up" />
        <View style={styles.roadmapCard}>
          {ROADMAP.map((item, i) => (
            <View key={item} style={[styles.roadmapRow, i === 0 && { borderTopWidth: 0 }]}>
              <View style={styles.roadmapDot} />
              <Text style={styles.roadmapText}>{item}</Text>
              <Text style={styles.roadmapTag}>PLANNED</Text>
            </View>
          ))}
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
        <PressScale
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Connection')}
          accessibilityLabel="Connect to device"
        >
          <Text style={styles.ctaButtonText}>CONNECT TO DEVICE</Text>
          <Feather name="arrow-right" size={16} color={colors.textOnDark} />
        </PressScale>
        <View style={styles.ctaLinkRow}>
          <PressScale onPress={scrollToArchitecture} accessibilityLabel="View system architecture">
            <Text style={styles.ctaLinkText}>VIEW ARCHITECTURE</Text>
          </PressScale>
          <PressScale onPress={() => Linking.openURL('https://github.com/DharmiSapariya/BorderEye')} accessibilityLabel="Open GitHub repository">
            <Text style={styles.ctaLinkText}>GITHUB</Text>
          </PressScale>
        </View>
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
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.textSecondary,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
  },
  wordmark: {
    fontFamily: fontFamily.displayBold,
    fontSize: 42,
    letterSpacing: -1,
    color: colors.text,
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
    marginBottom: spacing.lg,
  },
  heroCtaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  heroSecondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  heroSecondaryButtonText: {
    ...typography.label,
    color: colors.text,
    letterSpacing: 0.6,
  },
  illustrationWrap: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  ctaButtonText: {
    ...typography.label,
    color: colors.textOnDark,
    letterSpacing: 0.6,
  },
  ctaLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginTop: spacing.lg,
  },
  ctaLinkText: {
    ...typography.label,
    fontSize: 12,
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.6,
  },
  footerNote: {
    ...typography.metadata,
    color: colors.textDim,
    textAlign: 'center',
  },

  // THE SYSTEM DOESN'T JUST DETECT. IT RESPONDS. — full-bleed transition
  transitionSection: {
    backgroundColor: colors.surfaceDark,
    paddingVertical: spacing.huge,
    marginBottom: spacing.xxl,
  },
  transitionInner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
  },
  transitionText: {
    fontFamily: fontFamily.displayBold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1,
    color: colors.textOnDark,
    marginBottom: spacing.xxl,
  },
  transitionFlow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  transitionFlowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  transitionFlowText: {
    ...typography.label,
    fontSize: 12,
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.4,
  },

  // BUILT. TESTED. ITERATED.
  testCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    ...shadow.sm,
  },
  testDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  testName: {
    ...typography.cardTitle,
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  testTrigger: {
    ...typography.metadata,
    color: colors.textSecondary,
  },
  testStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successTint,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  testStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 5,
  },
  testStatusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.success,
  },

  // POTENTIAL APPLICATIONS
  appGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginTop: spacing.md,
  },
  appCard: {
    width: '50%',
    padding: spacing.xs,
  },
  appIndex: {
    ...typography.metadata,
    fontWeight: '700',
    color: colors.textDim,
    marginBottom: spacing.xs,
  },
  appTitle: {
    ...typography.cardTitle,
    fontSize: 13,
    color: colors.text,
    marginBottom: 2,
  },
  appDetail: {
    ...typography.metadata,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // WHERE IT GOES NEXT
  roadmapCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    ...shadow.sm,
  },
  roadmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  roadmapDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  roadmapText: {
    ...typography.body,
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  roadmapTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.textDim,
  },
});

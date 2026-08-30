import { FlowDiagram } from './FlowDiagram';

// Mirrors the real firmware decision path (see DataParser.determineRobotState
// and AlertService.checkForAlerts): every reading is compared against the
// fixed thresholds in utils/constants.js, which is what actually decides
// hazard / obstacle / exploring state and drives the alarm + motors.
const STAGES = [
  { icon: 'cpu', title: 'SENSOR', detail: 'Ultrasonic, metal, gas, DHT11 readings' },
  { icon: 'radio', title: 'SIGNAL', detail: 'Raw serial data from the Arduino Uno' },
  { icon: 'terminal', title: 'PROCESSING', detail: 'Parsed into structured readings' },
  { icon: 'sliders', title: 'THRESHOLD', detail: 'Compared against configured limits' },
  { icon: 'git-branch', title: 'DECISION', detail: 'Hazard, obstacle, or clear to explore' },
  { icon: 'zap', title: 'RESPONSE', detail: 'Buzzer, LED, LCD, motor control' },
  { icon: 'eye', title: 'MONITORING', detail: 'Live status in this app' },
];

export const SignalFlowDiagram = () => <FlowDiagram stages={STAGES} highlightIndex={3} />;

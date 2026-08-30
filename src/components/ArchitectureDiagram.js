import { FlowDiagram } from './FlowDiagram';

// Matches README.md "System Architecture" exactly — same components, same
// order the mermaid diagram there describes.
const STAGES = [
  { icon: 'cpu', title: 'SENSORS', detail: 'HC-SR04, metal sensor, MQ-series gas, DHT11' },
  { icon: 'hexagon', title: 'ARDUINO UNO R3', detail: 'Reads every sensor, runs threshold logic' },
  { icon: 'monitor', title: '16×2 LCD', detail: 'Live readings shown on-site' },
  { icon: 'bell', title: 'BUZZER + LEDS', detail: 'Local audible/visual alarm on threat' },
  { icon: 'disc', title: 'L298N + MOTORS', detail: '4WD chassis drive control' },
  { icon: 'bluetooth', title: 'HC-05 BLUETOOTH', detail: 'Wireless link to a bridge server' },
  { icon: 'smartphone', title: 'THIS APP', detail: 'Remote monitoring interface' },
];

export const ArchitectureDiagram = () => <FlowDiagram stages={STAGES} highlightIndex={1} />;

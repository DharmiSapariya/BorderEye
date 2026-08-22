// ⚠️ CHANGE THIS: Your Bluetooth device name
export const BLUETOOTH_DEVICE_NAME = "HC-05"; // <-- UPDATE THIS LATER

// Sensor thresholds
export const THRESHOLDS = {
  GAS_DANGER: 450,
  DISTANCE_WARNING: 15,
  DISTANCE_CRITICAL: 10,
  TEMP_HIGH: 35,
  TEMP_LOW: 10,
};

// Alert types
export const ALERT_TYPES = {
  GAS: 'gas',
  METAL: 'metal',
  OBSTACLE: 'obstacle',
  TEMPERATURE: 'temperature',
};

// Robot states
export const ROBOT_STATES = {
  EXPLORING: 'exploring',
  OBSTACLE_DETECTED: 'obstacle',
  HAZARD_ALERT: 'hazard',
  TURNING: 'turning',
  DISCONNECTED: 'disconnected',
};

// Data refresh rate
export const REFRESH_RATE = 500; // milliseconds
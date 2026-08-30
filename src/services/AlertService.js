import * as Haptics from 'expo-haptics';
import { ALERT_TYPES, THRESHOLDS } from '../utils/constants';

class AlertService {
  constructor() {
    this.alerts = [];
    this.lastAlertTime = {};
    this.alertCooldown = 3000; // 3 seconds between same alert type
  }

  /**
   * Check sensor data and generate alerts
   */
  checkForAlerts(data) {
    const newAlerts = [];

    // Gas alert
    if (data.gas > THRESHOLDS.GAS_DANGER) {
      newAlerts.push(this.createAlert(ALERT_TYPES.GAS, data.gas, `Gas level at ${data.gas} (danger above ${THRESHOLDS.GAS_DANGER})`));
    }

    // Metal alert (inverted logic: 0 = detected)
    if (data.metal === 0) {
      newAlerts.push(this.createAlert(ALERT_TYPES.METAL, 1, 'Metal object detected'));
    }

    // Obstacle alert
    if (data.distance <= THRESHOLDS.DISTANCE_WARNING) {
      newAlerts.push(this.createAlert(ALERT_TYPES.OBSTACLE, data.distance, `Obstacle at ${data.distance}cm`));
    }

    // Temperature alerts
    if (data.temperature > THRESHOLDS.TEMP_HIGH) {
      newAlerts.push(this.createAlert(ALERT_TYPES.TEMPERATURE, data.temperature, `High temperature: ${data.temperature.toFixed(1)}°C`));
    }

    // Process new alerts
    newAlerts.forEach(alert => {
      if (this.shouldTriggerAlert(alert.type)) {
        this.triggerAlert(alert);
      }
    });

    return newAlerts;
  }

  createAlert(type, value, message) {
    return {
      id: Date.now() + Math.random(),
      type,
      value,
      message,
      timestamp: new Date(),
      severity: this.getAlertSeverity(type),
    };
  }

  getAlertSeverity(type) {
    switch (type) {
      case ALERT_TYPES.GAS:
      case ALERT_TYPES.METAL:
        return 'critical';
      case ALERT_TYPES.OBSTACLE:
        return 'warning';
      case ALERT_TYPES.TEMPERATURE:
        return 'info';
      default:
        return 'info';
    }
  }

  shouldTriggerAlert(type) {
    const now = Date.now();
    const lastTime = this.lastAlertTime[type] || 0;
    
    if (now - lastTime > this.alertCooldown) {
      this.lastAlertTime[type] = now;
      return true;
    }
    
    return false;
  }

  triggerAlert(alert) {
    // Add to history
    this.alerts.unshift(alert);
    
    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(0, 100);
    }

    // Trigger haptic feedback
    this.triggerHapticFeedback(alert.severity);

    console.log(`🚨 ALERT: ${alert.message}`);
  }

  triggerHapticFeedback(severity) {
    try {
      switch (severity) {
        case 'critical':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'warning':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        default:
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }

  getAlerts() {
    return this.alerts;
  }

  getAlertsByType(type) {
    return this.alerts.filter(alert => alert.type === type);
  }

  clearAlerts() {
    this.alerts = [];
  }

  getAlertIcon(type) {
    switch (type) {
      case ALERT_TYPES.GAS:
        return '💨';
      case ALERT_TYPES.METAL:
        return '🔩';
      case ALERT_TYPES.OBSTACLE:
        return '⚠️';
      case ALERT_TYPES.TEMPERATURE:
        return '🌡️';
      default:
        return '🔔';
    }
  }

  getAlertColor(type) {
    // Muted, engineered status palette — matches src/utils/theme.js
    // sensor-identity accents rather than neon dashboard colors.
    switch (type) {
      case ALERT_TYPES.GAS:
        return '#7C6A9C';
      case ALERT_TYPES.METAL:
        return '#B33A3A';
      case ALERT_TYPES.OBSTACLE:
        return '#B98A3D';
      case ALERT_TYPES.TEMPERATURE:
        return '#B9713D';
      default:
        return '#566167';
    }
  }
}

export default new AlertService();
import { ROBOT_STATES, THRESHOLDS } from '../utils/constants';

/**
 * Parses raw serial data from Arduino
 * Expected format: "Temp: 28.5C  Hum: 65%  Gas: 320  Distance: 45  Metal: 0"
 */
export class DataParser {
  static parseSerialData(rawData) {
    try {
      // Extract values using regex
      const tempMatch = rawData.match(/Temp:\s*([0-9.]+)/);
      const humMatch = rawData.match(/Hum:\s*([0-9.]+)/);
      const gasMatch = rawData.match(/Gas:\s*([0-9]+)/);
      const distMatch = rawData.match(/Distance:\s*([0-9]+)/);
      const metalMatch = rawData.match(/Metal:\s*([0-1])/);

      const data = {
        temperature: tempMatch ? parseFloat(tempMatch[1]) : null,
        humidity: humMatch ? parseFloat(humMatch[1]) : null,
        gas: gasMatch ? parseInt(gasMatch[1]) : null,
        distance: distMatch ? parseInt(distMatch[1]) : null,
        metal: metalMatch ? parseInt(metalMatch[1]) : null,
        timestamp: new Date().toISOString(),
      };

      // Determine robot state based on sensor values
      data.robotState = this.determineRobotState(data);
      
      return data;
    } catch (error) {
      console.error('Parse error:', error);
      return null;
    }
  }

  static determineRobotState(data) {
    // Priority 1: Hazard (matches Arduino logic)
    if (data.metal === 0 || data.gas > THRESHOLDS.GAS_DANGER) {
      return ROBOT_STATES.HAZARD_ALERT;
    }
    
    // Priority 2: Obstacle
    if (data.distance <= THRESHOLDS.DISTANCE_WARNING) {
      return ROBOT_STATES.OBSTACLE_DETECTED;
    }
    
    // Default: Exploring
    return ROBOT_STATES.EXPLORING;
  }

  static getRobotStatusText(state, data) {
    switch (state) {
      case ROBOT_STATES.HAZARD_ALERT:
        if (data.metal === 0) {
          return '🚨 HAZARD! Metal Detected - Stopped';
        }
        return '🚨 HAZARD! Gas Detected - Stopped';
      
      case ROBOT_STATES.OBSTACLE_DETECTED:
        return `⚠️ Obstacle at ${data.distance}cm - Turning`;
      
      case ROBOT_STATES.EXPLORING:
        return '🤖 Exploring - Moving Forward';
      
      default:
        return '❌ Disconnected';
    }
  }

  static getStatusColor(state) {
    switch (state) {
      case ROBOT_STATES.HAZARD_ALERT:
        return '#FF3838';
      case ROBOT_STATES.OBSTACLE_DETECTED:
        return '#FFD700';
      case ROBOT_STATES.EXPLORING:
        return '#39FF14';
      default:
        return '#707080';
    }
  }
}
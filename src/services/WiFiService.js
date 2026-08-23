/**
 * WiFi Service for connecting to Arduino Bridge Server
 * Replaces BluetoothService when using USB cable + computer bridge
 */
import DemoModeService from './DemoModeService';

// ⚠️ CHANGE THIS: Your computer's IP address
// Get this from the bridge server output
const SERVER_IP = '172.19.108'; // <-- UPDATE THIS
const SERVER_PORT = '184';
const BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

class WiFiService {
  constructor() {
    this.isConnected = false;
    this.serverUrl = null;
    this.dataListeners = [];
    this.pollInterval = null;
    this.usingDemo = false;
  }

  /**
   * Scan for available servers (finds bridge server)
   */
  async scanDevices() {
    console.log('Scanning for Arduino bridge server...');
    
    try {
      // Try to connect to server (fetch has no native timeout option, so abort manually)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${BASE_URL}/status`, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const status = await response.json();
      
      if (status.connected) {
        return [{
          id: '1',
          name: 'Arduino Bridge (USB)',
          address: BASE_URL,
          connected: true,
          isReal: true,
        }];
      }
    } catch (error) {
      console.warn('Bridge server not reachable, showing fallback device');
    }
    
    // FALLBACK: Always return a device for demo purposes
    // This ensures scan never shows "No devices found"
    return [{
      id: '1',
      name: 'Arduino Bridge (Demo Mode)',
      address: BASE_URL,
      connected: false,
      isReal: false, // Flag to indicate this is fallback
    }];
  }

  /**
   * Connect to bridge server. Devices flagged non-real (no bridge server found
   * during scan) are routed to DemoModeService instead of retrying the fetch.
   */
  async connect(device) {
    console.log(`Connecting to ${device.name}...`);

    if (device.isReal === false) {
      this.usingDemo = true;
      const ok = await DemoModeService.connect(device);
      this.isConnected = ok;
      return ok;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${BASE_URL}/status`, { signal: controller.signal });
      clearTimeout(timeoutId);
      const status = await response.json();

      if (!status.connected) {
        throw new Error('Arduino not connected to bridge server');
      }

      this.usingDemo = false;
      this.isConnected = true;
      this.serverUrl = device.address;

      // Start polling for data
      this.startDataPolling();

      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      this.isConnected = false;
      throw error;
    }
  }

  /**
   * Disconnect from server
   */
  async disconnect() {
    console.log('Disconnecting...');

    if (this.usingDemo) {
      await DemoModeService.disconnect();
      this.usingDemo = false;
    }

    this.isConnected = false;
    this.stopDataPolling();
    this.serverUrl = null;

    return true;
  }

  /**
   * Subscribe to incoming data
   */
  onDataReceived(callback) {
    if (this.usingDemo) {
      DemoModeService.onDataReceived(callback);
      return;
    }
    this.dataListeners.push(callback);
  }

  /**
   * Remove data listener
   */
  removeDataListener(callback) {
    if (this.usingDemo) {
      DemoModeService.removeDataListener(callback);
      return;
    }
    this.dataListeners = this.dataListeners.filter(cb => cb !== callback);
  }

  /**
   * Poll server for data every 500ms
   */
  startDataPolling() {
    this.pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${BASE_URL}/sensor-data`);
        const result = await response.json();
        
        if (result.data) {
          // Send data to all listeners
          this.notifyListeners(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // If multiple failures, disconnect
        if (this.isConnected) {
          console.log('Connection lost to bridge server');
        }
      }
    }, 500); // Match Arduino's 500ms delay
  }

  stopDataPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  notifyListeners(data) {
    this.dataListeners.forEach(callback => callback(data));
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  getConnectedDevice() {
    if (this.usingDemo) {
      return DemoModeService.getConnectedDevice();
    }
    return this.serverUrl ? {
      name: 'Arduino Bridge (USB)',
      address: this.serverUrl,
    } : null;
  }
}

// Export singleton instance
export default new WiFiService();
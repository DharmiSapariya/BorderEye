/**
 * Demo Mode Service - Fallback when WiFi bridge isn't available
 * Generates realistic sensor data for demonstrations
 */

class DemoModeService {
  constructor() {
    this.isConnected = false;
    this.dataListeners = [];
    this.simulationInterval = null;
  }

  async scanDevices() {
    console.log('📡 Demo Mode: Scanning for devices...');
    
    // Simulate scan delay
    await this.delay(1000);
    
    // Always return demo device
    return [{
      id: 'demo-1',
      name: 'BorderEye Robot (Demo)',
      address: 'demo://localhost',
      isDemoMode: true,
    }];
  }

  async connect(device) {
    console.log('🎭 Demo Mode: Connecting...');
    
    await this.delay(1000);
    
    this.isConnected = true;
    this.startSimulation();
    
    return true;
  }

  async disconnect() {
    console.log('🎭 Demo Mode: Disconnecting...');
    
    this.isConnected = false;
    this.stopSimulation();
    
    return true;
  }

  onDataReceived(callback) {
    this.dataListeners.push(callback);
  }

  removeDataListener(callback) {
    this.dataListeners = this.dataListeners.filter(cb => cb !== callback);
  }

  startSimulation() {
    let gasLevel = 300;
    let distance = 50;
    let temp = 28;
    let metalDetected = 1;
    let counter = 0;

    console.log('🎬 Demo Mode: Starting data simulation');

    this.simulationInterval = setInterval(() => {
      counter++;
      
      // Realistic temperature variation
      temp = 28 + Math.random() * 4 - 2;
      const humidity = 60 + Math.random() * 10;
      
      // Gas level slowly changes
      gasLevel += Math.random() * 20 - 10;
      gasLevel = Math.max(250, Math.min(500, gasLevel));
      
      // Distance varies (simulates movement)
      distance += Math.random() * 10 - 5;
      distance = Math.max(5, Math.min(100, distance));
      
      // Occasionally detect metal
      if (counter % 30 === 0) {
        metalDetected = 0; // Detected
      } else {
        metalDetected = 1; // Clear
      }
      
      // Create Arduino-format data string
      const dataString = `Temp: ${temp.toFixed(1)}C  Hum: ${humidity.toFixed(0)}%  Gas: ${Math.round(gasLevel)}  Distance: ${Math.round(distance)}  Metal: ${metalDetected}`;
      
      // Notify all listeners
      this.notifyListeners(dataString);
      
    }, 500); // Match Arduino's timing
  }

  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  notifyListeners(data) {
    this.dataListeners.forEach(callback => callback(data));
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  getConnectedDevice() {
    return this.isConnected ? {
      name: 'BorderEye Robot (Demo)',
      address: 'demo://localhost',
    } : null;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new DemoModeService();
import { createContext, useContext, useEffect, useState } from 'react';
import AlertService from '../services/AlertService';
import { DataParser } from '../services/DataParser';
import WiFiService from '../services/WiFiService';

const RobotContext = createContext();

export const useRobot = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobot must be used within RobotProvider');
  }
  return context;
};

export const RobotProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [dataHistory, setDataHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [robotState, setRobotState] = useState('disconnected');
  const [uptime, setUptime] = useState(0);
  const [stats, setStats] = useState({
    obstaclesAvoided: 0,
    alertsTriggered: 0,
    totalReadings: 0,
  });

  // Connection management
  const connect = async (device) => {
    try {
      await WiFiService.connect(device); // Changed from BluetoothService
      setIsConnected(true);
      setConnectedDevice(device);
      startUptime();
      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  };

  const disconnect = async () => {
    try {
      await WiFiService.disconnect(); // Changed from BluetoothService
      setIsConnected(false);
      setConnectedDevice(null);
      setSensorData(null);
      setRobotState('disconnected');
      stopUptime();
      return true;
    } catch (error) {
      console.error('Disconnect failed:', error);
      return false;
    }
  };

  // Listen for data when connected
  useEffect(() => {
    if (isConnected) {
      const handleData = (rawData) => {
        const parsedData = DataParser.parseSerialData(rawData);
        
        if (parsedData) {
          // Update current sensor data
          setSensorData(parsedData);
          setRobotState(parsedData.robotState);
          
          // Add to history (keep last 100 readings)
          setDataHistory(prev => {
            const newHistory = [parsedData, ...prev];
            return newHistory.slice(0, 100);
          });
          
          // Check for alerts
          const newAlerts = AlertService.checkForAlerts(parsedData);
          if (newAlerts.length > 0) {
            setAlerts(AlertService.getAlerts());
            
            // Update stats
            setStats(prev => ({
              ...prev,
              alertsTriggered: prev.alertsTriggered + newAlerts.length,
            }));
          }
          
          // Update obstacle count
          if (parsedData.robotState === 'obstacle') {
            setStats(prev => ({
              ...prev,
              obstaclesAvoided: prev.obstaclesAvoided + 1,
            }));
          }
          
          // Update total readings
          setStats(prev => ({
            ...prev,
            totalReadings: prev.totalReadings + 1,
          }));
        }
      };

      WiFiService.onDataReceived(handleData); // Changed from BluetoothService

      return () => {
        WiFiService.removeDataListener(handleData); // Changed from BluetoothService
      };
    }
  }, [isConnected]);

  // Uptime counter
  const startUptime = () => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const stopUptime = () => {
    setUptime(0);
  };

  const formatUptime = () => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const value = {
    // Connection
    isConnected,
    connectedDevice,
    connect,
    disconnect,
    
    // Data
    sensorData,
    dataHistory,
    robotState,
    
    // Alerts
    alerts,
    
    // Stats
    stats,
    uptime: formatUptime(),
  };

  return (
    <RobotContext.Provider value={value}>
      {children}
    </RobotContext.Provider>
  );
};
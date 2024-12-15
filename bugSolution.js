// bug.js
import * as Constants from 'expo-constants';

console.log(Constants.deviceId); // May return null

// bugSolution.js
import * as Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getDeviceId = async () => {
  let deviceId = Constants.deviceId;
  if (deviceId === null) {
    try {
      deviceId = await AsyncStorage.getItem('deviceId');
    } catch (error) {
      console.error('Error retrieving deviceId from AsyncStorage:', error);
    }
  }
  if (deviceId === null) {
    // Generate a UUID as fallback if AsyncStorage is empty
    deviceId = generateUUID();
    try {
      await AsyncStorage.setItem('deviceId', deviceId);
    } catch (error) {
      console.error('Error saving deviceId to AsyncStorage:', error);
    }
  }
  return deviceId;
};

const generateUUID = () => {
  // Generates a random UUID (replace with a robust UUID library if needed)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

getDeviceId().then(id => console.log('DeviceId:', id));
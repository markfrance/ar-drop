import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const addNewTime = async (LeaderboardData) => {
      const now = new Date().getTime();

  try {
    await AsyncStorage.setItem(now, JSON.stringify(LeaderboardData));
  } catch(e) {
    Alert.alert('Error saving new leaderboard data:' + e);
  }

  Alert.alert('Saved time.');
}

export const getAllLeaderboardData = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch(e) {
    Alert.alert('Error getting leaderboard data keys' + e);
  }

  let records
  try {
    records = await AsyncStorage.multiGet(keys)
  } catch(e) {
    Alert.alert('Error getting leaderboard records' + e);
  }

  let values = records.map(function(x) {return x[1];});

  values.sort((a, b) => (a.time < b.time) ? 1 : -1);

  return values.join(", ");
}

export const getLatestScore = async () => {

  let keys;
  key = await AsyncStorage.getAllKeys();

  keys.sort((a,b) => a > b ? 1 : -1);

  item = await AsyncStorage.getItem(keys[0]);

  return item;
}


export const clearLeaderboard = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    Alert.alert('Error cleaning leaderboard' + e)
  }

  Alert.alert('Cleared Leaderboard.')
}

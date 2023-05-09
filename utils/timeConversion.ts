import { Platform } from 'react-native';

export const convertLocalTimeToUTCTime = (timestamp: string) : string => {
    let date = new Date(timestamp);
    if (Platform.OS === 'ios') {
      return date.toISOString();
    }
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    ).toISOString();
};

export const convertUTCToLocalTime = (uctTimestamp: string)  => {
  let date = new Date(uctTimestamp);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);
  localTime.getDate() // local date
  localTime.getHours() // local hour

  
 };
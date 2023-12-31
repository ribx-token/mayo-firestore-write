import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageDetails } from './utils/getStorageDetails';
import { Logger } from 'mayo-logger';

export const flushFromAsyncStorage = async () => {
  try {
    const details = await getStorageDetails();
    Logger.info('Attempting to remove storageKey from AsyncStorage', { key: details.asyncStorageKey }, { tag: 'mayo-firestore-write' });

    await AsyncStorage.removeItem(details.asyncStorageKey);
    Logger.info('Data successfully removed from AsyncStorage', { key: details.asyncStorageKey }, { tag: 'mayo-firestore-write' });
  } catch (error: any) {
    Logger.error('Error occurred while removing data from AsyncStorage', error, { tag: 'mayo-firestore-write' });
  }
}

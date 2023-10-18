import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'rn-logging'; 
import {customInitializeFirebase} from './customInitializeFirebase';
import {writeToFirebase} from './writeToFirebase';

export const signInFirebase = async (firebaseConfig:any, googleCredential:any) => {
  try {
    Logger.info('Attempting Firebase sign-in', { firebaseConfig }, { tag: 'rn-write-firestore'});

    customInitializeFirebase(firebaseConfig);

    // Sign in to Firebase
    const firebaseUserCredential = await auth().signInWithCredential(googleCredential);

    // Save user to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(firebaseUserCredential.user));
    Logger.info('Set last connection data in AsyncStorage', { user: firebaseUserCredential.user }, { tag: 'rn-write-firestore'});

    const res = await writeToFirebase({
      lastConnectionDate: new Date(),
      email: firebaseUserCredential.user?.email
    
    }, true);
    Logger.info('Write to Firebase', { result: res }, { tag: 'rn-write-firestore'});

    return firebaseUserCredential.user;
  } catch (error:any) {
    Logger.error('Error occurred during Firebase sign-in', error, { tag: 'rn-write-firestore', timestamp: true });
    throw error;    
  }
}

import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase/compat/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
// Currently Firebase UI doesn't support Firebase SDK 9, so creating our
// Firebase app using the compat style so we can use this library.
// See: https://github.com/firebase/firebaseui-web/issues/837
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Turn on emulator suite in development mode.
const useEmulators = process.env.NODE_ENV === 'development';
if (useEmulators) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

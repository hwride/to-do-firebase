import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';

export type UserState = 'loading' | 'not-signed-in' | 'signed-in';

/**
 * Note this component should only be used once, and it should be called in the root of the application.
 */
export function useUserState() {
  const [userState, setUserState] = React.useState<UserState>('loading');

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUserState(user != null ? 'signed-in' : 'not-signed-in');
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return userState;
}

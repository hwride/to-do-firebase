import firebase from 'firebase/compat/app';
import React, { useEffect } from 'react';

export type UserState = 'loading' | 'not-signed-in' | 'signed-in';

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
  }, [setUserState]);

  return userState;
}

// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export type UserState = 'loading' | 'not-signed-in' | 'signed-in';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function SignInScreen({
  userState,
  setUserState,
}: {
  userState: UserState;
  setUserState: (user: UserState) => void;
}) {
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUserState(user != null ? 'signed-in' : 'not-signed-in');
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [setUserState]);

  if (userState === 'loading') {
    return null;
  } else if (userState == 'not-signed-in') {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  } else {
    return (
      <div style={{ border: '1px solid black' }}>
        <p>
          Welcome {firebase.auth().currentUser?.displayName}. You are now
          signed-in.
        </p>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

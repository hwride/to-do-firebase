// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export type UserState = 'loading' | null | firebase.User;

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function SignInScreen({
  setUser,
}: {
  setUser: (user: UserState) => void;
}) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        setUser(user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [setUser]);

  if (!isSignedIn) {
    return (
      <div style={{ border: '1px solid black' }}>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
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

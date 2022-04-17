// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export type UserState = 'loading' | 'not-signed-in' | 'signed-in';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function SignInScreen({ userState }: { userState: UserState }) {
  if (userState === 'loading') {
    return null;
  } else if (userState === 'not-signed-in') {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  } else {
    return <button onClick={() => firebase.auth().signOut()}>Sign-out</button>;
  }
}

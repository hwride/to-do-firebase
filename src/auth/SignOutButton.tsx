// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';

export default function SignOutButton() {
  return <button onClick={() => firebase.auth().signOut()}>Sign-out</button>;
}

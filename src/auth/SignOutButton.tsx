// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import styles from './SignOutButton.module.css';

export default function SignOutButton() {
  return (
    <button
      className={styles.signOutButton}
      onClick={() => firebase.auth().signOut()}
    >
      Sign-out
    </button>
  );
}

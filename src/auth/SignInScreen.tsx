// Currently Firebase UI doesn't support Firebase SDK 9, so you must use the
// compat import.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export const firebaseAuthButtonStyleOverrides = `
.firebaseui-idp-button {
  background-color: var(--input-surface) !important;
  box-shadow: none !important; /* Disable on hover also */
}
.firebaseui-idp-google>.firebaseui-idp-text {
  color: var(--text-2);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: var(--font-weight-4);
}

@media (prefers-reduced-motion: no-preference) {
  .firebaseui-idp-button:focus-visible {
    transition: outline-offset 145ms var(--ease-2);
  }
  .firebaseui-idp-button:where(:not(:active)):focus-visible {
    transition-duration: .25s;
  }
}

.firebaseui-idp-button:focus-visible {
    outline-color: var(--link);
    outline-width: 1px;
    outline-style: auto;
}
.firebaseui-idp-button:where(:not(:active)):focus-visible {
  outline-offset: 5px;
}
`;

export default function SignInScreen() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

# To do project

## Technologies

- Firebase (SDK 8, to be compatible with FirebaseUI)
  - Firebase Auth
    - FirebaseUI
- Create React App
- TypeScript

## Development setup

### One time setup
1. Install npm dependencies: `npm install`
2. Setup Firebase
   1. Ensure Firebase CLI is installed `npm install -g firebase-tools`
   2. Login to Firebase: `firebase login`

### On-going
1. Create a Webpack build: `npm run build`
2. Run Firebase server: `firebase serve --only hosting`
   1. The Firebase server will serve the build folder created by Webpack.

### Run emulators
1. Run Firebase emulator: `firebase emulators:start`

## Deploying
1. Run `npm run bulid`.
1. Run `firebase deploy`.

Deploy URL: https://to-do-20da5.web.app

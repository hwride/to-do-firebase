# To do project
Simple to do project to 

## Deployment info
- Deploy URL: https://to-do-20da5.web.app/
- Firebase console: https://console.firebase.google.com/

## Technologies

- Firebase (SDK 8, to be compatible with FirebaseUI)
  - Firebase Auth
    - FirebaseUI
- Create React App
- TypeScript
- [react-intl](https://github.com/formatjs/formatjs)

## Development setup

### One time setup
1. Install npm dependencies: `npm install`
2. Setup Firebase
   1. Ensure Firebase CLI is installed `npm install -g firebase-tools`
   2. Login to Firebase: `firebase login`

### Run in dev mode
1. Run webpack: `npm run start`
2. Run Firebase emulator: `firebase emulators:start`

### Run with prod build
1. Create a Webpack build: `npm run build`
2. Run Firebase server: `firebase serve --only hosting`
   1. The Firebase server will serve the build folder created by Webpack.

## Deploying
1. Run `npm run build`.
1. Run `firebase deploy`.

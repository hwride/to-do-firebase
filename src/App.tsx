import React from 'react';
import './App.css';
import './firebase/firebase';

import SignInScreen from './auth/signInScreen';

function App() {
  return (
    <div className="App">
      To do
      <SignInScreen />
    </div>
  );
}

export default App;

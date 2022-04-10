import React from 'react';
import './App.css';
import './firebase/firebase';
import SignInScreen from './auth/signInScreen';
import ToDoList from './to-do-list';

function App() {
  return (
    <div className="App">
      To do
      <ToDoList />
      <SignInScreen />
    </div>
  );
}

export default App;

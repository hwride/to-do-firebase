import React from 'react';
import './App.css';
import { firebaseAuthButtonStyleOverrides } from './auth/SignInScreen';
import { useUserState } from './auth/useUserState';
import ToDoList from './components/ToDoList/ToDoList';
import './firebase/firebase';

function App() {
  const userState = useUserState();

  return (
    <div className="App">
      <style>{firebaseAuthButtonStyleOverrides}</style>
      <ToDoList userState={userState} />
    </div>
  );
}

export default App;

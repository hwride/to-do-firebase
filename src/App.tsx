import React from 'react';
import './App.css';
import { useUserState } from './auth/useUserState';
import ToDoList from './components/ToDoList';
import './firebase/firebase';

function App() {
  const userState = useUserState();

  return (
    <div className="App">
      <ToDoList userState={userState} />
    </div>
  );
}

export default App;

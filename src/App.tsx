import React from 'react';
import './App.css';
import './firebase/firebase';
import SignInScreen from './auth/signInScreen';
import ToDoList from './to-do-list';
import firebase from 'firebase/compat';

function App() {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  return (
    <div className="App">
      To do
      <ToDoList user={user} />
      <SignInScreen setUser={setUser} />
    </div>
  );
}

export default App;

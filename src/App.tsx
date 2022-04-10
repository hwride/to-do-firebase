import React from 'react';
import './App.css';
import './firebase/firebase';
import SignInScreen, { UserState } from './auth/signInScreen';
import ToDoList from './to-do-list';

function App() {
  const [user, setUser] = React.useState<UserState>('loading');

  return (
    <div className="App">
      To do
      <ToDoList user={user} />
      <SignInScreen setUser={setUser} />
    </div>
  );
}

export default App;

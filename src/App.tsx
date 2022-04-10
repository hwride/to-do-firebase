import React from 'react';
import './App.css';
import SignInScreen, { UserState } from './auth/signInScreen';
import './firebase/firebase';
import ToDoList from './to-do-list';

function App() {
  const [user, setUser] = React.useState<UserState>('loading');

  return (
    <div className="App">
      To do
      <ToDoList user={user} />
      <SignInScreen user={user} setUser={setUser} />
    </div>
  );
}

export default App;

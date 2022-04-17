import React from 'react';
import './App.css';
import SignInScreen, { UserState } from './auth/signInScreen';
import ToDoList from './components/ToDoList';
import './firebase/firebase';

function App() {
  const [user, setUser] = React.useState<UserState>('loading');

  return (
    <div className="App">
      To do
      <ToDoList userState={user} />
      <SignInScreen userState={user} setUserState={setUser} />
    </div>
  );
}

export default App;

import React from 'react';
import { IntlProvider } from 'react-intl';
import './App.css';
import { firebaseAuthButtonStyleOverrides } from './auth/SignInScreen';
import { useUserState } from './auth/useUserState';
import ToDoList from './components/ToDoList/ToDoList';
import './firebase/firebase';
import { enGB } from './lang/en-GB';

function App() {
  const userState = useUserState();

  return (
    <IntlProvider locale={navigator.language} messages={enGB}>
      <div className="App">
        <style>{firebaseAuthButtonStyleOverrides}</style>
        <ToDoList userState={userState} />
      </div>
    </IntlProvider>
  );
}

export default App;

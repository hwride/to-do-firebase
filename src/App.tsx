import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import './firebase/firebase';

function App() {
  return (
    <div className="App">
      <ToDoList />
    </div>
  );
}

export default App;

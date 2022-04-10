import React, { useEffect, useState } from 'react';
import { db } from './firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

interface ToDoItem {
  text: string;
}

export default function ToDoList() {
  const [newToDoText, setNewToDoText] = useState('');
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  // Request to do items from the server.
  useEffect(() => {
    (async () => {
      await getDocs(collection(db, 'todos')).then((todos) => {
        console.log(todos);
        setTodos(todos.docs.map((doc) => doc.data() as ToDoItem));
      });
    })();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          value={newToDoText}
          onChange={(event) => {
            setNewToDoText(event.target.value);
          }}
        />
        <button onClick={() => addToDoItem(newToDoText)}>Add to do</button>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.text}>
              <input type="checkbox" />
              {todo.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

async function addToDoItem(text: string) {
  try {
    const col = collection(db, 'todos');
    const docRef = await addDoc(col, {
      text,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

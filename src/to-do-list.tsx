import React, { useEffect, useState } from 'react';
import { db } from './firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

interface ToDoItem {
  text: string;
}

export default function ToDoList() {
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
      <button onClick={addToDoItem}>Add to do</button>
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

async function addToDoItem() {
  try {
    const col = collection(db, 'todos');
    const docRef = await addDoc(col, {
      text: 'Buy milk',
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

import React, { useEffect, useState } from 'react';
import { db } from './firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { UserState } from './auth/signInScreen';

interface ToDoItem {
  text: string;
}

export default function ToDoList({ user }: { user: UserState }) {
  const [newToDoText, setNewToDoText] = useState('');
  const [todos, setTodos] = useState<ToDoItem[] | undefined>(undefined);

  let state;
  if (user === 'loading' || todos == null) {
    state = 'loading';
  } else if (user == null) {
    state = 'not-signed-in';
  } else {
    state = 'loaded';
  }

  // Request to do items from the server when logged in.
  useEffect(() => {
    if (user) {
      (async () => {
        const todos = await getDocs(collection(db, 'todos'));
        setTodos(todos.docs.map((doc) => doc.data() as ToDoItem));
      })();
    }
  }, [user]);

  if (state === 'not-signed-in') {
    return <div>Sign in to view to do items.</div>;
  } else if (state === 'loading') {
    return <div>Loading...</div>;
  } else {
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
          {todos!.map((todo) => {
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

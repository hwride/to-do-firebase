import firebase from 'firebase/compat/app';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserState } from '../auth/signInScreen';
import { db } from '../firebase/firebase';

interface ToDoItem {
  text: string;
}

export default function ToDoList({ userState }: { userState: UserState }) {
  const [newToDoText, setNewToDoText] = useState('');
  // Whether to do items should be updated.
  const [updateToDos, setUpdateToDos] = useState(false);
  const [todos, setTodos] = useState<ToDoItem[] | undefined>(undefined);

  // The order of these conditions is important, as todos is null when the user
  // is not signed in, but we don't want to display 'loading' when the user is
  // not signed in.
  let state;
  if (userState == 'not-signed-in') {
    state = 'not-signed-in';
  } else if (userState === 'loading' || todos == null) {
    state = 'loading';
  } else {
    state = 'loaded';
  }

  // When the user signs in, we want to load the todos.
  useEffect(() => {
    if (userState === 'signed-in') {
      setUpdateToDos(true);
    }
  }, [userState]);

  // Request to do items from the server when state says so.
  useEffect(() => {
    if (updateToDos) {
      (async () => {
        try {
          const todos = await getToDos();
          setTodos(todos);
        } finally {
          setUpdateToDos(false);
        }
      })();
    }
  }, [updateToDos]);

  const addToDo = async () => {
    await addToDoItem(newToDoText);
    setUpdateToDos(true);
  };

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
          <button onClick={addToDo}>Add to do</button>
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

async function getToDos() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    console.error('Tried to get todo items, but there is no signed in user.');
    return [];
  }
  const todos = await getDocs(collection(db, `users/${currentUser.uid}/todos`));
  return todos.docs.map((doc) => doc.data() as ToDoItem);
}

async function addToDoItem(text: string) {
  try {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error(
        'Tried to add a todo item, but there is no signed in user.'
      );
      return;
    }
    const col = collection(db, `users/${currentUser.uid}/todos`);
    const docRef = await addDoc(col, {
      text,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

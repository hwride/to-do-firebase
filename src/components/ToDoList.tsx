import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import SignInScreen, { UserState } from '../auth/signInScreen';
import { db } from '../firebase/firebase';
import styles from './ToDoList.module.css';

interface ToDoItem {
  id: string;
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

  const onAddToDoClick = async () => {
    await addToDo(newToDoText);
    setUpdateToDos(true);
  };

  const onToDoChecked = async (toDo: ToDoItem) => {
    await deleteToDo(toDo.id);
    setUpdateToDos(true);
  };

  let mainContent;
  if (state === 'not-signed-in') {
    mainContent = <div>Sign in to view to do items.</div>;
  } else if (state === 'loading') {
    mainContent = <div>Loading...</div>;
  } else {
    mainContent = (
      <div>
        <div>
          <input
            type="text"
            value={newToDoText}
            onChange={(event) => {
              setNewToDoText(event.target.value);
            }}
          />
          <button onClick={onAddToDoClick}>Add to do</button>
        </div>
        <ul>
          {todos!.map((todo) => {
            return (
              <li key={todo.id}>
                <input type="checkbox" onChange={() => onToDoChecked(todo)} />
                {todo.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.heading}>To do list</h1>
      {mainContent}
      {/* Currently sign in login in SignInScreen must run for sign in to
       init properly. Consider moving this out of the component and just using
       the component of rendering. */}
      <SignInScreen userState={userState} />
    </div>
  );
}

async function getToDos(): Promise<ToDoItem[]> {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    console.error('Tried to get todo items, but there is no signed in user.');
    return [];
  }
  const todos = await getDocs(collection(db, `users/${currentUser.uid}/todos`));
  return todos.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as ToDoItem)
  );
}

async function addToDo(text: string) {
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

async function deleteToDo(id: string) {
  try {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error(
        'Tried to delete a todo item, but there is no signed in user.'
      );
      return;
    }
    const docRef = doc(db, `users/${currentUser.uid}/todos/${id}`);
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', docRef.id);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}

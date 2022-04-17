import React, { useEffect, useState } from 'react';
import SignInScreen from '../../auth/SignInScreen';
import SignOutButton from '../../auth/SignOutButton';
import { UserState } from '../../auth/useUserState';
import { addToDo, deleteToDo, getToDos } from './firestoreToDo';
import { ToDoItem } from './ToDoItem.type';
import styles from './ToDoList.module.css';

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
        <div className={styles.addToDoSection}>
          <input
            className={styles.addToDoInput}
            type="text"
            value={newToDoText}
            aria-labelledby="add-to-do-button"
            onChange={(event) => {
              setNewToDoText(event.target.value);
            }}
          />
          <button
            id="add-to-do-button"
            className={styles.addToDoButton}
            onClick={onAddToDoClick}
          >
            Add to do
          </button>
        </div>
        <ul className={styles.toDoList}>
          {todos!.map((todo) => {
            return (
              <li key={todo.id} className={styles.toDoItem}>
                <input
                  type="checkbox"
                  className={styles.toDoCheckbox}
                  onChange={() => onToDoChecked(todo)}
                />
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
      <header className={styles.header}>
        <h1 className={styles.heading}>To do list</h1>
        {userState === 'signed-in' && <SignOutButton />}
      </header>
      {mainContent}
      {userState === 'not-signed-in' && <SignInScreen />}
    </div>
  );
}

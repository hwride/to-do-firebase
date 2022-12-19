import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import SignInScreen from '../../auth/SignInScreen';
import SignOutButton from '../../auth/SignOutButton';
import { UserState } from '../../auth/useUserState';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
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
    } else if (userState === 'not-signed-in') {
      // If you don't do this then when a user signs out and another signs in, the old to do items are briefly visible.
      setTodos(undefined);
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
    const newToDoTextTrimmed = newToDoText.trim();
    setNewToDoText('');
    await addToDo(newToDoTextTrimmed);
    setUpdateToDos(true);
  };

  const onToDoChecked = async (toDo: ToDoItem) => {
    await deleteToDo(toDo.id);
    setUpdateToDos(true);
  };

  let mainContent;
  if (state === 'not-signed-in') {
    mainContent = (
      <>
        <div>
          <FormattedMessage
            id="signInToViewText"
            defaultMessage="Sign in to view to do items"
          />
        </div>
        <SignInScreen />
      </>
    );
  } else if (state === 'loading') {
    mainContent = <div>Loading...</div>;
  } else {
    mainContent = (
      <>
        <div className={styles.addToDoSection}>
          <input
            className={styles.addToDoInput}
            type="text"
            value={newToDoText}
            aria-labelledby="add-to-do-button"
            onKeyPress={(evt) => evt.key === 'Enter' && onAddToDoClick()}
            onChange={(event) => setNewToDoText(event.target.value)}
          />
          <button
            id="add-to-do-button"
            className={styles.addToDoButton}
            onClick={onAddToDoClick}
          >
            <FormattedMessage id="addToDoButton" defaultMessage="Add to do" />
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
      </>
    );
  }

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          <FormattedMessage id="appTitle" defaultMessage="To do list default" />
        </h1>
        {userState === 'signed-in' && <SignOutButton />}
      </header>
      <div className={styles.mainContent}>{mainContent}</div>
      <div className={styles.themeSelectorWrapper}>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

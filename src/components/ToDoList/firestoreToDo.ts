import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ToDoItem } from './ToDoItem.type';

export async function getToDos(): Promise<ToDoItem[]> {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    console.error('Tried to get todo items, but there is no signed in user.');
    return [];
  }
  const todos = await getDocs(
    query(
      collection(db, `users/${currentUser.uid}/todos`),
      orderBy('createdAt', 'asc')
    )
  );
  return todos.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as ToDoItem)
  );
}

export async function addToDo(text: string) {
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
      createdAt: serverTimestamp(),
      text,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function deleteToDo(id: string) {
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

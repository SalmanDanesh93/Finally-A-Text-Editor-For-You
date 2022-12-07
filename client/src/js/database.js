import { openDB } from 'idb';

const initdb = async () =>
  openDB('fatefy', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('fatefy')) {
        console.log('fatefy database already exists');
        return;
      }
      db.createObjectStore('fatefy', { keyPath: 'id', autoIncrement: true });
      console.log('fatefy database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const fatefyDb = await openDB('fatefy', 1)
  const tx = fatefyDb.transaction('fatefy', 'readwrite');
  const store = tx.objectStore('fatefy');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data has been saved to the database', result.value);
} 


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const fatefyDb = await openDB('fatefy', 1)
  const tx = fatefyDb.transaction('fatefy', 'readwrite');
  const store = tx.objectStore('fatefy');
  const request = store.get(1);
  const result = await request;
  result
  ? console.log('Data has been retrieved from the database', result.value)
  : console.log('Data has not located in the database');
  return result?.value;
};

initdb();

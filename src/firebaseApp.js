import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD3cHVeyG9qrNqYjjp8oXP-i_6a--A5xbc",
  authDomain: "haggendazs.firebaseapp.com",
  databaseURL: "https://haggendazs.firebaseio.com",
  projectId: "haggendazs",
  storageBucket: "haggendazs.appspot.com",
  messagingSenderId: "816605246351",
  appId: "1:816605246351:web:19fee12a156ba2db3c11fa"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
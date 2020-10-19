import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyC86jZd_diTiPoZfBCCtPCGC5VEQUbrIKk",
    authDomain: "rate-web.firebaseapp.com",
    databaseURL: "https://rate-web.firebaseio.com",
    projectId: "rate-web",
    storageBucket: "rate-web.appspot.com",
    messagingSenderId: "301893443708",
    appId: "1:301893443708:web:d0d926494f41011cee69f9",
    measurementId: "G-0EJ2S9BXBK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   const storage = firebase.storage();

//   var storeRef = storage.ref()

  export {
    //   storage, firebase as default
    firebase as default
  }
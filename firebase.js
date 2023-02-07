// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase-admin/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpnjgM_2eoWChBsTfhxVwF6GORrI0JWd8",
  authDomain: "phone-number-authenticat-ec57c.firebaseapp.com",
  databaseURL:
    "https://phone-number-authenticat-ec57c-default-rtdb.firebaseio.com",
  projectId: "phone-number-authenticat-ec57c",
  storageBucket: "phone-number-authenticat-ec57c.appspot.com",
  messagingSenderId: "270889017287",
  appId: "1:270889017287:web:18cc93c2b830137a3643e2",
  measurementId: "G-EJP8F557V5",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://phone-number-authenticat-ec57c-default-rtdb.firebaseio.com",
});

let db = admin.firestore();

module.exports = db;

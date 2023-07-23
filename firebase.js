// Import the functions you need from the SDKs you need
const  { initializeApp } = require( "firebase/app");
require( 'firebase/storage');
const { getStorage } =require( 'firebase/storage');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLsYoiWBpFDWSEdPaonfP-8FBKcS7yTZc",
  authDomain: "ground-reservation-system.firebaseapp.com",
  projectId: "ground-reservation-system",
  storageBucket: "ground-reservation-system.appspot.com",
  messagingSenderId: "410756911682",
  appId: "1:410756911682:web:f5c288625227a37ecd53db"
}; 

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
module.exports = {firebase,storage};

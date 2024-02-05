import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmY2FUlkMNCP4f8vesG-VMlyB-SHnWeVA",
  authDomain: "facebooktest-588a0.firebaseapp.com",
  projectId: "facebooktest-588a0",
  storageBucket: "facebooktest-588a0.appspot.com",
  messagingSenderId: "414042772310",
  appId: "1:414042772310:web:aa4894840b5f2338f63cf7",
  measurementId: "G-Z1L6XE51KH",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

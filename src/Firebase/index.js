import * as firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAUQM4U9_PdcFCLtpv1ZFWarfIan-YTs0k",
    authDomain: "carogame-af3ee.firebaseapp.com",
    databaseURL: "https://carogame-af3ee.firebaseio.com",
    projectId: "carogame-af3ee",
    storageBucket: "carogame-af3ee.appspot.com",
    messagingSenderId: "530407967165",
    appId: "1:530407967165:web:c9564456728a84e02e6ad4",
    measurementId: "G-32V7WNK4FX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const f = firebase;
  // Get a reference to the storage service, which is used to create references in your storage bucket
  export const storage = firebase.storage();
  // Create a storage reference from our storage service
  export const storageRef = storage.ref();
  export const database = firebase.firestore();
  
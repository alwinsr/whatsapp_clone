
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5qRpmWAoH19DWTzhMFL07S-Ntt7D_ZM0",
  authDomain: "whatsapp-clone-28250.firebaseapp.com",
  projectId: "whatsapp-clone-28250",
  storageBucket: "whatsapp-clone-28250.appspot.com",
  messagingSenderId: "1007495354553",
  appId: "1:1007495354553:web:b82098e729a5ba4c1fa368",
  measurementId: "G-V0DHEE5VJY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ experimentalForceLongPolling: true });

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider };
export default db;
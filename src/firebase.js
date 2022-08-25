import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore , collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDcQAJ6LvD_DdGGOfShxsTmEI5D2ETRncE",
  authDomain: "emotion-fcc02.firebaseapp.com",
  projectId: "emotion-fcc02",
  storageBucket: "emotion-fcc02.appspot.com",
  messagingSenderId: "820287222537",
  appId: "1:820287222537:web:456d95aad8ffbea43c19d8",
  measurementId: "G-57K98XD4ET"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //eslint-disable-line no-unused-vars
const db = getFirestore(app)
const emoColRef = collection(db, 'emotions');
export default emoColRef;
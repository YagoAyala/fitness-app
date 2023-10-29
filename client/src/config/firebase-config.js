import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClfFVsJudtWHcT1BaFhR272JRc_ckOqqc",
  authDomain: "lotofacil-f2803.firebaseapp.com",
  projectId: "lotofacil-f2803",
  storageBucket: "lotofacil-f2803.appspot.com",
  messagingSenderId: "1030637322522",
  appId: "1:1030637322522:web:927a226a28c403b387eca3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

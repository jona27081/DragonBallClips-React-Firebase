import * as firebase from "firebase";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyASlX55n6n9-eHnaLldrM2pUcgH8bUydoY",
  authDomain: "dragonballclips.firebaseapp.com",
  projectId: "dragonballclips",
  storageBucket: "dragonballclips.appspot.com",
  messagingSenderId: "585801974428",
  appId: "1:585801974428:web:81707500243770ec27a359",
};

firebase.initializeApp(config);

export default firebase.firestore();

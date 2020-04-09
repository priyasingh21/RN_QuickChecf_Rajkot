import * as firebase from 'firebase';
import 'firebase/auth';

const config = firebase.initializeApp({
  apiKey: "AIzaSyCk9ODpTR29UOhEGdgBiY6hD8jwelvbIKI",
  authDomain: "",
  databaseURL: "https://quick-chef-firebase.firebaseio.com",
  projectId: "quick-chef-firebase",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:245911937029:ios:e59ee1cff65bad1466bc6c",
  measurementId: "",
});

export {config}

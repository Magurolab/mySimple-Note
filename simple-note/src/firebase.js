import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBpCVmrM40ie_m5S-HfuALg6XiYozJhjZQ",
    authDomain: "simple-note-40823.firebaseapp.com",
    databaseURL: "https://simple-note-40823.firebaseio.com",
    projectId: "simple-note-40823",
    storageBucket: "simple-note-40823.appspot.com",
    messagingSenderId: "674519249968"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();

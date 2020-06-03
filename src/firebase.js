import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBkoYK3Qf_wYCAWfpb98xDF3q8rlUZU8eE",
    authDomain: "permitapp-af86c.firebaseapp.com",
    databaseURL: "https://permitapp-af86c.firebaseio.com",
    projectId: "permitapp-af86c",
    storageBucket: "permitapp-af86c.appspot.com",
    messagingSenderId: "1036491235505",
    appId: "1:1036491235505:web:6ec9bfcca41f8b87c14290",
    measurementId: "G-B0MWRCLCZ6"
  };

const firebaseApp=firebase.initializeApp(config);


const db =  firebaseApp.firestore();
firebase.analytics();

export {db};
export {firebaseApp};
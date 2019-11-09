import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC3Oddddes_pYVeDsof1dwIoVd9125TiK0",
    authDomain: "fir-lab-d01a2.firebaseapp.com",
    databaseURL: "https://fir-lab-d01a2.firebaseio.com",
    projectId: "fir-lab-d01a2",
    storageBucket: "fir-lab-d01a2.appspot.com",
    messagingSenderId: "664288893974",
    appId: "1:664288893974:web:d9b25022e5db536c5ca937"
  };
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var database = firebase.database();
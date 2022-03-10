const firebase = require('firebase/app');

const config = {
    apiKey: "AIzaSyDQK_HCnOAHoQ7YA_rJOyesA--e3lvrrTA",
    authDomain: "zensocial-501c5.firebaseapp.com",
    projectId: "zensocial-501c5",
    storageBucket: "zensocial-501c5.appspot.com",
    messagingSenderId: "295815274601",
    appId: "1:295815274601:web:0a2e829b3d4fa4e94d82f8",
    measurementId: "G-54DJT2WTHJ"
};

firebase.initializeApp(config);

module.exports = {
    firebase, config
};
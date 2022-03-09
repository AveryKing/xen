const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const app = require('express')();

const firebaseConfig = {
    apiKey: "AIzaSyDQK_HCnOAHoQ7YA_rJOyesA--e3lvrrTA",
    authDomain: "zensocial-501c5.firebaseapp.com",
    projectId: "zensocial-501c5",
    storageBucket: "zensocial-501c5.appspot.com",
    messagingSenderId: "295815274601",
    appId: "1:295815274601:web:0a2e829b3d4fa4e94d82f8",
    measurementId: "G-54DJT2WTHJ"
};

// Retrieves posts
app.get('/posts', (req, res) => {
    admin.firestore().collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            const posts = [];
            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    ...doc.data()
                });
            })
            return res.json(posts)
        })
        .catch(err => console.error);
});

// Creates new post
app.post('/post', (req, res) => {
    const newPost = {
        userHandle: req.body.userHandle,
        body: req.body.body,
        createdAt: new Date().toISOString()
    };

    admin.firestore().collection('posts')
        .add(newPost)
        .then(doc => {
            res.json({message: `post ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        })
});

// User registration
app.post('/register', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };
    //TODO: validate data
    admin.auth()
        .createUser({
            email: newUser.email,
            password: newUser.password
        })
        .then(data => {
            return res.status(201)
                .json({message: `user ${data.uid} registered successfully`})
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({error: err.code});
        });
});

exports.api = functions.https.onRequest(app);
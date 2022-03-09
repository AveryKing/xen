const functions = require("firebase-functions");
const app = require('express')();
const admin = require("firebase-admin");
admin.initializeApp();


const db = admin.firestore();

// Retrieves posts
app.get('/posts', (req, res) => {
    db.collection('posts')
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

    db.collection('posts')
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
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({handle: 'username already taken'})
            } else {
                admin.auth()
                    .createUser({
                        email: newUser.email,
                        password: newUser.password
                    })
                    .then(data => {
                        const userData = {
                            handle: newUser.handle,
                            email: newUser.email,
                            createdAt: new Date().toISOString(),
                            userId: data.uid
                        };
                        return db.doc(`/users/${newUser.handle}`).set(userData)
                    })
                    .then(() => {
                        res.status(201).json({message: `user '${newUser.handle}' created successfully`});
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === 'auth/email-already-in-use') {
                            res.status(400).json({email: 'email is already in use'});
                        } else {
                            res.status(500).json({error: err.code})
                        }
                    })

            }

        });
});

exports.api = functions.https.onRequest(app);
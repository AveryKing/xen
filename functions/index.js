const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express')

admin.initializeApp();
const app = express();

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
})

exports.api = functions.https.onRequest(app);
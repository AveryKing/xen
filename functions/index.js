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

const isEmpty = (string) => !string.trim().length;

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}
// User registration
app.post('/register', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    const errors = {};
    const userDataArray = Object.entries(newUser);
    userDataArray.forEach(kv => {
        const currentIndex = userDataArray.indexOf(kv)
        const [key, value] = kv;
        if (isEmpty(value)) errors[key] = 'this field cannot be empty';
        switch(key) {
            case 'email':
                if(!isEmail) errors[key] = 'that email is invalid';
                break;
            case 'handle':
                if(value.length < 3) errors[key] = 'username must be at least 3 characters';
                break;
            case 'password':
                if(value !== userDataArray[currentIndex+1][1]) {
                    errors[key] = 'the two passwords you entered do not match';
                }
        }
    })

    if(Object.keys(errors).length) return res.status(400).json(errors);

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
                        return res.status(201).json({message: `user '${newUser.handle}' created successfully`});
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === 'auth/email-already-in-use') {
                           return res.status(400).json({email: 'email is already in use'});
                        } else {
                            return res.status(500).json({error: err.code})
                        }
                    })

            }

        });
});

exports.api = functions.https.onRequest(app);
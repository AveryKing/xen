const functions = require("firebase-functions");
const firebase = require('firebase/app');
const app = require('express')();
const {getAuth, getIdToken, signInWithEmailAndPassword} = require("firebase/auth");
const admin = require("firebase-admin");
admin.initializeApp();
const firebaseConfig = {
    apiKey: "AIzaSyDQK_HCnOAHoQ7YA_rJOyesA--e3lvrrTA",
    authDomain: "zensocial-501c5.firebaseapp.com",
    projectId: "zensocial-501c5",
    storageBucket: "zensocial-501c5.appspot.com",
    messagingSenderId: "295815274601",
    appId: "1:295815274601:web:0a2e829b3d4fa4e94d82f8",
    measurementId: "G-54DJT2WTHJ"
};
firebase.initializeApp(firebaseConfig);

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

// Authorization middleware
const FBAuth = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found')
        return res.status(403).json({error: 'unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
        })
}

// Creates new post
app.post('/post', FBAuth, (req, res) => {
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
        switch (key) {
            case 'email':
                if (!isEmail) errors[key] = 'that email is invalid';
                break;
            case 'handle':
                if (value.length < 3) errors[key] = 'username must be at least 3 characters';
                break;
            case 'password':
                if (value !== userDataArray[currentIndex + 1][1]) {
                    errors[key] = 'the two passwords you entered do not match';
                }
        }
    })

    if (Object.keys(errors).length) return res.status(400).json(errors);

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

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const errors = {};
    if (isEmpty(user.email)) errors.email = 'Must not be empty';
    if (isEmpty(user.password)) errors.password = "Must not be empty";
    if (Object.keys(errors).length) return res.status(400).json(errors);

    signInWithEmailAndPassword(getAuth(), user.email, user.password)
        .then(data => {
            return getIdToken(data.user);
        })
        .then(token => {
            return res.json({token})
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(403)
                    .json({general: "Wrong password"});
            } else {
                return res.status(500).json({error: err.code});
            }
        })
})

exports.api = functions.https.onRequest(app);
const functions = require("firebase-functions");
const app = require('express')();
const {getAllPosts, createPost} = require('./handlers/posts');
const {registerUser, loginUser, uploadImage} = require('./handlers/users');
const {FBAuth} = require('./util/auth');
// Post routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, createPost);
// User routes
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
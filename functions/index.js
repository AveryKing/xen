const functions = require("firebase-functions");
const app = require('express')();
const {getAllPosts, getPost, createPost, commentOnPost} = require('./handlers/posts');
const {
    registerUser,
    loginUser,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser
} = require('./handlers/users');

const {FBAuth} = require('./util/auth');
// Post routes
app.get('/posts', getAllPosts);
app.get('/post/:postId', getPost);
app.post('/post', FBAuth, createPost);
app.post('/post/:postId/comment', FBAuth, commentOnPost);
//TODO: delete post
//TODO: like post
//TODO: unlike post


// User routes
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
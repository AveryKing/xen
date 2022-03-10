const functions = require("firebase-functions");
const app = require('express')();
const {
    getAllPosts,
    getPost,
    createPost,
    commentOnPost,
    likePost,
    unlikePost,
    deletePost
} = require('./handlers/posts');
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
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);
app.post('/post', FBAuth, createPost);
app.post('/post/:postId/comment', FBAuth, commentOnPost);
app.delete('/post/:postId', FBAuth, deletePost);

// User routes
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
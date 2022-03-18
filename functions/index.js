const functions = require("firebase-functions");
const {db} = require('./util/admin');
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
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead
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
app.get('/user/:handle', getUserDetails);
app.post('/notifications',FBAuth, markNotificationsRead)

exports.api = functions.https.onRequest(app);

//TODO: condense createNotificationOnLike and createNotificationOnComment into one function
exports.createNotificationOnLike = functions.firestore.document(`likes/{id}`)
    .onCreate((snapshot) => {
       return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        postId: doc.id
                    })
                }
            })
            .catch(err => {
                console.error(err);
            })
    });

exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                return console.error(err)
            })
    })


exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/posts/${snapshot.data().postId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        postId: doc.id
                    })
                }
            })
            .catch(err => {
               return console.error(err);
            })
    });

